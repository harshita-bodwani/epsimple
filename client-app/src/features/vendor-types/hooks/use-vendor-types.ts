import { useContext } from 'react'
import {
  VendorTypesContext,
  type VendorTypesContextType,
} from '../context/vendor-types-context'

export function useVendorTypes(): VendorTypesContextType {
  const context = useContext(VendorTypesContext)
  if (context === undefined) {
    throw new Error('useVendorTypes must be used within VendorTypesProvider')
  }
  return context
}
