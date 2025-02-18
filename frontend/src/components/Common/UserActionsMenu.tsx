import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs"

import type { UserPublic } from "@/client"
import DeleteUser from "../Admin/DeleteUser"
import EditUser from "../Admin/EditUser"

interface UserActionsMenuProps {
  user: UserPublic
  disabled?: boolean
}

export const UserActionsMenu = ({ user, disabled }: UserActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <BsThreeDotsVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        <div className="flex flex-col">
          <EditUser user={user} />
          <DeleteUser id={user.id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
