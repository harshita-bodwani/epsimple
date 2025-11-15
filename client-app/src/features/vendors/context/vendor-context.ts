import { createContext } from 'react'
import type { Vendor } from '../api/vendors-api'

export interface VendorContextType {
  selectedVendor: Vendor | null
  setSelectedVendor: (vendor: Vendor | null) => void
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  drawerMode: 'create' | 'edit'
  setDrawerMode: (mode: 'create' | 'edit') => void
  openCreateDrawer: () => void
  openEditDrawer: (vendor: Vendor) => void
  closeDrawer: () => void
  isBulkUploadDialogOpen: boolean
  openBulkUploadDialog: () => void
  closeBulkUploadDialog: () => void
}

export const VendorContext = createContext<VendorContextType | undefined>(
  undefined
)
