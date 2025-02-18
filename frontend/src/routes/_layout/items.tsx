import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { ItemsService } from "@/client"
import { ItemActionsMenu } from "@/components/Common/ItemActionsMenu"
import AddItem from "@/components/Items/AddItem"
import PendingItems from "@/components/Pending/PendingItems"
import { EmptyState } from "@/components/ui/empty-state"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import { Table } from "@/components/ui/table"

const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 5

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ItemsService.readItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["items", { page }],
  }
}

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

function ItemsTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getItemsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      search: () => ({ page }),
    })

  const items = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

  if (isLoading) {
    return <PendingItems />
  }

  if (items.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch className="h-6 w-6" />
          </EmptyState.Indicator>
          <div className="flex flex-col space-y-4">
            <EmptyState.Title>You don't have any items yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new item to get started
            </EmptyState.Description>
          </div>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="30%">ID</Table.ColumnHeader>
            <Table.ColumnHeader w="30%">Title</Table.ColumnHeader>
            <Table.ColumnHeader w="30%">Description</Table.ColumnHeader>
            <Table.ColumnHeader w="10%">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items?.map((item) => (
            <Table.Row key={item.id} opacity={isPlaceholderData ? 0.5 : 1}>
              <Table.Cell truncate maxW="30%">
                {item.id}
              </Table.Cell>
              <Table.Cell truncate maxW="30%">
                {item.title}
              </Table.Cell>
              <Table.Cell
                truncate
                maxW="30%"
                className={
                  !item.description ? "text-muted-foreground" : undefined
                }
              >
                {item.description || "N/A"}
              </Table.Cell>
              <Table.Cell maxW="10%">
                <ItemActionsMenu item={item} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="flex justify-center mt-4">
        <PaginationRoot
          count={count}
          pageSize={PER_PAGE}
          onPageChange={({ page }) => setPage(page)}
        >
          <div className="flex items-center gap-2">
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </div>
        </PaginationRoot>
      </div>
    </>
  )
}

function Items() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Items Management</h1>
      <AddItem />
      <ItemsTable />
    </div>
  )
}
