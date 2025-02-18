"use client"

import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"

export interface PaginationNavProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function PaginationNav({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationNavProps) {
  const pages = React.useMemo(() => {
    const items: (number | "ellipsis")[] = []

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      // Always show first and last page
      items.push(1)

      if (currentPage <= 3) {
        // Show 2,3,4, ellipsis when near start
        for (let i = 2; i <= 4; i++) {
          items.push(i)
        }
        items.push("ellipsis")
      } else if (currentPage >= totalPages - 2) {
        // Show ellipsis, last 3 pages when near end
        items.push("ellipsis")
        for (let i = totalPages - 3; i < totalPages; i++) {
          items.push(i)
        }
      } else {
        // Show ellipsis, current+-1, ellipsis
        items.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i)
        }
        items.push("ellipsis")
      }

      items.push(totalPages)
    }

    return items
  }, [currentPage, totalPages])

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        </PaginationItem>

        {pages.map((page, i) => (
          <PaginationItem key={`${page}-${i}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
