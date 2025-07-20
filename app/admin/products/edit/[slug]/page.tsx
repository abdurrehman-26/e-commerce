import API from "@/API";
import AddProductForm from "@/components/product-form";
import { Product } from "@/types";

export default async function Page({ params }: { params: Promise<{slug: string}>}) {
  const { slug } = await params;

  const defaultValues = await API.getProductDetails(slug);

  const productData: Product = defaultValues.data;

  const defaultData = {
    title: productData.title,
    price: productData.price,
    compare_at_price: productData.compare_at_price,
    description: productData.description,
    sku: productData.sku,
    images: productData.images
  };

  return (
    <div>
      <AddProductForm defaultData={defaultData} slug={slug} />
    </div>
  );
}
