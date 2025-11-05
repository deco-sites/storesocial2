import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions" | "pageInfo">;

function SearchControls(
  { filters, pageInfo,  sortOptions }: Props
) {

  const foundProducts = pageInfo.records;

  const open = useSignal(false);  

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex gap-[72px] items-center mb-8 py-4 px-0  max-w-[1340px] mx-auto my-0 full-phone:p-0">
        <div class="flex flex-row items-center justify-between py-2.5 px-5 full-phone:p-0">
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
        <div class="text-tiny text-gray-2 font-normal leading-4 full-phone:text-right">
          {foundProducts} produtos encontrados
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
