import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  MessageSquare,
  Trash2,
  Edit,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { activityWorkRemarksApi } from '../api/activity-work-remarks-api'
import {
  activityWorkRemarksSchema,
  type ActivityWorkRemarkRequest,
} from '../api/schema'

interface ActivityWorkRemarksDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activityWorkId: number
  activityWorkName: string
}

export function ActivityWorkRemarksDialog({
  open,
  onOpenChange,
  activityWorkId,
  activityWorkName,
}: ActivityWorkRemarksDialogProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(0)
  const pageSize = 5

  const { data: count } = activityWorkRemarksApi.useGetCount(activityWorkId)
  const { data: remarksPage, isLoading } =
    activityWorkRemarksApi.useGetByActivityWorkId(activityWorkId, {
      page,
      size: pageSize,
      sortBy: 'commentedOn',
      sortOrder: 'DESC',
    })
  const createMutation = activityWorkRemarksApi.useCreate()
  const updateMutation = activityWorkRemarksApi.useUpdate()
  const deleteMutation = activityWorkRemarksApi.useDelete()

  const form = useForm<ActivityWorkRemarkRequest>({
    resolver: zodResolver(activityWorkRemarksSchema),
    defaultValues: {
      activityWorkId,
      comment: '',
    },
  })

  const onSubmit = (data: ActivityWorkRemarkRequest) => {
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data },
        {
          onSuccess: () => {
            form.reset({ activityWorkId, comment: '' })
            setEditingId(null)
          },
        }
      )
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          form.reset({ activityWorkId, comment: '' })
          setPage(0) // Reset to first page when adding new remark
        },
      })
    }
  }

  const handleEdit = (remarkId: number, comment: string) => {
    setEditingId(remarkId)
    form.setValue('comment', comment)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    form.reset({ activityWorkId, comment: '' })
  }

  const handleDelete = (remarkId: number) => {
    if (confirm('Are you sure you want to delete this remark?')) {
      deleteMutation.mutate({ id: remarkId, activityWorkId })
    }
  }

  const totalPages = remarksPage?.totalPages || 0
  const currentRemarks = remarksPage?.content || []
  const totalElements = remarksPage?.totalElements || 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex h-[85vh] flex-col sm:max-w-2xl'>
        <DialogHeader className='flex-shrink-0'>
          <DialogTitle className='flex items-center gap-2'>
            <MessageSquare className='h-5 w-5' />
            Remarks - {activityWorkName}
          </DialogTitle>
          <DialogDescription>
            View and manage remarks for this activity work order
            {count !== undefined && count > 0 && (
              <Badge variant='secondary' className='ml-2'>
                {count} {count === 1 ? 'remark' : 'remarks'}
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className='flex min-h-0 flex-1 flex-col gap-4'>
          {/* Add/Edit Remark Form - Sticky at top */}
          <div className='flex-shrink-0'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='comment'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {editingId ? 'Edit Remark' : 'Add New Remark'}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter your remark here...'
                          className='min-h-[80px] resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex gap-2'>
                  <Button
                    type='submit'
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                    className='flex-1'
                  >
                    <Send className='mr-2 h-4 w-4' />
                    {editingId ? 'Update' : 'Add'} Remark
                  </Button>
                  {editingId && (
                    <Button
                      type='button'
                      variant='outline'
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>
            <Separator className='mt-4' />
          </div>

          {/* Remarks List with Pagination */}
          <div className='flex min-h-0 flex-1 flex-col'>
            <div className='mb-2 flex flex-shrink-0 items-center justify-between'>
              <h4 className='text-sm font-medium'>Previous Remarks</h4>
              {totalElements > 0 && (
                <span className='text-muted-foreground text-xs'>
                  Showing {page * pageSize + 1}-
                  {Math.min((page + 1) * pageSize, totalElements)} of{' '}
                  {totalElements}
                </span>
              )}
            </div>

            <div className='min-h-0 flex-1 overflow-hidden rounded-md border'>
              <ScrollArea className='h-full p-4'>
                {isLoading ? (
                  <div className='text-muted-foreground py-8 text-center'>
                    Loading remarks...
                  </div>
                ) : !currentRemarks || currentRemarks.length === 0 ? (
                  <div className='text-muted-foreground py-8 text-center'>
                    No remarks yet. Be the first to add one!
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {currentRemarks.map((remark) => (
                      <div
                        key={remark.id}
                        className='bg-card space-y-2 rounded-lg border p-4'
                      >
                        <div className='flex items-start justify-between gap-2'>
                          <div className='flex-1'>
                            <p className='text-sm break-words whitespace-pre-wrap'>
                              {remark.comment}
                            </p>
                          </div>
                          <div className='flex flex-shrink-0 gap-1'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8'
                              onClick={() =>
                                handleEdit(remark.id, remark.comment)
                              }
                            >
                              <Edit className='h-4 w-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='text-destructive h-8 w-8'
                              onClick={() => handleDelete(remark.id)}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                        <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                          <span>
                            {formatDistanceToNow(new Date(remark.commentedOn), {
                              addSuffix: true,
                            })}
                          </span>
                          {remark.commentedByName && (
                            <>
                              <span>•</span>
                              <span>by {remark.commentedByName}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className='flex flex-shrink-0 items-center justify-between pt-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className='mr-1 h-4 w-4' />
                  Previous
                </Button>
                <span className='text-muted-foreground text-sm'>
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page >= totalPages - 1}
                >
                  Next
                  <ChevronRight className='ml-1 h-4 w-4' />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
