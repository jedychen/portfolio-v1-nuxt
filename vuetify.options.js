import colors from "vuetify/es5/util/colors";
import GithubIcon from "@/components/icons/GithubIcon";
import GmailIcon from "@/components/icons/GmailIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import MediumIcon from "@/components/icons/MediumIcon";

export default {
  treeShake: true,
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#f88826', //Yellow
        secondary: '#584e57', //grey-purple
        accent: '#b74b41', //orange
        info: '#fff',
      }
    }
  },
  icons: {
    values: {
      github: {
        component: GithubIcon,
      },
      gmail: {
        component: GmailIcon,
      },
      linkedin: {
        component: LinkedInIcon,
      },
      medium: {
        component: MediumIcon,
      }
    }
  },
};
