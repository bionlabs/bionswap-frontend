import AllocationIcon from "assets/icons/AllocationIcon"
import LaunchpadIcon from "assets/icons/LaunchpadIcon"
import OverviewIcon from "assets/icons/OverviewIcon"
import Allocation from "views/Dashboard/views/Allocation/Allocation"
import Overview from "views/Dashboard/views/Overview/Overview"
import MyProject from "./views/MyProject"

const sidebarConfig = [
    {
        label: 'Allocations',
        href: '/allocations',
        icon: OverviewIcon,
        component: <Overview/>
    },
    {
        label: 'My Project',
        href: '/my-project',
        icon: AllocationIcon,
        component: <MyProject/>
    },
    {
        label: 'Activities',
        href: '/activities',
        icon: AllocationIcon,
        component: <Allocation/>
    },
]

export default sidebarConfig