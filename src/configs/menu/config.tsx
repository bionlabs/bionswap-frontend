import {MdSwapHorizontalCircle} from 'react-icons/md'
import {GiPayMoney , GiReceiveMoney} from 'react-icons/gi'
import {FaCoins} from 'react-icons/fa'
import {HiChartBar} from 'react-icons/hi'

export const menuConfig = [
    {
        label: 'Trade',
        href: '/trade',
        icon: <MdSwapHorizontalCircle/>
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
        label: 'Earn',
        href: '/earn',
        icon: <GiReceiveMoney/>
    },
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <HiChartBar/>
    }
]

export const footerMenuConfig = [
    {
        title: 'About',
        items: [
            {
                label: 'Team',
                href: '/team',
                icon: ''
            },
            {
                label: 'Careers',
                href: '/careers',
                icon: ''
            },
            {
                label: 'Privacy',
                href: '/privacy',
                icon: ''
            },
            {
                label: 'Terms',
                href: '/terms',
                icon: ''
            },
            {
                label: 'Contact',
                href: '/contact',
                icon: ''
            },
        ]
    },
    {
        title: 'Resources',
        items: [
            {
                label: 'Blog',
                href: '/blog',
                icon: ''
            },
            {
                label: 'FAQ',
                href: '/faq',
                icon: ''
            },
            {
                label: 'Knowledge Centre',
                href: '/knowledge-centre',
                icon: ''
            },
            {
                label: 'Oracles',
                href: '/oracles',
                icon: ''
            },
        ]
    },
    {
        title: 'Products',
        items: [
            {
                label: 'Swap',
                href: '/swap',
                icon: ''
            },
            {
                label: 'Farm',
                href: '/farm',
                icon: ''
            },
            {
                label: 'Pool',
                href: '/pool',
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