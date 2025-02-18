import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UsersService } from "client/sdk.gen"
import type { Message } from "client/types.gen"
import { Button } from "components/ui/button"
import { useToast } from "hooks/use-toast"
import type React from "react"

interface DeleteUserProps {
  userId: string
}

const DeleteUser: React.FC<DeleteUserProps> = ({ userId }) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: () => UsersService.deleteUser({ userId }),
    onSuccess: (data: Message) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast({
        title: data.message || "User deleted successfully",
        variant: "default",
      })
    },
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={mutation.isPending}
    >
      Delete User
    </Button>
  )
}

export default DeleteUser
