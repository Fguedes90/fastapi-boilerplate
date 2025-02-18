import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

export interface PaginationRootProps {
  count: number
  pageSize: number
  onPageChange: (params: { page: number }) => void
  className?: string
  children: React.ReactNode
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  siblingCount?: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

export const PaginationRoot: React.FC<PaginationRootProps> = ({
  count,
  pageSize,
  onPageChange,
  children,
  className,
}) => {
  const totalPages = Math.ceil(count / pageSize)
  const currentPage = Math.min(Math.ceil(count / pageSize), totalPages)

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {React.Children.map(children, (child) =>
        child
          ? React.cloneElement(child as React.ReactElement, {
              currentPage,
              totalPages,
              onPageChange: (page: number) => onPageChange({ page }),
            })
          : null,
      )}
    </div>
  )
}

export const PaginationItems: React.FC<
  Partial<PaginationProps> & { className?: string }
> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className,
  siblingCount = 1,
}) => {
  const generatePaginationItems = () => {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, "dots", totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [firstPageIndex, "dots", ...rightRange]
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex)
    return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex]
  }

  const paginationItems = generatePaginationItems()

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {paginationItems.map((item, index) => {
        if (item === "dots") {
          return (
            <div key={`dots-${index}`} className="flex items-center">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          )
        }

        return (
          <Button
            key={item}
            variant={currentPage === item ? "default" : "outline"}
            onClick={() => onPageChange?.(item as number)}
          >
            {item}
          </Button>
        )
      })}
    </div>
  )
}

export const PaginationPrevTrigger: React.FC<
  Partial<PaginationProps> & { className?: string }
> = ({ currentPage = 1, onPageChange, className }) => {
  return (
    <Button
      className={className}
      onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

export const PaginationNextTrigger: React.FC<
  Partial<PaginationProps> & { className?: string }
> = ({ currentPage = 1, totalPages = 1, onPageChange, className }) => {
  return (
    <Button
      className={className}
      onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
}
