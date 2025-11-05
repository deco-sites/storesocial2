import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface SlideProps {
  label?: string;
  repeat?: number;
  icon?: ImageWidget;
}

export interface Props {
  content?: SlideProps[];
}

export default function Slide({
  content = [
    {
      label: "Label",
      repeat: 1,
      icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4622/72229d96-b44d-4ccf-8836-a90eaa91d219",
    },
  ],
}: Props) {
  const slideContent = content?.map(({ label, icon, repeat = 1 }) => {
    return (
      <div class="flex items-center gap-x-10 mx-4 SliderInfinito-cy ">
        {Array(repeat).fill(0).map((index) => (
          <div class={` SliderInfinito-item-${index + 1}-cy flex flex-row-reverse gap-[18px] items-center`}>
            <span class={`text-sm font-extralight text-base-content whitespace-nowrap  SliderInfinito-item-${index + 1}-title-cy`}>
              {label}
            </span>
            {icon && (
              <div class={`SliderInfinito-item-${index + 1}-icon-cy w-6 h-6`}>
                <img src={icon} alt={label}  />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  });
  return (
    <div class="relative w-full overflow-hidden h-16 bg-white-1 my-12 full-phone:mt-10 full-phone:mb-0">
      <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-16">
        {slideContent}
      </div>
    </div>
  );
}
