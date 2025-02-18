import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"

import type { UserPublic } from "@/client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/drawer"
import useAuth from "@/hooks/useAuth"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    logout()
  }

  return (
    <>
      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden fixed left-4 top-4 z-50"
            aria-label="Open Menu"
          >
            <FaBars className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px]">
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4">
              <SidebarItems />
              <button
                onClick={handleLogout}
                type="button"
                className="flex items-center space-x-4 px-4 py-2 w-full hover:bg-accent rounded-md"
              >
                <FiLogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
            {currentUser?.email && (
              <p className="text-sm p-2 text-muted-foreground">
                Logged in as: {currentUser.email}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <div className="hidden md:block sticky top-0 min-w-[280px] h-screen bg-muted/50 p-4">
        <div className="w-full">
          <SidebarItems />
        </div>
      </div>
    </>
  )
}

export default Sidebar
