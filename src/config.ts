import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Srinath Anand',
  subtitle: 'Blogs',
  lang: 'en',
  themeHue: 260,
  banner: {
    enable: false,
    src: 'assets/images/alien-avatar.png',
  },
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/themagitian',
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/alien-avatar.png',
  name: 'Srinath Anand',
  bio: 'Arch Linux user, writing Rust using Emacs.',
  links: [
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/themagitian',
    },
	{ /* 
  {
	  name: 'IceShrimp',
	  icon: 'fa6-brands:mastodon',
	  url: 'https://fedia.social/@magitian?rel="me"'
	},
  */ }
	{
	  name: 'GitLab',
	  icon: 'fa6-brands:gitlab',
	  url: 'https://gitlab.com/magitian'
	},
	{
	  name: 'LinkedIn',
	  icon: 'fa6-brands:linkedin',
	  url: 'https://linkedin.com/srinath-anand'
	},
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
