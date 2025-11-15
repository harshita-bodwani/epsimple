import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { vendorColumns } from './components/vendor-columns'
import { VendorDialogs } from './components/vendor-dialogs'
import { VendorDrawer } from './components/vendor-drawer'
import { VendorPrimaryButtons } from './components/vendor-primary-buttons'
import { VendorsTable } from './components/vendors-table'
import { VendorProvider } from './context/vendor-provider'

export default function VendorsPage() {
  return (
    <VendorProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main fixed>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Vendors</h2>
            <p className='text-muted-foreground'>
              Manage vendor information and relationships
            </p>
          </div>
          <VendorPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <VendorsTable columns={vendorColumns} />
        </div>
      </Main>
      <VendorDrawer />
      <VendorDialogs />
    </VendorProvider>
  )
}
