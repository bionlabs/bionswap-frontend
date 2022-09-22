import AllocationIcon from "assets/icons/AllocationIcon"
import LaunchpadIcon from "assets/icons/LaunchpadIcon"
import OverviewIcon from "assets/icons/OverviewIcon"
import Allocation from "views/Dashboard/views/Allocation/Allocation"
import Overview from "views/Dashboard/views/Overview/Overview"

const sidebarConfig = [
    {
        label: 'Overview',
        href: '/overview',
        icon: OverviewIcon,
        component: <Overview/>
    },
    {
        label: 'Allocation',
        href: '/allocation',
        icon: AllocationIcon,
        component: <Allocation/>
    },
    {
        label: 'Launchpad',
        href: '',
        icon: LaunchpadIcon,
        item: [
            {
                label: 'Explore',
                href: '/my-launchpad',
                icon: ''
            },
            {
                label: 'Draft',
                href: '/draft',
                icon: ''
            },
            {
                label: 'Create',
                href: '/launchpad/create',
                icon: ''
            },
        ]
    }
]

export default sidebarConfig