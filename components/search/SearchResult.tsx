import { SendEventOnView } from "../../components/Analytics.tsx";
import { Layout as CardLayout } from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import SearchbarNF from "./SearchbarNF.tsx";
import Page404 from "./404.tsx";
import Image from "apps/website/components/Image.tsx";


export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex flex-col justify-center items-center pt-[68px] pb-[68px] mx-auto max-w-9/10 lg:max-w-full full-phone:px-5 full-phone:pt-[150px]">
      <div>
        <div>
          <Icon id="LogoNotco" size={78} strokeWidth={2} />
        </div>
      </div>
      <span className="text-black text-large max-w-[284px] uppercase leading-[26px] text-center mb-[14px] mt-5 font-bold">
        Ops! não encontramos essa página.
      </span>
      <div className="flex flex-col items-center mb-16">
        <span className="text-black text-bigger font-normal mb-5 text-center max-w-[310px]">
          Faça uma nova busca e continue explorando o delicioso universo de NotCo!
        </span>
        <div className="pageSearchbar w-full sm:max-w-9/10">
          <SearchbarNF buttonClose={false} />
        </div>
      </div>
      <a
        href="/"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-[10px] mb-8 bg-black text-white text-big font-normal" >
        <Icon id="RefreshNotCo" size={18} strokeWidth={2} />
        Voltar para o início
      </a>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
  url: _url,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;

  return (
    <>
      <div class="container px-4 py-10 md-tablet:pt-0 ">
        {(isFirstPage || !isPartial) && (
          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            pageInfo={pageInfo}
            displayFilter={layout?.variant === "drawer"}
          />
        )}

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 &&
            (isFirstPage || !isPartial) && (
              <aside class="hidden ">
                <Filters filters={filters} />
              </aside>
            )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
            />
          </div>
        </div>

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  { page, ...props }: ReturnType<typeof loader>,
) {
  if (!page) {
    return <Page404 />;
  }

  if (page.pageInfo.records === 0) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
