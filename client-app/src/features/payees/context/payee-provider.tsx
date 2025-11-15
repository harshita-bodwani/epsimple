import { useState, type ReactNode } from 'react'
import type { Payee } from '../api/schema'
import { PayeeContext, type PayeeContextType } from './payee-context'

export function PayeeProvider({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedPayee, setSelectedPayee] = useState<Payee | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedPayee(null)
  }

  const openDeleteDialog = () => setIsDeleteDialogOpen(true)
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedPayee(null)
  }

  const value: PayeeContextType = {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    selectedPayee,
    setSelectedPayee,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    isBulkUploadDialogOpen,
    setIsBulkUploadDialogOpen,
    globalFilter,
    setGlobalFilter,
  }

  return <PayeeContext.Provider value={value}>{children}</PayeeContext.Provider>
}
