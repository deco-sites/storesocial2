import Button from "../ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join  border-[transparent]  rounded-[5px] w-[100px] flex max-h-[38px]">
      <Button
        class="p-0 flex-[1] h-[36px] min-h-[36px] rounded-[5px] disabled:bg-white-1 bg-white-1 border-[transparent] hover:bg-white-1 hover:border-[transparent]"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="MinusSignNotCo" size={14} strokeWidth={2} />
      </Button>
      <input
        class="input text-center  bg-white-1 disabled:bg-white-1 disabled:border-white-1 join-item [appearance:textfield] p-0 flex-[1] h-[36px] min-h-[36px]"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="p-0 flex-[1] h-[36px] min-h-[36px] bg-white-1 disabled:bg-white-1 rounded-[5px] border-[transparent] hover:bg-white-1 hover:border-[transparent]"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="PlusSignNotCo" size={14} strokeWidth={2} />
      </Button>
    </div>
  );
}

export default QuantitySelector;
