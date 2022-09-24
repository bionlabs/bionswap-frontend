import AllocationIcon from "assets/icons/AllocationIcon"
import LaunchpadIcon from "assets/icons/LaunchpadIcon"
import OverviewIcon from "assets/icons/OverviewIcon"
import Allocation from "views/Dashboard/views/Allocation/Allocation"
import Overview from "views/Dashboard/views/Overview/Overview"

const sidebarConfig = [
    {
        label: 'Allocations',
        href: '/allocations',
        icon: OverviewIcon,
        component: <Overview/>
    },
    {
        label: 'My Projects',
        href: '/my-projects',
        icon: AllocationIcon,
        component: <Allocation/>
    },
    {
        label: 'Activities',
        href: '/activities',
        icon: AllocationIcon,
        component: <Allocation/>
    },
]

export default sidebarConfig