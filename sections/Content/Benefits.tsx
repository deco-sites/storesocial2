import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";

interface Benefit {
  /**
   * @title Título benefício - Desktop
   */
  label: string;
  /**
   * @title Título benefício - Mobile
   */
  labelMobile: string;
  /**
   * @title Subtítulo benefício - Desktop
   */
  subtitle: string;
  /**
   * @title Subtítulo benefício - Mobile
   */
  subtitleMobile: string;
  /**
   * @format icon-select
   * @options deco-sites/storefront/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
  description: string;
}

export interface Props {
  /**
   * @default Benefits
   */
  title?: string;
  /**
   * @default Check out the benefits
   */
  description?: string;
  benefits?: Array<Benefit>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "Benefits",
    description = "Check out the benefits",
    benefits = [{
      icon: "Truck",
      label: "FRETE GRÁTIS",
      labelMobile: "FRETE GRÁTIS",
      subtitle: "para compras acima de R$ 150,00",
      subtitleMobile: "a partir de R$ 150",
      description: " ",
    }, {
      icon: "Discount",
      label: "PARCELE SUAS COMPRAS",
      labelMobile: "FACILITADO",
      subtitle: "Parcele em até 5 vezes sem juros",
      subtitleMobile: "Parcele em até 5x",
      description: " ",
    }, {
      icon: "ArrowsPointingOut",
      label: "MAIS ECONOMIA",
      labelMobile: "MAIS POR MENOS",
      subtitle: "Compre os nossos Kits",
      subtitleMobile: "com nossos kits",
      description: " ",
    }, {
      icon: "Discount",
      label: "COMPRA SEGURA",
      labelMobile: "SEGURO",
      subtitle: "Loja com SSL e proteção de dados",
      subtitleMobile: "Site protegido por SSL",
      description: " ",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-primary text-primary-content p-4 lg:px-8 lg:py-4" : ""
        } flex gap-4  justify-center items-center rounded-tr-none rounded-tl-[10px] rounded-br-[10px] rounded-bl-[5px] p-3 bg-white-1  full-tablet:items-start ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${
          showDivider && benefitLayout !== "piledup"
            ? ""
            : ""
        } ${showDivider ? "" : ""} ${
          showDivider && !reverse ? "" : ""
        } Benefits-item-${index + 1}-cy`}
      >
        <div class={`flex-none Benefits-item-${index + 1}-Icon-cy`}>
          <Icon
            id={benefit.icon}
            class={"text-base-content"}
            width={32}
            height={32}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class={`flex-auto flex flex-col gap-0 justify-center full-tablet:min-w-[140px] `}>
          <div class={`font-afacad text-big font-semibold leading-4 text-left full-phone:hidden cs-min-full-phone:block Benefits-item-${index + 1}-labelDesk-cy`}>
            {benefit.label}
          </div>
          <div class={`font-afacad text-base font-semibold leading-[14px] text-left full-phone:block cs-min-full-phone:hidden Benefits-item-${index + 1}-labelMobile-cy`}>
            {benefit.labelMobile}
          </div>
          <div  class={`font-afacad text-big font-normal leading-4 text-left full-phone:hidden cs-min-full-phone:block Benefits-item-${index + 1}-SubtitleDesk-cy`}>
            {benefit.subtitle}
          </div>
          <div  class={`font-afacad  text-base font-normal leading-[14px] full-phone:block cs-min-full-phone:hidden Benefits-item-${index + 1}-SubtitleMobile-cy`}>
            {benefit.subtitleMobile}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full container px-4 py-[50px] flex flex-col gap-8 max-w-[1340px] Benefits-cy cs-all-tablet:overflow-x-scroll">
            <div class="w-full flex justify-center cs-all-tablet:w-[1200px]">
              <div class="listOfBenefits flex justify-between gap-4 lg:gap-8 w-full full-tablet:flex-row full-phone:overflow-x-scroll cs-all-tablet:overflow-x-clip full-tablet:overflow-y-hidden">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class=" gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="gap-4 w-full lg:gap-8">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
