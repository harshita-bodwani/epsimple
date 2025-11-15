import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CreateSiteCodeGeneratorButton } from './components/create-site-code-generator-button'
import { siteCodeGeneratorColumns } from './components/site-code-generator-columns'
import { SiteCodeGeneratorDeleteDialog } from './components/site-code-generator-delete-dialog'
import { SiteCodeGeneratorDrawer } from './components/site-code-generator-drawer'
import { SiteCodeGeneratorTable } from './components/site-code-generator-table'
import { SiteCodeGeneratorProvider } from './context/site-code-generator-provider'

function SiteCodeGeneratorsContent() {
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
              Site Code Generators
            </h2>
            <p className='text-muted-foreground'>
              Manage automatic site code generation rules
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <CreateSiteCodeGeneratorButton />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
          <SiteCodeGeneratorTable columns={siteCodeGeneratorColumns} />
        </div>
      </Main>
      <SiteCodeGeneratorDrawer />
      <SiteCodeGeneratorDeleteDialog />
    </>
  )
}

export default function SiteCodeGeneratorsPage() {
  return (
    <SiteCodeGeneratorProvider>
      <SiteCodeGeneratorsContent />
    </SiteCodeGeneratorProvider>
  )
}
