import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import Navbar from "@/components/Common/Navbar"
import Sidebar from "@/components/Common/Sidebar"
import { isLoggedIn } from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  return (
    <div className="flex" direction="column" h="100vh">
      <Navbar />
      <div className="flex" flex="1" overflow="hidden">
        <Sidebar />
        <div
          className="flex"
          flex="1"
          direction="column"
          p={4}
          overflowY="auto"
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
