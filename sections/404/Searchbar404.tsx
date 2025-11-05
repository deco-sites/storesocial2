import Icon from "../../components/ui/Icon.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { useUI } from "../../sdk/useUI.ts";
import { useId } from "../../sdk/useId.ts";
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

function Searchbar404({
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
        class="searchbar__container  w-full max-w-4/5 lg:max-w-[940px] z-[20] full-phone:px-5"
      >
        <form id={id} action={action} class="join w-full">
          <div
            class="searchbar__inputWrapper rounded-[10px] w-full flex items-center relative px-5 border border-black-1"
            style={{
              boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.10)",
              height: "40px",
            }}
          >
            <input
              ref={searchInputRef}
              id="search-input"
              class="input border-0 focus:outline-none bg-transparent flex-1 text-sm font-medium text-[#8e8e93] text-center pl-3"
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
                    id="MagnifyingGlassNotco"
                    size={26}
                    className="absolute left-2 sm:left-5 top-2 lg:relative lg:top-0 lg:left-[2px] text-[#8E8E93] scale-90 sm:scale-100"
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

export default Searchbar404;
