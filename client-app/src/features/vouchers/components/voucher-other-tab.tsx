import type { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import type { VoucherFormData } from '../api/schema'

interface VoucherOtherTabProps {
  form: UseFormReturn<VoucherFormData>
}

export function VoucherOtherTab({ form }: VoucherOtherTabProps) {
  return (
    <div className='mt-4 space-y-4'>
      <FormField
        control={form.control}
        name='remarks'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Remarks</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Enter any additional remarks...'
                className='min-h-[120px]'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
