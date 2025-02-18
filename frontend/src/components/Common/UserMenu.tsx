import { Button } from "@shadcn/ui"
import { Link } from "@tanstack/react-router"
import { FaUserAstronaut } from "react-icons/fa"
import { FiLogOut, FiUser } from "react-icons/fi"

import useAuth from "@/hooks/useAuth"
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu"

const UserMenu = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <>
      {/* Desktop */}
      <div className="flex">
        <MenuRoot>
          <MenuTrigger asChild p={2}>
            <Button data-testid="user-menu" maxW="150px" truncate>
              <FaUserAstronaut fontSize="18" />
              <p>{user?.full_name || "User"}</p>
            </Button>
          </MenuTrigger>

          <MenuContent>
            <Link to="settings">
              <MenuItem
                closeOnSelect
                value="user-settings"
                gap={2}
                style={{ cursor: "pointer" }}
              >
                <FiUser fontSize="18px" />
                <div flex="1">My Profile</div>
              </MenuItem>
            </Link>

            <MenuItem
              value="logout"
              gap={2}
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <FiLogOut />
              Log Out
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </div>
    </>
  )
}

export default UserMenu
