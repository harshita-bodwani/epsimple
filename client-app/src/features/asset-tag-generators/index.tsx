import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { assetTagCodeGeneratorColumns } from './components/asset-tag-generator-columns'
import { AssetTagCodeGeneratorDeleteDialog } from './components/asset-tag-generator-delete-dialog'
import { AssetTagCodeGeneratorDrawer } from './components/asset-tag-generator-drawer'
import { AssetTagCodeGeneratorTable } from './components/asset-tag-generator-table'
import { CreateAssetTagCodeGeneratorButton } from './components/create-asset-tag-generator-button'
import { AssetTagCodeGeneratorProvider } from './context/asset-tag-generator-provider'

function AssetTagCodeGeneratorsContent() {
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
              Asset Tag Generators
            </h2>
            <p className='text-muted-foreground'>
              Manage automatic asset tag generation rules
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <CreateAssetTagCodeGeneratorButton />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
          <AssetTagCodeGeneratorTable columns={assetTagCodeGeneratorColumns} />
        </div>
      </Main>
      <AssetTagCodeGeneratorDrawer />
      <AssetTagCodeGeneratorDeleteDialog />
    </>
  )
}

export default function AssetTagCodeGeneratorsPage() {
  return (
    <AssetTagCodeGeneratorProvider>
      <AssetTagCodeGeneratorsContent />
    </AssetTagCodeGeneratorProvider>
  )
}
