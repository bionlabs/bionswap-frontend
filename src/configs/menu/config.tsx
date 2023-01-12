import { MdSwapHorizontalCircle } from 'react-icons/md';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { IoDocumentText } from 'react-icons/io5';
import { FaCoins, FaTwitter, FaDiscord, FaGithub, FaTelegram } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';

export const MENU_HEIGHT = 62;

export const menuConfig = [
  {
    label: 'Swap',
    href: '/swap',
    items: [],
  },
  {
    label: 'Launchpad',
    href: '/launchpad',
    items: [],
  },
  {
    label: 'Earn',
    href: '/earn',
    items: [
      {
        label: 'Earn',
        href: '/earn',
      },
      {
        label: 'Add Liquidity',
        href: '/earn/add',
      },
    ],
  },
  {
    label: 'Start a Launch',
    href: '/launch',
    items: [],
  },
  {
    label: 'Game Center',
    href: '/gamecenter',
    items: [],
  },
  // {
  //     label: 'Stacks',
  //     href: '/stacks',
  //     icon: <FaCoins/>
  // },
  // {
  //     label: 'Dashboard',
  //     href: '/dashboard',
  //     icon: <HiChartBar/>
  // },
  {
    label: 'Docs',
    href: 'https://docs.bionswap.com',
    items: [],
    newWindow: true,
  },
];

export const footerMenuConfig = [
  {
    title: 'Products',
    items: [
      {
        label: 'Swap',
        href: '/swap',
        icon: '',
      },
      {
        label: 'Launchpad',
        href: '/launchpad',
        icon: '',
      },
      {
        label: 'Start a Launch',
        href: '/launch',
        icon: '',
      },
    ],
  },
  {
    title: 'Help',
    items: [
      {
        label: 'How to participate',
        href: '',
        icon: '',
      },
      {
        label: 'FAQ',
        href: '',
        icon: '',
      },
      {
        label: 'Support',
        href: '',
        icon: '',
      },
      {
        label: 'Term & privacy',
        href: '/term-and-privacy',
        icon: '',
      },
    ],
  },
  {
    title: 'More Infomation',
    items: [
      {
        label: 'Docs',
        href: 'https://docs.bionswap.com',
        icon: '',
      },
      {
        label: 'Debug Campaign',
        href: '/about-us',
        icon: '',
      },
      {
        label: 'Career',
        href: '/career',
        icon: '',
      },
    ],
  },
];

export const socialsConfig = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/BionSwap',
    icon: <FaTwitter />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/bionswap',
    icon: <FaTelegram />,
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/fXpz2Jb84S',
    icon: <FaDiscord />,
  },
  {
    label: 'Github',
    href: 'https://github.com/bionswap/bionswap-frontend',
    icon: <FaGithub />,
  },
];
