import { useContext } from 'react'
import { SiteContext, type SiteContextType } from '../context/site-context'

export function useSite(): SiteContextType {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error('useSite must be used within SiteProvider')
  }
  return context
}
