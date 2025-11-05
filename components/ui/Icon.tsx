import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "ArrowUpDown"
  | "Bars3"
  | "HamburguerMenu"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronRightPdpMb"
  | "ChevronLefNotCo"
  | "ChevronRightPdpDesk"
  | "ChevronRightNotCo"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "MastercardNotCo"
  | "VisaNotCo"
  | "AENotCo"
  | "BoletoNotCo"
  | "EloNotCo"
  | "PixNotCo"
  | "HyperCardNotCo"
  | "DinersNotCo"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "MagnifyingGlassNotco"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "ShoppingCartNotCo"
  | "ShoppingCartNotCoCTA"
  | "ShoppingCartNotCoBlack"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "UserNotCo"
  | "Visa"
  | "WhatsApp"
  | "Youtube"
  | "XMark"
  | "Zoom"
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError"
  | "share"
  | "XMarkNotCo"
  | "XMarkNotCoWhite"
  | "PlusSignNotCo"
  | "MinusSignNotCo"
  | "emptyCartNotCo"
  | "UserNotCoMobile"
  | "CartNotCoMobile"
  | "CloseGray"
  | "MagnifyingGlassNotCoGray"
  | "TruckNotCo"
  | "MoneyBagNotCo"
  | "ShieldNotCo"
  | "InstallmentsNotCo"
  | "ChevronRightFeed"
  | "ChevronLeftFeed"
  | "CartWhite"
  | "ArrowUp"
  | "ArrowRightGray"
  | "ArrowLeftGray"
  | "arrowProdLeft"
  | "arrowProdRight"
  | "boletoIcon"
  | "PlusSignNotCoBlack"
  | "MinusSignNotCoBlack"
  | "boxNotCo"
  | "boxNotCoWhite"
  | "ArrowDownPDP"
  | "RefreshNotCo"
  | "ArrowUpPDP"
  | "MagnifyingGlassBlack"
  | "ArrowUpDownBlack"
  | "ArrowLeftSquare"
  | "ArrowRightSquare"
  | "LogoNotco"
  | "TrashNotCo";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 2, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
