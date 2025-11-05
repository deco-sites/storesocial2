import SearchbarNF from "./SearchbarNF.tsx";
import Icon from "../../components/ui/Icon.tsx";


export default function Page404() {
  return (
    <div class="w-full flex flex-col justify-center items-center pt-[68px] pb-[68px] mx-auto max-w-9/10 lg:max-w-full full-phone:px-5 full-phone:pt-[150px]">
      <div>
        <div class="text-black text-[50px] font-normal leading-[66px] text-center -mb-10">ops</div>
        <div>
          <img src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4622/77607aac-8658-4b22-abdd-20a9c002b5f8" alt="404" />
        </div>
      </div>
      <span className="text-black text-large max-w-[284px] uppercase leading-[26px] text-center mb-[14px] mt-5 font-bold">
        Ops! não encontramos essa página.
      </span>
      <div className="flex flex-col items-center mb-16">
        <span className="text-black text-bigger font-normal mb-5 text-center max-w-[310px]">
          Faça uma nova busca e continue explorando o delicioso universo de NotCo!
        </span>
        <div className="pageSearchbar w-full sm:max-w-9/10">
          <SearchbarNF buttonClose={false} />
        </div>
      </div>
      <a
        href="/"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-[10px] mb-8 bg-black text-white text-big font-normal" >
        <Icon id="RefreshNotCo" size={18} strokeWidth={2} />
        Voltar para o início
      </a>
    </div>
  );
}

