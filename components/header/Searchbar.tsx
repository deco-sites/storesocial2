import { headerHeight } from "../../components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "../../components/search/Searchbar.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return (
    <Modal
      loading="lazy"
      open={displaySearchPopup.value}
      onClose={() => displaySearchPopup.value = false}
      customClass="full-phone:overflow-y-scroll"
    >
      <div
        class="absolute top-0 bg-base-100 container max-w-[966px] -translate-x-[50px] rounded-[10px] searchbar-container p-0 full-phone:translate-x-0 full-phone:w-[calc(100%-20px)]  full-phone:max-w-full full-phone:top-[-5px] cs-all-tablet:translate-x-[0] cs-all-tablet:w-[95%]"
        style={{ marginTop: headerHeight }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>
  );
}

export default SearchbarModal;
