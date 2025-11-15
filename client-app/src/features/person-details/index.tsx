import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { PersonDetailsDialogs } from './components/person-details-dialogs'
import { PersonDetailsDrawer } from './components/person-details-drawer'
import { PersonDetailsPrimaryButtons } from './components/person-details-primary-buttons'
import { PersonDetailsTable } from './components/person-details-table'
import { PersonDetailsProvider } from './context/person-details-provider'

function PersonDetailsContent() {
  return (
    <>
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
              Person Details
            </h2>
            <p className='text-muted-foreground'>
              Manage all person details and their information
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <PersonDetailsPrimaryButtons />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
          <PersonDetailsTable />
        </div>
      </Main>
      <PersonDetailsDrawer />
      <PersonDetailsDialogs />
    </>
  )
}

export default function PersonDetailsPage() {
  return (
    <PersonDetailsProvider>
      <PersonDetailsContent />
    </PersonDetailsProvider>
  )
}
