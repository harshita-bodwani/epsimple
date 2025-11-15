import type { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import type { Asset } from '../api/schema'
import { AssetRowActions } from './asset-row-actions'

export const assetColumns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'assetTagId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Asset Tag' />
    ),
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30'>
          {row.getValue('assetTagId')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'assetName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Asset Name' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate font-medium'>
        {row.getValue('assetName')}
      </div>
    ),
  },
  {
    accessorKey: 'assetCategoryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30'>
          {row.original.assetCategoryName}
        </span>
        <span className='text-muted-foreground mt-1 text-xs'>
          {row.original.assetCategoryCode}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'assetTypeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-700/10 ring-inset dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/30'>
          {row.original.assetTypeName}
        </span>
        <span className='text-muted-foreground mt-1 text-xs'>
          {row.original.assetTypeCode}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'vendorName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vendor' />
    ),
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.original.vendorName}</span>
        <span className='text-muted-foreground text-xs'>
          {row.original.vendorCode}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Serial Number' />
    ),
    cell: ({ row }) => {
      const serial = row.getValue('serialNumber') as string | undefined
      return serial ? (
        <div className='flex space-x-2'>
          <span className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-700/10 ring-inset dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/30'>
            {serial}
          </span>
        </div>
      ) : (
        <span className='text-muted-foreground'>-</span>
      )
    },
  },
  {
    accessorKey: 'statusTypeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-700/10 ring-inset dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30'>
          {row.getValue('statusTypeName')}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <AssetRowActions row={row} />,
  },
]
