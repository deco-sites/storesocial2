import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import ProductAdditionalProps from "../../islands/ProductAdditionalProps.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}



export default function ProductDetails({ page }: Props) {
  if (!page?.seo) {
    return <NotFound />;
  }
  const { product } = page;
  const brandName = product.brand.name;

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <div class="full-phone:mt-[90px] full-phone:ml-[15px] mx-auto my-0 w-full max-w-[1020px] flex gap-1 items-center cs-all-tablet:pl-5">
        <a class="full-phone:text-base full-phone:font-normal full-phone:text-black-1 text-[#ABABAB]" href="/">Início</a>
         <span class="cs-min-full-phone:hidden"><Icon  size={10} id="ChevronRightPdpMb" strokeWidth={2}/></span>
         <span class="full-phone:hidden "><Icon  size={10} id="ChevronRightPdpDesk" strokeWidth={2}/></span>
          <a class="full-phone:text-base full-phone:font-normal full-phone:text-black-1 text-[#ABABAB]" href={`/${brandName}`}>{brandName}</a>
      </div>
      <div class="flex gap-[100px] flex-row justify-center full-phone:flex-col self-center max-w-[1022px] translate-x-2.5 full-phone:translate-x-0 full-phone:max-w-full full-phone:gap-5 cs-min-full-phone:flex-row cs-all-tablet:gap-[40px] cs-all-tablet:w-full cs-all-tablet:justify-center">
        <ImageGallerySlider
          page={page}
        />
        <ProductInfo
          page={page}
        />
      </div>
      <div class="max-w-[1120px] flex justify-center full-phone:px-5 cs-all-tablet:justify-start cs-all-tablet:max-w-[340px] cs-all-tablet:max-w-[600px] cs-all-tablet:mx-auto cs-all-tablet:my-0 cs-all-tablet:w-full cs-all-tablet:justify-center">
        <ProductAdditionalProps 
          page={page} 
        />
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
