import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   * @title Texto marca SEO
   * @default É a comida que você ama, mas melhor.
   */
  title?: string;
  /**
   * @title Imagem logo Marca
   */
  image?: ImageWidget;
}

export default function BrandContent({
  title = "É a comida que você ama, mas melhor.",
  image,
}: Props) {
  return (
    <>
      <div class="w-full container flex px-4 pt-12 full-phone:px-[23px] BrandContent-cy">
        <div class="w-full flex justify-center">
          <div class="flex justify-center items-center gap-[50px] w-full full-phone:gap-[30px]">
            {image && (
              <Image
                width={111}
                class="full-phone:max-w-[78px]"
                sizes="(max-width: 110px) 100vw, 30vw"
                src={image}
                alt={image}
                decoding="async"
                loading="lazy"
              />
            )}
            

            <div class="w-[2px] bg-black h-[50px] full-phone:h-full "></div> 

            <div class="BrandContent-text-cy text-[36px] text-black font-bold leading-[48px] text-left uppercase full-phone:text-larger full-phone:leading-[22px]">
              {title}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
