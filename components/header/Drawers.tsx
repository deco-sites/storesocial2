import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("../../components/header/Menu.tsx"));
const Searchbar = lazy(() => import("../../components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 h-full max-w-[100vw] px-14 py-5 full-phone:px-0 full-phone:pb-0 full-phone:w-full full-phone:mx-[auto] full-phone:mb-[0] full-phone:z-50 flex flex-col">
    <div class="flex justify-between items-center  mb-[30px] full-phone:px-5 full-phone:mb-0 wrapper-search-mb Header-minicart-header-cy">
      <h1 class="">
        <span class="text-larger font-normal">{title}</span>
      </h1>
      {onClose && (
        <Button
          aria-label="X"
          class="btn btn-ghost h-auto min-h-[auto] p-0 shadow-none hover:bg-[transparent] absolute right-[20px] top-[22px] full-phone:hidden"
          onClick={onClose}
        >
          <Icon id="XMarkNotCo" size={30} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <>
      <Drawer // menu drawer
        class="drawer-menu"
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displayMenu.value = false;
              displaySearchDrawer.value = false;
            }}
          >
            {displayMenu.value && <Menu {...menu} />}
          </Aside>
        }
      >
        {children}
      </Drawer>
      <Drawer // search drawer
        class="drawer-search"
        open={displaySearchDrawer.value}
        onClose={() => {
          displaySearchDrawer.value = false;
          displayMenu.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displaySearchDrawer.value = false;
              displayMenu.value = false;
            }}
          >
            {searchbar && displaySearchDrawer.value && (
              <div class="w-screen">
                <Searchbar {...searchbar} />
              </div>
            )}
          </Aside>
        }
      >
        {children}
      </Drawer>
      <Drawer // minicart drawer
        class="drawer-end drawer-minicart"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title="Meu carrinho"
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
