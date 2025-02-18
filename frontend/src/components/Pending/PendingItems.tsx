import type React from "react"
import { Skeleton } from "../ui/skeleton"

// Temporary Table component mock with TypeScript types
const Table = {
  Root: ({ children }: { children: React.ReactNode }) => (
    <div className="table w-full">{children}</div>
  ),
  Header: ({ children }: { children: React.ReactNode }) => (
    <div className="table-header-group">{children}</div>
  ),
  Body: ({ children }: { children: React.ReactNode }) => (
    <div className="table-row-group">{children}</div>
  ),
  Row: ({
    children,
    key,
  }: { children: React.ReactNode; key?: number | string }) => (
    <div className="table-row" key={key}>
      {children}
    </div>
  ),
  ColumnHeader: ({
    children,
    className,
  }: { children: React.ReactNode; className?: string }) => (
    <div className={`table-cell font-bold ${className || ""}`}>{children}</div>
  ),
  Cell: ({ children }: { children: React.ReactNode }) => (
    <div className="table-cell">{children}</div>
  ),
}

const PendingItems: React.FC = () => (
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader className="w-[30%]">ID</Table.ColumnHeader>
        <Table.ColumnHeader className="w-[30%]">Title</Table.ColumnHeader>
        <Table.ColumnHeader className="w-[30%]">Description</Table.ColumnHeader>
        <Table.ColumnHeader className="w-[10%]">Actions</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {[...Array(5)].map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <Skeleton className="h-[20px]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-[20px]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-[20px]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-[20px]" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
)

export default PendingItems
