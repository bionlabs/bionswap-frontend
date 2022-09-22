import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Dashboard from "views/Dashboard"
import Sidebar from "views/Dashboard/components/Sidebar/Sidebar"

const DashboardPage = () => {
    const router = useRouter();
    // useEffect(() => {
    //     if (router.pathname == '/dashboard') {
    //       router.push('/dashboard/overview')
    //     }
    //   }, [router])

    return (
        <Sidebar>
            <Dashboard/>
        </Sidebar>
    
    )
}

export default DashboardPage