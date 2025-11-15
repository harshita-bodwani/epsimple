import { useContext } from 'react'
import { WarehouseContext, type WarehouseContextType } from '../context/warehouse-context'

export function useWarehouse(): WarehouseContextType {
  const context = useContext(WarehouseContext)
  if (!context) {
    throw new Error('useWarehouse must be used within WarehouseProvider')
  }
  return context
}
