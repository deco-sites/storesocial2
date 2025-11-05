import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Source } from "apps/website/components/Picture.tsx";


export interface Category {
  tag?: string;
  href?: string;
  image?: ImageWidget;
  imageMobile?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText(
  { tag, label, description, alignment }: {
    tag?: string;
    label?: string;
    description?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && <h3 class="text-lg text-base-content">{label}</h3>}
      {description && <div class="text-sm text-neutral">{description}</div>}
    </div>
  );
}

const DEFAULT_LIST = [
  {
    tag: "10% off",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    imageMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4622/72229d96-b44d-4ccf-8836-a90eaa91d219",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    imageMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4622/72229d96-b44d-4ccf-8836-a90eaa91d219",

    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    imageMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4622/72229d96-b44d-4ccf-8836-a90eaa91d219",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    imageMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4622/72229d96-b44d-4ccf-8836-a90eaa91d219",

    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    imageMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4622/72229d96-b44d-4ccf-8836-a90eaa91d219",
    buttonText: "Ver produtos",
  },
];

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div id={id} class="container flex gap-0 text-base-content  items-center justify-between max-w-[1220px] md-tablet:flex-col full-phone:flex-col CategoryList-cy cs-all-tablet:px-5">
      <div>
        <h1 class="text-[36px] font-bold CategoryList-title-cy full-phone:text-[24px] ">
          {header.title}
        </h1>
      </div>

      <Slider class="carousel overflow-x-auto cs-min-full-desktop:carousel-end gap-10 full-phone:flex full-phone:justify-around">
        {list.map((
          { tag, href, image, buttonText, imageMobile },
          index,
        ) => (
          <Slider.Item
            index={index}
            class={`flex flex-col gap-4 carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0 CategoryList-item-${index + 1}-cy`}
          >
            <a href={href} class="flex flex-col gap-4 lg:h-auto">
              {image &&
                (
                  <figure>
                    <Image class={`card w-full max-w-56  max-h-40 CategoryList-item-image-${index + 1}-cy full-phone:hidden cs-min-full-phone:block`} src={image} alt={tag} loading="lazy" />
                    <Image class={`card w-full max-w-56  max-h-40 CategoryList-item-image-mobile-${index + 1}-cy full-phone:block cs-min-full-phone:hidden`} src={imageMobile} alt={tag} loading="lazy" />
                  </figure>
                )
              }
            </a>
            {buttonText &&
              <a href={href} class="btn">{buttonText}</a>}
          </Slider.Item>
        ))}
      </Slider>
      <div class="hidden">
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default CategoryList;
