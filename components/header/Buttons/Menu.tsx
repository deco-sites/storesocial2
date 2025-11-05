import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="bg-black border-none"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.value;
      }}
    >
      {displayMenu.value
        ? <Icon id="XMarkNotCoWhite" size={33} strokeWidth={1} />
        : <Icon id="HamburguerMenu" size={22} strokeWidth={0.01} />}
    </Button>
  );
}
