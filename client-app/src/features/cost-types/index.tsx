import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CostTypeDeleteDialog } from './components/cost-type-delete-dialog'
import { CostTypeDrawer } from './components/cost-type-drawer'
import { costTypesColumns } from './components/cost-types-columns'
import { CostTypesDialogs } from './components/cost-types-dialogs'
import { CostTypesPrimaryButtons } from './components/cost-types-primary-buttons'
import { CostTypesTable } from './components/cost-types-table'
import { CostTypesProvider } from './context/cost-types-provider'

export default function CostTypes() {
  return (
    <CostTypesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Cost Types</h2>
            <p className='text-muted-foreground'>
              Manage cost type classifications under categories
            </p>
          </div>
          <CostTypesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <CostTypesTable columns={costTypesColumns} />
        </div>
      </Main>
      <CostTypeDrawer />
      <CostTypeDeleteDialog />
      <CostTypesDialogs />
    </CostTypesProvider>
  )
}
