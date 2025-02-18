import { cn } from "@/lib/utils"
import * as React from "react"

const TableRoot = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
TableRoot.displayName = "Table.Root"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "Table.Header"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "Table.Body"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    opacity?: number
  }
>(({ className, opacity = 1, style, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    )}
    style={{ ...style, opacity }}
    {...props}
  />
))
TableRow.displayName = "Table.Row"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    truncate?: boolean
    maxW?: string
  }
>(({ className, truncate, maxW, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4",
      truncate && "truncate",
      maxW && `max-w-[${maxW}]`,
      className,
    )}
    {...props}
  />
))
TableCell.displayName = "Table.Cell"

const TableColumnHeader = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    w?: string
  }
>(({ className, w, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      w && `w-[${w}]`,
      className,
    )}
    {...props}
  />
))
TableColumnHeader.displayName = "Table.ColumnHeader"

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  ColumnHeader: TableColumnHeader,
}
