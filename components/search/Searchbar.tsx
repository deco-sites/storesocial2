/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */
import ProductCardSearchShelf from "../product/ProductCardSearchShelf.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSuggestions } from "../../sdk/useSuggestions.ts";
import { useUI } from "../../sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "../../apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "O que você está procurando?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div class="w-full  px-0 py-0 overflow-y-hidden rounded-[10px] full-phone:rounded-[5px] full-phone:flex full-phone:justify-center">
      <form
        id={id}
        action={action}
        class="join font-afacad  border-b-[1px] border-gray-6 border-solid w-full full-phone:border-none full-phone:bg-black full-phone:flex full-phone:justify-center"
      >
        <Button
          type="submit"
          class="hover:bg-transparent hover:border-none sm:inline-flex btn-lupa-search cs-min-full-phone:hidden "
          aria-label="Search"
          for={id}
        >
          <Icon id="MagnifyingGlassNotCoGray" size={22} strokeWidth={0.01} />
        </Button>
        <div class="full-phone:w-full full-phone:px-2.5 full-phone:py-[7px] full-phone:bg-black w-full">
          <input
            ref={searchInputRef}
            id="search-input"
            class="input p-0 text-bigger font-afacad font-normal leading-6 text-gray-7 join-item flex-grow text-center focus:outline-none focus:border-none w-full input-search-mobile Header-search-input-cy"
            name={name}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setQuery(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            aria-haspopup="listbox"
            aria-expanded={displaySearchPopup.value}
            autocomplete="off"
          />
        </div>
        <Button
          type="button"
          class=" hover:bg-transparent hover:border-none sm:inline-flex btn-close-search"
          onClick={() => displaySearchPopup.value = false}
          ariaLabel={displaySearchPopup.value ? "open search" : "search closed"}
        >
          <Icon
            id="XMarkNotCo"
            size={24}
            strokeWidth={2}
            class="full-phone:hidden"
          />
          <Icon
            id="CloseGray"
            size={14}
            strokeWidth={2}
            class="cs-min-full-phone:hidden"
          />
        </Button>
      </form>

      <div
        class={`${
          !hasProducts && !hasTerms ? "hidden" : ""
        } full-phone:absolute full-phone:top-[70px] full-phone:bg-white full-phone:w-full full-phone:rounded hasProductsWrapper`}
      >
        <div class="gap-4 flex pt-[20px] pb-[35px] full-phone:flex-col full-phone:gap-9">
          <div class="flex flex-col gap-2.5 grow max-w-[244px] p-5 full-phone:gap-[6px] full-phone:pt-5 full-phone:px-5 full-phone:pb-0 cs-min-full-phone:border-r cs-min-full-phone:border-gray-6 cs-min-full-phone:border-solid">
            <span
              class="text-bigger text-gray-11 font-afacad font-normal leading-6 full-phone:text-large full-phone:font-bold "
              role="heading"
              aria-level={3}
            >
              Mais Buscados:
            </span>
            <ul
              id="search-suggestion"
              class="flex flex-col gap-2 full-phone:gap-6"
            >
              {searches.map(({ term }) => (
                <li>
                  <a
                    href={`/s?q=${term}`}
                    class="flex items-center full-phone:text-bigger full-phone:font-normal full-phone:text-gray-11 text-gray-7"
                  >
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6  gap-6 overflow-x-hidden justify-center grow-[2] shrink basis-[0%] full-phone:pt-0">
            <span
              class="hidden full-phone:block font-afacad text-large font-bold leading-7 text-left text-gray-11 full-phone:px-5"
              role="heading"
              aria-level={3}
            >
              Produtos {searchInputRef.current?.value}
            </span>
            <Slider class="carousel flex justify-center snap-none gap-2.5 full-phone:gap-[5px] full-phone:overflow-y-scroll full-phone:flex-col full-phone:mx-2.5 cs-all-tablet:justify-start">
              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item min-w-[220px] max-w-[220px] full-phone:max-w-full full-phone:p-[5px] full-phone:border full-phone:border-gray-12 full-phone:rounded-[5px]"
                >
                  <ProductCardSearchShelf
                    product={product}
                    platform={platform}
                    index={index}
                    itemListName="Suggeestions"
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
