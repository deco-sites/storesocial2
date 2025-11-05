import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`flex flex-row gap-6 lg:gap-10 w-full justify-between md-tablet:hidden ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section, index) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span
                    class={`Footer-Item-Desktop-${
                      index + 1
                    }-cy text-white text-large font-bold`}
                  >
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li class={`Footer-SubItem-Desktop-${index + 1}-cy`}>
                        <a
                          href={item.href}
                          class="text-white text-big font-normal"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="hidden flex-col md-tablet:flex gap-0 cs-all-tablet:flex-row cs-all-tablet:w-full cs-all-tablet:justify-between">
            {sections.map((section, index) => (
              <li class="py-3 item-menu-mobile first:border-t	first:border-white first:border-solid cs-all-tablet:border-none cs-all-tablet:first:border-none">
                <div class="collapse collapse-arrow ">
                  <input id={section.label} type="checkbox" class="min-h-[0]" />
                  <label
                    htmlFor={section.label}
                    class={`Footer-Item-Mobile-${
                      index + 1
                    }-cy collapse-title min-h-[0] !p-0 flex gap-2 text-big text-white cs-all-tablet:justify-center cs-all-tablet:text-large cs-all-tablet:relative`}
                  >
                    <span class="cs-all-tablet:pr-6">{section.label}</span>
                  </label>
                  <div class="collapse-content">
                    <ul
                      class={`flex flex-col gap-1 pt-2.5 pl-0 cs-all-tablet:text-center`}
                    >
                      {section.items?.map((item, index) => (
                        <li>
                          <a
                            href={item.href}
                            class={`Footer-SubItem-Mobile-${
                              index + 1
                            }-cy block py-1 link link-hover text-base text-white cs-all-tablet:text-big`}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
