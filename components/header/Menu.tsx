import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
  type?: string;
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full px-5 full-phone:pt-[115px]">
      <div class="text-[20px] font-bold leading-6 text-black uppercase">
        Área do cliente
      </div>
      
      <div class="flex pt-[10px] pb-5 gap-2">
        <div class="bg-white-1 p-[10px] rounded-[5px]">
          <a class="flex flex-col" href="/my-account">
            <Icon
              class="mb-[10px]"
              id="UserNotCoMobile"
              size={30}
              strokeWidth={2}
            />
            <span class="text-base font-normal leading-[14px] text-left uppercase  w-[75%]">
              Minha conta
            </span>
          </a>
        </div>
        <div class="bg-white-1 p-[10px] rounded-[5px]">
          <a class="flex flex-col" href="/my-account">
            <Icon
              class="mb-[10px]"
              id="CartNotCoMobile"
              size={30}
              strokeWidth={2}
            />
            <span class="text-base font-normal leading-[14px] text-left uppercase  w-[75%]">
              Meus pedidos
            </span>
          </a>
        </div>
      </div>

      <ul class="flex-grow flex flex-col">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="pt-3 pb-3 border-b border-solid border-gray-10">
      <div class={`flex text-[22px] font-bold leading-[24px] text-black `}>
        <a href={item.url} >
          <span class={`font-bold font-afacad text-larger leading-[22px]  full-phone:text-black`}>
            {item.additionalType}
          </span>
          <span  style={{ color: item.identifier }} >
            {item.name}
          </span>
        </a>
      </div>
    </div>
  );
}

export default Menu;
