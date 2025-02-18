import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { z } from "zod"

import { type UserPublic, UsersService } from "@/client"
import AddUser from "@/components/Admin/AddUser"
import { UserActionsMenu } from "@/components/Common/UserActionsMenu"
import PendingUsers from "@/components/Pending/PendingUsers"
import { Badge } from "@/components/ui/badge"
import { PaginationNav } from "@/components/ui/pagination-nav"
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const usersSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 5

function getUsersQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      UsersService.readUsers({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["users", { page }],
  }
}

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
  validateSearch: (search) => usersSearchSchema.parse(search),
})

function UsersTable() {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getUsersQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (newPage: number) =>
    navigate({
      search: { page: newPage },
    })

  const users = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / PER_PAGE)

  if (isLoading) {
    return <PendingUsers />
  }

  return (
    <div className="space-y-4">
      <Table.Root>
        <TableHeader>
          <TableRow>
            <TableColumnHeader w="20%">Full name</TableColumnHeader>
            <TableColumnHeader w="25%">Email</TableColumnHeader>
            <TableColumnHeader w="15%">Role</TableColumnHeader>
            <TableColumnHeader w="20%">Status</TableColumnHeader>
            <TableColumnHeader w="20%">Actions</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id} opacity={isPlaceholderData ? 0.5 : 1}>
              <TableCell truncate maxW="20%">
                {user.full_name || "N/A"}
                {currentUser?.id === user.id && (
                  <Badge variant="secondary" className="ml-2">
                    You
                  </Badge>
                )}
              </TableCell>
              <TableCell truncate maxW="25%">
                {user.email}
              </TableCell>
              <TableCell truncate maxW="15%">
                {user.is_superuser ? "Superuser" : "User"}
              </TableCell>
              <TableCell truncate maxW="20%">
                {user.is_active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell maxW="20%">
                <UserActionsMenu
                  user={user}
                  disabled={currentUser?.id === user.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <PaginationNav
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}

function Admin() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      <AddUser />
      <UsersTable />
    </div>
  )
}
