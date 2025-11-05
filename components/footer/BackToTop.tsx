import Icon from "../../components/ui/Icon.tsx";

export default function BackToTop({ content }: { content?: string }) {
  const backToTop = () => {
    globalThis.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {content && (
        <div class="flex">
          <button
            onClick={backToTop}
            class=" Footer-backtotop-cy btn px-5 py-3 rounded-[50px] "
          >
            {content} <Icon id="ArrowUp" width={16} height={16} />
          </button>
        </div>
      )}
    </>
  );
}
