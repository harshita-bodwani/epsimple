import { useContext } from 'react'
import {
  VendorCategoriesContext,
  type VendorCategoriesContextType,
} from '../context/vendor-categories-context'

export function useVendorCategories(): VendorCategoriesContextType {
  const context = useContext(VendorCategoriesContext)
  if (context === undefined) {
    throw new Error(
      'useVendorCategories must be used within VendorCategoriesProvider'
    )
  }
  return context
}
