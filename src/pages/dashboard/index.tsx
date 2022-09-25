import Sidebar from "components/Sidebar"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Dashboard from "views/Dashboard"
import sidebarConfig from "views/Dashboard/sidebarConfig"

const DashboardPage = () => {
    const router = useRouter();
    useEffect(() => {
        if (router.pathname == '/dashboard') {
          router.push('/dashboard/overview')
        }
      }, [router])

    return (
        <Sidebar menuItems={sidebarConfig} rootHref='dashboard'>
            <Dashboard/>
        </Sidebar>
    
    )
}

export default DashboardPage