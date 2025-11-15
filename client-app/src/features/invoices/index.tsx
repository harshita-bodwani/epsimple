import { useQueryClient } from '@tanstack/react-query'
import { GenericBulkUploadDialog } from '@/components/bulk-upload/GenericBulkUploadDialog'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { invoiceColumns } from './components/invoice-columns'
import { InvoiceDialogs } from './components/invoice-dialogs'
import { InvoicePrimaryButtons } from './components/invoice-primary-buttons'
import { InvoiceTable } from './components/invoice-table'
import { InvoiceProvider } from './context/invoice-provider'
import { useInvoice } from './hooks/use-invoice'

function InvoicesContent() {
  const { isBulkUploadDialogOpen, setIsBulkUploadDialogOpen } = useInvoice()
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
            <h2 className='text-2xl font-bold tracking-tight'>Invoices</h2>
            <p className='text-muted-foreground'>
              Manage invoice records and payments
            </p>
          </div>
          <InvoicePrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <InvoiceTable columns={invoiceColumns} />
        </div>
      </Main>
      <InvoiceDialogs />
      <GenericBulkUploadDialog
        open={isBulkUploadDialogOpen}
        onOpenChange={setIsBulkUploadDialogOpen}
        config={{
          uploadEndpoint: '/api/invoices/bulk-upload',
          errorReportEndpoint: '/api/invoices/bulk-upload/errors',
          entityName: 'Invoice',
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
          },
        }}
      />
    </>
  )
}

export default function Invoices() {
  return (
    <InvoiceProvider>
      <InvoicesContent />
    </InvoiceProvider>
  )
}
