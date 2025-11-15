import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { LandlordDialogs } from './components/landlord-dialogs'
import { LandlordPrimaryButtons } from './components/landlord-primary-buttons'
import { landlordColumns } from './landlord-columns'
import { LandlordDrawer } from './landlord-drawer'
import { LandlordProvider } from './landlord-provider'
import { LandlordsTable } from './landlords-table'

export default function LandlordsPage() {
  return (
    <LandlordProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Landlords</h2>
            <p className='text-muted-foreground'>
              Manage landlord information and rent share percentages
            </p>
          </div>
          <LandlordPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <LandlordsTable columns={landlordColumns} />
        </div>
      </Main>
      <LandlordDrawer />
      <LandlordDialogs />
    </LandlordProvider>
  )
}
