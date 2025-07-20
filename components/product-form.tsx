"use client";

import { Button } from "./ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DescriptionEditor from "./DescriptionEditor/DescriptionEditor";

import API from "@/API";
import { ProductFormData } from "@/types";
import { ImageUpload } from "./image-uploader";
import { InputWithLabel } from "./Input-with-label";
import { Label } from "./ui/label";

export default function ProductForm({
  defaultData,
  slug,
}: {
  defaultData?: ProductFormData | null;
  slug?: string | null;
}) {
    const methods = useForm<ProductFormData>({
      defaultValues: defaultData || {
        title: "",
        price: null,
        compare_at_price: null,
        description: "",
        sku: ""
      },
    });

    const {
  register,
  handleSubmit,
  formState,
  setValue,
  getValues
} = methods;

  const router = useRouter();

  const onSubmit = async (data: ProductFormData) => {
    if (defaultData) {
      const res = await API.updateProduct(data, slug!);
      if (res?.status === "success") {
        toast.success("Product updated successfully");
        setTimeout(() => router.push("/admin/products"), 1000);
      } else {
        toast.error(res?.message || "Failed to update product");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const res = await API.addProduct(data);

      if (res?.status === "success") {
        toast.success("Product added successfully");
        setTimeout(() => router.push("/admin/products"), 1000);
      } else {
        toast.error(res?.message || "Failed to add product");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleImageUpload = (images: string[]) => {
    setValue("images", images);
    console.log(getValues("images"))
    toast.success("Product images uploaded")
  };

  return (
    <FormProvider {...methods}>
    <form
      className="p-4 max-w-3xl mx-auto bg-white flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-semibold">Product Details</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 gap-4">
        <InputWithLabel label="Title" {...register("title")} placeholder="Title" />
        <div>
          <Label className="mb-2 ml-1">Description</Label>
          <DescriptionEditor onChange={(value) => setValue("description", value) } content={defaultData?.description} />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel
          label="Price"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
        />
        <InputWithLabel
          label="Compare at price"
          {...register("compare_at_price", { valueAsNumber: true })}
          placeholder="Compare at price"
        />
      </div>

      <InputWithLabel
          label="SKU"
          {...register("sku")}
          placeholder="SKU"
      />
      <ImageUpload onUpload={(images) => handleImageUpload(images)} />

      <Button
        disabled={formState.isSubmitting}
        type="submit"
      >
        {formState.isSubmitting
          ? defaultData
            ? "Updating..."
            : "Submitting..."
          : defaultData
            ? "Update Product"
            : "Add Product"}
      </Button> 
    </form>
    </FormProvider>
  );
}
