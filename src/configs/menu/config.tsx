import {MdSwapHorizontalCircle} from 'react-icons/md'
import {GiPayMoney , GiReceiveMoney} from 'react-icons/gi'
import {IoDocumentText} from 'react-icons/io5'
import {FaCoins} from 'react-icons/fa'
import {HiChartBar} from 'react-icons/hi'

export const menuConfig = [
    {
        label: 'Swap',
        href: '/trade',
        icon: <MdSwapHorizontalCircle/>
    },
    {
        label: 'Launchpad',
        href: '/launchpad',
        icon: <GiPayMoney/>
    },
    {
        label: 'Earn',
        href: '/earn',
        icon: <GiReceiveMoney/>
    },
    {
        label: 'Game Center',
        href: '/gamecenter',
        icon: <GiPayMoney/>
    },
    {
        label: 'Crowdfunding',
        href: '/crowdfunding',
        icon: <GiPayMoney/>
    },
    {
        label: 'Stacks',
        href: '/stacks',
        icon: <FaCoins/>
    },
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <HiChartBar/>
    },
    {
        label: 'Docs',
        href: 'https://docs.bionswap.com',
        newWindow: true,
        icon: <IoDocumentText/>
    },
]

export const footerMenuConfig = [
    {
        title: 'Products',
        items: [
            {
                label: 'Swap',
                href: '/swap',
                icon: ''
            },
            {
                label: 'Stacks',
                href: '/stacks',
                icon: ''
            },
            {
                label: 'Crowdfunding',
                href: '/crowdfunding',
                icon: ''
            },
            {
                label: 'Dashboard',
                href: '/dashboard',
                icon: ''
            },
        ]
    },
    {
        title: 'Help',
        items: [
            {
                label: 'How to participate',
                href: '/how-to-participate',
                icon: ''
            },
            {
                label: 'FAQ',
                href: '/faq',
                icon: ''
            },
            {
                label: 'Support',
                href: '/support',
                icon: ''
            },
            {
                label: 'Term & privacy',
                href: '/term-and-privacy',
                icon: ''
            },
        ]
    },
    {
        title: 'For partner',
        items: [
            {
                label: 'Apply for ido',
                href: '/apply-for-ido',
                icon: ''
            },
            {
                label: 'About us',
                href: '/about-us',
                icon: ''
            },
            {
                label: 'Career',
                href: '/career',
                icon: ''
            },
        ]
    }
]

export const socialsConfig = [
    {
        label: 'Twitter',
        href: '/',
        icon: '/icons/socials/Twitter_black.svg'
    },
    {
        label: 'Discord',
        href: '/',
        icon: '/icons/socials/Discord_black.svg'
    },
    {
        label: 'Github',
        href: '/',
        icon: '/icons/socials/Github_black.svg'
    },
]