import { Head } from "$fresh/runtime.ts";
import { PageInfo, Product } from "apps/commerce/types.ts";
import ProductCard, { Layout as CardLayout, } from "../../components/product/ProductCard.tsx";
import { Format } from "../../components/search/SearchResult.tsx";
import Spinner from "../../components/ui/Spinner.tsx";
import ShowMore from "../../islands/ShowMore.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { usePartialSection } from "@deco/deco/hooks";
export interface Columns {
    mobile?: 1 | 2;
    tablet?: 3 | 4;
    desktop?: 2 | 3 | 4 | 5;
}
export interface Props {
    products: Product[] | null;
    pageInfo: PageInfo;
    offset: number;
    layout?: {
        card?: CardLayout;
        columns?: Columns;
        format?: Format;
    };
    url: URL;
}
const MOBILE_COLUMNS = {
    1: "grid-cols-1",
    2: "grid-cols-2",
};
const TABLET_COLUMNS = {
    3: "dv-all-tablet:grid-cols-3",
    4: "dv-all-tablet:grid-cols-4"
};
const DESKTOP_COLUMNS = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
};
function ProductGallery({ products, pageInfo, layout, offset, url }: Props) {
    const platform = usePlatform();
    const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
    const tablet = TABLET_COLUMNS[layout?.columns?.tablet ?? 3];
    const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];
    const nextPage = pageInfo.nextPage
        ? new URL(pageInfo.nextPage, url.href)
        : null;
    const partialUrl = nextPage ? new URL(nextPage.href) : null;
    if (pageInfo.nextPage && nextPage) {
        partialUrl?.searchParams.set("partial", "true");
    }
    return (<div class={`grid ${mobile} gap-5 items-center ${desktop}  ${tablet}  relative max-w-[1340px] mx-auto my-0`}>
      {layout?.format == "Show More" && (<Head>
          {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage}/>}
          {pageInfo.previousPage && (<link rel="prev" href={pageInfo.previousPage}/>)}
        </Head>)}
      <div class="absolute -top-[80px] full-phone:-top-[90px] left-[355px] full-phone:left-0 text-tiny font-normal leading-4 text-left hidden">
        Encontrados {products?.length} produtos
      </div>
      {products?.map((product, index) => (<ProductCard key={`product-card-${product.productID}`} product={product} preload={index === 0} index={offset + index} layout={layout?.card} platform={platform}/>))}

      {(layout && layout?.format === "Show More") && (<>
          <ShowMore pageInfo={pageInfo}>
            {partialUrl && (<div>
                <div class="mt-2">
                  <Spinner size={24}/>
                </div>
                <button id={`show-more-button-${pageInfo.currentPage}`} class="btn cursor-pointer hidden w-0 h-0 absolute" {...usePartialSection({
                href: partialUrl.href,
                mode: "append",
            })}>
                  Show More
                </button>
              </div>)}
          </ShowMore>
        </>)}
    </div>);
}
export default ProductGallery;
