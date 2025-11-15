import { createContext } from 'react'
import type { VendorCategory } from '../api/schema'

export interface VendorCategoriesContextType {
  selectedVendorCategory: VendorCategory | null
  setSelectedVendorCategory: (vendorCategory: VendorCategory | null) => void
  isDrawerOpen: boolean
  setIsDrawerOpen: (isOpen: boolean) => void
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (isOpen: boolean) => void
  isBulkUploadDialogOpen: boolean
  openBulkUploadDialog: () => void
  closeBulkUploadDialog: () => void
}

export const VendorCategoriesContext = createContext<
  VendorCategoriesContextType | undefined
>(undefined)
