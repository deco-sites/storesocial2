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

import Icon from "../ui/Icon.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useUI } from "../../sdk/useUI.ts";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "preact/compat";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default Pesquise com rapidez e facilidade
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
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
  buttonClose?: boolean;
}

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

function SearchbarNF({
  placeholder = "O que você está procurando?",
  action = "/s",
  name = "q",
  query,
  buttonClose = true,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  const refDiv = useOutsideClick(() => {
    displaySearchPopup.value = false;
  });

  const closeModal = (e: Event) => {
    e.stopPropagation();

    displaySearchPopup.value = false;
  };

  return (
    <div class="">
      <div
        ref={refDiv}
        class="searchbar__container  w-full max-w-4/5 lg:max-w-[940px] z-[20] full-phone:px-0"
      >
        <form id={id} action={action} class="join w-full">
          <div
            class="searchbar__inputWrapper rounded-[10px] w-full flex items-center relative px-5 borderborder-black-1 full-phone:px-0 "
            style={{boxShadow: "0px 4px 30px 0px #0000001A"}}
          >
            <input
              ref={searchInputRef}
              id="search-input"
              class="input p-0 text-bigger font-afacad font-normal leading-6 text-gray-7 join-item flex-grow text-center focus:outline-none focus:border-none w-full input-search-mobile Header-search-input-cy full-phone:text-left full-phone:pl-8"
              name={name}
              defaultValue={query}
              onInput={(e) => {
                const value = e.currentTarget.value;
                if (value) {
                  sendEvent({
                    name: "search",
                    params: { search_term: value },
                  });
                }
                setSearch(value);
              }}
              placeholder={placeholder}
              role="combobox"
              aria-controls="search-suggestion"
              autocomplete="off"
             
            />
            <button
              type="submit"
              class="join-item searchbar__searchBtn"
              aria-label="Search"
              for={id}
              tabIndex={-1}
            >
              {loading.value
                ? <span class="loading loading-spinner loading-xs" />
                : (
                  <Icon
                    id="MagnifyingGlassBlack"
                    size={26}
                    className="absolute lg:relative lg:top-0 left-[2px] text-[#8E8E93] scale-90 sm:scale-100 md-tablet:top-[22%] md-tablet:left-[unset] md-tablet:right-3"
                  />
                )}
            </button>
            {buttonClose && (
              <Icon
                id="CloseSearchBar"
                size={24}
                onClick={() => (displaySearchPopup.value = false)}
                type="button join-item"
                class="inline-flex cursor-pointer lg:absolute text-[#2D2D2C]"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchbarNF;
