import AllocationIcon from "assets/icons/AllocationIcon"
import LaunchpadIcon from "assets/icons/LaunchpadIcon"
import OverviewIcon from "assets/icons/OverviewIcon"
import MyProject from "views/MyProject"
import Allocation from "views/Dashboard/views/Allocation/Allocation"
import Overview from "views/Dashboard/views/Overview/Overview"
import MyProjectsIcon from "assets/icons/MyProjectsIcon"

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
        href: '/my-project',
        icon: LaunchpadIcon,
        item: [
            {
                label: 'My Project',
                href: '/my-project',
                icon: MyProjectsIcon,
                component: <MyProject/>
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