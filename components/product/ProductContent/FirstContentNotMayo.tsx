import { useId } from "../../../sdk/useId.ts";
import type { Props as PropsFirstContentNotMayo } from "../../../sections/Product/ProductSpecialContent.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";


interface Props {
  page: ProductDetailsPage | null;
  /**
   * @title Tag highlight primeiro conteúdo NotMayo   
   */
  contentTag?: string;
  /**
   * @title Cor da Tag highlight primeiro conteúdo NotMayo   
   */
  contentTagColor?: string;
  /**
   * @title Título primeiro conteúdo NotMayo   
   */
  contentTitle?: string;
  /**
  * @title Texto primeiro conteúdo NotMayo   
  */
  contentText?: string;
  /**
  * @title Imagem principal primeiro conteúdo NotMayo   
  */
  imgDesk: ImageWidget;
}


function FirstContentNotMayo({ page, firstContentNotMayo }: PropsFirstContentNotMayo) {

  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const brandName = product.brand.name;

  return (
    <div class="flex px-4" id={id}>

      <div>
      {
        brandName === "NotMayo" ?(
          <div class="flex full-phone:flex-col items-center gap-20 full-phone:gap-3.5">
            <div class="flex full-phone:order-2">
              <img src={firstContentNotMayo.imgDesk} alt="" srcset="" />
            </div>
            <div class="flex flex-col max-w-[520px] gap-3.5 cs-all-tablet:max-w-[334px] ">
              <div class="text-base font-bold full-phone:hidden" style={{ color: firstContentNotMayo.contentTagColor }}>
                {firstContentNotMayo?.contentTag}
              </div>
              <div class="text-black-1 text-[28px] font-bold leading-9 full-phone:order-1">
                {firstContentNotMayo?.contentTitle}
              </div>
              <div class="text-big text-black-1 font-normal leading-5 full-phone:order-3">
                {firstContentNotMayo?.contentText}
              </div>
            </div>

          </div>
        ):
        ('')
      }
      </div>
    </div>
  );
}

export default FirstContentNotMayo;
