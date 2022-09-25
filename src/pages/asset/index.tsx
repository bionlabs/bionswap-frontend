import Sidebar from "components/Sidebar"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Asset from "views/Asset"
import sidebarConfig from "views/Asset/sidebarConfig"

const AssetPage = () => {
    const router = useRouter();
    useEffect(() => {
        if (router.pathname == '/asset') {
          router.push('/asset/my-project')
        }
      }, [router])

    return (
        <Sidebar menuItems={sidebarConfig} rootHref='asset'>
            <Asset />
        </Sidebar>
    
    )
}

export default AssetPage