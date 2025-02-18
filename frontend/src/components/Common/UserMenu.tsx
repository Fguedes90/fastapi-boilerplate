import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { FaUserAstronaut } from "react-icons/fa"
import { FiLogOut, FiUser } from "react-icons/fi"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import useAuth from "@/hooks/useAuth"

const UserMenu = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <>
      {/* Desktop */}
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="max-w-[150px] truncate p-2"
              data-testid="user-menu"
            >
              <FaUserAstronaut fontSize="18" />
              <p>{user?.full_name || "User"}</p>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <Link to="/settings">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <FiUser fontSize="18px" />
                <div className="flex-1">My Profile</div>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <FiLogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default UserMenu
