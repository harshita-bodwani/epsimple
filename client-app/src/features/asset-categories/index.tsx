import { useQueryClient } from '@tanstack/react-query'
import { GenericBulkUploadDialog } from '@/components/bulk-upload/GenericBulkUploadDialog'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { assetCategoryColumns } from './components/asset-category-columns'
import { AssetCategoryDeleteDialog } from './components/asset-category-delete-dialog'
import { AssetCategoryDrawer } from './components/asset-category-drawer'
import { AssetCategoryPrimaryButtons } from './components/asset-category-primary-buttons'
import { AssetCategoryTable } from './components/asset-category-table'
import { CreateAssetCategoryButton } from './components/create-asset-category-button'
import {
  AssetCategoryProvider,
  useAssetCategoryContext,
} from './context/asset-category-provider'

function AssetCategoriesContent() {
  const { isBulkUploadDialogOpen, setIsBulkUploadDialogOpen } =
    useAssetCategoryContext()
  const queryClient = useQueryClient()

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
              Asset Categories
            </h2>
            <p className='text-muted-foreground'>
              Manage asset categories and their classifications
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <AssetCategoryPrimaryButtons />
            <CreateAssetCategoryButton />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
          <AssetCategoryTable columns={assetCategoryColumns} />
        </div>
      </Main>
      <AssetCategoryDrawer />
      <AssetCategoryDeleteDialog />
      <GenericBulkUploadDialog
        open={isBulkUploadDialogOpen}
        onOpenChange={setIsBulkUploadDialogOpen}
        config={{
          uploadEndpoint: '/api/asset-categories/bulk-upload',
          errorReportEndpoint: '/api/asset-categories/bulk-upload/errors',
          entityName: 'Asset Category',
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['asset-categories'] })
          },
        }}
      />
    </>
  )
}

export default function AssetCategoriesPage() {
  return (
    <AssetCategoryProvider>
      <AssetCategoriesContent />
    </AssetCategoryProvider>
  )
}
