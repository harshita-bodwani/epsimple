import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { assetsOnDatacenterColumns } from './components/assets-on-datacenter-columns'
import { AssetsOnDatacenterDeleteDialog } from './components/assets-on-datacenter-delete-dialog'
import { AssetsOnDatacenterTable } from './components/assets-on-datacenter-table'
import { CreateAssetsOnDatacenterButton } from './components/create-assets-on-datacenter-button'
import { AssetsOnDatacenterProvider } from './context/assets-on-datacenter-provider'

export default function AssetsOnDatacenterPage() {
  return (
    <AssetsOnDatacenterProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>
              Assets on Datacenter
            </h2>
            <p className='text-muted-foreground'>
              Manage asset placements in Datacenters
            </p>
          </div>
          <CreateAssetsOnDatacenterButton />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <AssetsOnDatacenterTable columns={assetsOnDatacenterColumns} />
        </div>
      </Main>
      <AssetsOnDatacenterDeleteDialog />
    </AssetsOnDatacenterProvider>
  )
}
