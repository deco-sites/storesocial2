import { Section } from "deco/blocks/section.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  section: Section;
  image: {
    src: ImageWidget;
    alt?: string;
    href?: string;
  };
}

export default function ShelfWithImage({ section, image }: Props) {
  return (
    <div class="container">
      <div class="grid md:grid-cols-2 grid-cols-1 bg-neutral-content">
        <a href={image.href} class="full-phone:hidden">
          <Image
            src={image.src}
            class="w-full h-full object-cover"
            width={720}
            height={640}
            alt={image.alt}
          />
        </a>
        <div class="max-w-[425px] mx-auto flex items-center overflow-x-hidden ShelfWithImage">
          <section.Component {...section.props} />
        </div>
      </div>
    </div>
  );
}
