import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { mobileNavbarHeight, navbarHeight } from "./constants.ts";
import { Buttons, Logo } from "../../components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { items, searchbar, logo, buttons, logoPosition = "left", device }: {
    items: SiteNavigationElement[];
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    logoPosition?: "left" | "center";
    device: "mobile" | "desktop" | "tablet";
  },
) {
  const platform = usePlatform();
  return (
    <div>
      {/* header MOBILE */}
      <div class=" flex justify-between items-center py-0 px-4 bg-black mx-2.5 my-2.5 rounded-[5px] cs-all-tablet:mx-0 cs-all-tablet:my-0 cs-all-tablet:rounded-none cs-all-tablet:py-4 header-mobile">
        <div class="flex flex-[1]">
          <MenuButton />
        </div>
        <div class="flex">
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center full-phone:max-w-[38px]"
              aria-label="Store logo"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
                class="phoneNotCo:w-[38px]"
              />
            </a>
          )}
        </div>
        <div class="flex flex-[1] items-center justify-end gap-x-10">
          <div>
            <SearchButton />
          </div>
          <div>
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
            {platform === "nuvemshop" && <CartButtonNuvemshop />}
          </div>
        </div>
        <Searchbar searchbar={searchbar} />
      </div>
      {/* header DESKTOP */}
      <div class="w-full px-6 bg-black header-desktop">
        <div class="container-notco flex flex-row items-center justify-between py-[12px]">
          <div className="menu-logo-wrapper flex items-center  gap-[5.65rem]">
            <div class="logo-container">
              <div
                class={`flex ${
                  logoPosition === "left" ? "justify-start" : "justify-center"
                }`}
              >
                {logo && (
                  <a href="/" aria-label="Store logo" class="block">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width || 100}
                      height={logo.height || 13}
                    />
                  </a>
                )}
              </div>
            </div>
            <div class="menu-container">
              <ul
                class={`submenu-notco flex gap-6 ${
                  logoPosition === "left" ? "justify-center" : "justify-start"
                }`}
              >
                {items.map((item) => <NavItem item={item} />)}
              </ul>
            </div>
          </div>
          <div className="buttons-wrapper flex">
            <div className="buttons-container flex flex-row items-center">
              {!buttons?.hideSearchButton && (
                <div class="flex items-center text-xs font-thin gap-1 pr-11">
                  <SearchButton />
                </div>
              )}

              <Searchbar searchbar={searchbar} />

              <a
                class="flex items-center text-xs font-thin border-[2px] border-[solid] border-[white] rounded-[80px] h-[40px]"
                href="/account"
                aria-label="Account"
              >
                <div class="flex">
                  <Icon id="UserNotCo" size={40} strokeWidth={0.4} />
                </div>
                <div class="max-w-[85px] text-white pl-2.5 pr-4 py-0 flex justify-center flex-col Header-account-button-cy">
                  <div>
                    <span class="font-bold">Entrar</span>
                  </div>
                  <div class="h-[14px]">
                    cadastrar
                  </div>
                </div>
              </a>

              {!buttons?.hideWishlistButton && (
                <a
                  class="flex items-center text-xs font-thin"
                  href="/wishlist"
                  aria-label="Wishlist"
                >
                  <button
                    class="flex btn btn-circle btn-sm btn-ghost gap-1"
                    aria-label="Wishlist"
                  >
                    <Icon id="Heart" size={24} strokeWidth={0.4} />
                  </button>
                  WISHLIST
                </a>
              )}
              {!buttons?.hideCartButton && (
                <div class="flex items-center text-xs font-thin pl-[30px] Header-minicart-header-cy">
                  {platform === "vtex" && <CartButtonVTEX />}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;