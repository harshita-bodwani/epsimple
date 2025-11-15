import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { assetsOnSiteColumns } from './components/assets-on-site-columns'
import { AssetsOnSiteDeleteDialog } from './components/assets-on-site-delete-dialog'
import { AssetsOnSiteTable } from './components/assets-on-site-table'
import { CreateAssetsOnSiteButton } from './components/create-assets-on-site-button'
import { AssetsOnSiteProvider } from './context/assets-on-site-provider'

export default function AssetsOnSitePage() {
  return (
    <AssetsOnSiteProvider>
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
              Assets on Site
            </h2>
            <p className='text-muted-foreground'>
              Manage asset placements on sites
            </p>
          </div>
          <CreateAssetsOnSiteButton />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <AssetsOnSiteTable columns={assetsOnSiteColumns} />
        </div>
      </Main>
      <AssetsOnSiteDeleteDialog />
    </AssetsOnSiteProvider>
  )
}
