import { useState } from 'react'
import type { VendorType } from '../api/schema'
import {
  VendorTypesContext,
  type VendorTypesContextType,
} from './vendor-types-context'

export function VendorTypesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedVendorType, setSelectedVendorType] =
    useState<VendorType | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false)

  const openBulkUploadDialog = () => setIsBulkUploadDialogOpen(true)
  const closeBulkUploadDialog = () => setIsBulkUploadDialogOpen(false)

  const value: VendorTypesContextType = {
    selectedVendorType,
    setSelectedVendorType,
    isDrawerOpen,
    setIsDrawerOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isBulkUploadDialogOpen,
    setIsBulkUploadDialogOpen,
    openBulkUploadDialog,
    closeBulkUploadDialog,
  }

  return (
    <VendorTypesContext.Provider value={value}>
      {children}
    </VendorTypesContext.Provider>
  )
}
