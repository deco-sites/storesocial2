import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import Icon from "../ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.delete(PAGE_QUERY_PARAM);
  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "release:desc": "Lançamento",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  return (
    <>
     
      <div class="flex items-center justify-center gap-2 full-phone:justify-start">
        <div class="w-full text-center">
          <label for="sort" class="flex justify-center items-center gap-1.5 text-base w-[125px] p-2.5 border border-gray-15 border-solid rounded-[3px] text-black"> <Icon id="ArrowUpDownBlack" size={16} />Ordenar por: </label>
        </div>
        <select
          id="sort"
          name="sort"
          onInput={applySort}
          class="w-full rounded border-0  text-base cursor-pointer appearance-none text-center  bg-black text-white py-2.5 px-[15px]"
        >
          
          {sortOptions.map(({ value, label}) => ({
            value,
            label: portugueseMappings[label as keyof typeof portugueseMappings] ??
              label,
          })).filter(({ label }) => label).map(({ value, label }) => (
            <option key={value} value={value} selected={value === sort} class="bg-white text-black">
              <span class="text-black">{label}</span>
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Sort;
