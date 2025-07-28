import Image from "next/image";

import { ImageCarousel } from "@/components/image-carousel";
import FaqSection from "@/components/faq-section";
import API from "@/API";
import { cookies } from "next/headers";
import { TrendingProducts } from "@/components/trending-products/trending-products";

export default async function Home() {
  const userCookies = await cookies()
  const SLIDES = [
    {
      imageurl:
        "https://res.cloudinary.com/dxpjusmf7/image/upload/v1753705937/8d6efb0d-35ac-4611-9664-13404fd5b796_PK-1976-688.jpg_2200x2200q80.jpg__bytjb2.webp",
    },
    {
      imageurl:
        "https://res.cloudinary.com/dxpjusmf7/image/upload/v1753705982/99887c7a-ecb6-4010-be8b-44f54e295193_PK-1976-688.jpg_2200x2200q80.jpg__qltbnz.webp",
    },
    {
      imageurl:
        "https://res.cloudinary.com/dxpjusmf7/image/upload/v1753705997/a2e8a274-cfb1-41fe-9dee-3b543cde1f75_PK-1976-688.jpg_2200x2200q80.jpg__smr1sj.webp",
    },
    {
      imageurl:
        "https://res.cloudinary.com/dxpjusmf7/image/upload/v1753706004/ca544c06-44d7-40bf-914c-1d0b54c90c91_PK-1976-688.jpg_2200x2200q80.jpg__fwbhtr.webp",
    },
  ];
  const promotion = {
    wide: "https://res.cloudinary.com/dxpjusmf7/image/upload/v1753706123/Main-banner-Home-page_2_wuz2x7.jpg",
    small:
      "https://res.cloudinary.com/dxpjusmf7/image/upload/v1753706129/Main-banner-mbl-2---Copy_kf7qsd.jpg",
  };
  const initialTrendingProductsRes = await API.getProducts({userCookies})

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="py-2 flex justify-center w-full">
        <ImageCarousel slides={SLIDES} />
      </div>
      <TrendingProducts initialTrendingProducts={initialTrendingProductsRes.data} initialTrendingPagination={initialTrendingProductsRes.pagination} />
      <section className="py-2 w-full">
        <div className="w-full overflow-hidden rounded-lg">
          <Image
            alt="promotion-image"
            className="hidden sm:block"
            height={1080}
            src={promotion.wide}
            width={1920}
          />
          <Image
            alt="promotion-image"
            className="sm:hidden"
            height={594}
            src={promotion.small}
            width={750}
          />
        </div>
      </section>
      <FaqSection />
    </section>
  );
}
