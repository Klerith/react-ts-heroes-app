"use client"

import { useState, useMemo } from "react"
import type { PaginationInfo } from "@/types/hero"

export function usePagination<T>(items: T[], itemsPerPage = 6) {
  const [currentPage, setCurrentPage] = useState(1)

  const paginationInfo: PaginationInfo = useMemo(
    () => ({
      currentPage,
      itemsPerPage,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / itemsPerPage),
    }),
    [items.length, itemsPerPage, currentPage],
  )

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, paginationInfo.totalPages)))
  }

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  const goToPreviousPage = () => {
    goToPage(currentPage - 1)
  }

  const resetPagination = () => {
    setCurrentPage(1)
  }

  return {
    paginatedItems,
    paginationInfo,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    resetPagination,
  }
}
