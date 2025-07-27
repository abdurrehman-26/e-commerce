"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type SiteMetaFormValues = {
  title: string;
  description: string;
  faviconUrl: string;
};

const SiteMetaPageClient = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SiteMetaFormValues>({
    defaultValues: {
      title: "",
      description: "",
      faviconUrl: "",
    },
  });

  const onSubmit = (data: SiteMetaFormValues) => {
    console.log("Submitted site meta:", data);
    // Call your API here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/settings">Settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Site Metadata</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold">Site Metadata</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Site Title */}
        <div className="space-y-1">
          <Label htmlFor="title">Site Title</Label>
          <Input id="title" {...register("title")} placeholder="Enter site title" />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} placeholder="Enter short description" />
        </div>

        {/* Favicon URL */}
        <div className="space-y-1">
          <Label htmlFor="faviconUrl">Favicon URL</Label>
          <Input id="faviconUrl" {...register("faviconUrl")} placeholder="https://example.com/favicon.ico" />
        </div>

        <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default SiteMetaPageClient;
