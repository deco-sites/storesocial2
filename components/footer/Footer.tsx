import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import Icon from "../ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Facebook"
    | "Instagram"
    | "Youtube";
  link: string;
  width: string;
  height: string;
}

export interface PaymentItem {
  label:
    | "MastercardNotCo"
    | "DinersNotCo"
    | "VisaNotCo"
    | "AENotCo"
    | "HyperCardNotCo"
    | "EloNotCo"
    | "PixNotCo"
    | "BoletoNotCo";
  width: string;
  height: string;
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  textoLogo?: string;
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
  logoSocial?: {
    image: ImageWidget;
    url?: string;
  };
  logoVtex?: {
    image: ImageWidget;
    url?: string;
  };
  copyright?: string;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  textoLogo,
  logoSocial,
  logoVtex,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/", width: "22px", height: "22px" }, {
      label: "Youtube",
      link: "/",
      width: "32px",
      height: "22px",
    }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "MastercardNotCo", width: "27px", height: "17px" }, {
      label: "VisaNotCo",
      width: "26px",
      height: "21px",
    }, { label: "PixNotCo", width: "25px", height: "22px" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
  copyright = "test",
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <div class="flex gap-[30px]"><Logo logo={logo} /><div class="w-[1px] h-full bg-white"></div><div class="max-w-[200px] flex text-white text-larger leading-[24px] items-center font-bold flex-col justify-center cs-all-tablet:items-start cs-all-tablet:gap-2.5 ">{textoLogo}<div class="cs-all-tablet:flex hidden"><Social content={social} /></div></div></div>;
  const _logoSocial = <Logo logo={logoSocial} />;
  const _logoVtex = <Logo logo={logoVtex} />;
  const _copyright = <div class="Footer-message-copyright-cy">{copyright}</div>;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;

  return (
    <footer class="bg-black text-red py-5 relative z-10 full-phone:mt-20 Footer-cy cs-all-tablet:pt-[60px]">
      <div class="footer-top md:block w-full mx-auto px-7 max-w-[1318px] mb-[40px] py-10 md:py-0 md:mb-10 lg:py-10 lg:mb-0 full-phone:py-8 full-phone:px-4 full-phone:mb-0 cs-all-tablet:px-10">
        <div class="footer-logo flex justify-between">
          {_logo}
          <div class="full-phone:hidden cs-all-tablet:flex cs-all-tablet:items-center">
            <BackToTop content={backToTheTop?.text} />
          </div>
        </div>
      </div>
      <div class="footer-main w-full mx-auto px-7 full-phone:px-4 max-w-[1314px] md:flex-col lg:flex lg:flex-row gap-32 cs-all-tablet:px-10 cs-all-tablet:flex-col cs-all-tablet:gap-[70px]">
        <div class="flex flex-col-reverse mb-5 md:gap-12 md:flex-row  full-phone:mb-7">
          {_newsletter}
        </div>
        <div class="footer-menu mb-7 md:flex lg:flex  justify-start lg:w-full ">
          {_sectionLinks}
        </div>
      </div>

      <div class="footer-bottom w-full mx-auto px-7 full-phone:px-4 max-w-[1314px]">
        <div class="footer-bottom-1 md:flex md:gap-6 md:justify-between lg:flex lg:items-end lg:justify-between">
          <div class="footer-social-links lg:flex md:gap-3 lg:gap-5 hidden md:flex md:pr-0 md:items-center pr-[90px] cs-all-tablet:hidden">
            {_social}
          </div>
          <div class="footer-payments mb-0">
            <div class="payments flex flex-col justify-center items-center">
              <h3 class="payments-title mb-5 text-big font-medium text-white text-center">
                Pagamento
              </h3>
              {_payments}
            </div>
          </div>
          <div class="footer-partners mb-0">
            <div class="partners">
              <ul class="partners-list flex md:gap-5 gap-x-12 justify-center full-phone:mb-6">
                <li class="partners-item text-center Footer-PlataformIcon-cy">
                  <span class="partners-title mb-[15px] block text-big text-white font-medium">
                    Plataforma
                  </span>
                  <a href={logoVtex?.url} target="blank" >
                    {_logoVtex}
                  </a>
                </li>
                <li class="partners-item text-center Footer-ManagedIcon-cy">
                  <span class="partners-title mb-[15px] block text-big text-white font-medium">
                    Managed by
                  </span>
                  <a href={logoSocial?.url} target="blank">
                    {_logoSocial}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom-2 md:mt-10 md:mb-12">
          <div class="footer-copyright">
            <span class="copyright text-white text-base font-normal text-center block">
              {_copyright}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
