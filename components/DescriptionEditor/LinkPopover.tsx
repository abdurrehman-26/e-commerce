'use client'

import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Editor } from '@tiptap/react'
import { Check, ExternalLink, Link as LinkIcon, Trash } from 'lucide-react'

export function LinkPopover({ editor }: { editor: Editor }) {
  const [open, setOpen] = React.useState(false)
  const [url, setUrl] = React.useState('')

  const isLinkActive = editor.isActive('link')

  const handleOpenChange = (val: boolean) => {
    setOpen(val)
    if (val) {
      const existingUrl = editor.getAttributes('link').href
      setUrl(existingUrl || '')
    }
  }

  const handleApply = () => {
    if (!url) return
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    setOpen(false)
  }

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run()
    setUrl('')
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
        <Button
          asChild
          size="icon"
          variant={isLinkActive ? 'secondary' : 'ghost'}
        >
      <PopoverTrigger>
          <LinkIcon className="w-4 h-4" />
      </PopoverTrigger>
        </Button>
      <PopoverContent className="w-100 h-15 flex items-center">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex justify-between gap-1">
        <Button size="icon" variant="ghost" className='p-1' onClick={handleApply} disabled={!url}>
            <Check color='green' />
        </Button>
          <Button size="icon" variant="ghost" className='p-1' onClick={handleRemove} disabled={!isLinkActive}>
            <Trash color='red' />
          </Button>
          <Button asChild={Boolean(url)} size="icon" variant="ghost" className='p-1' onClick={handleApply} disabled={!url}>
            {url ? <a href={url}>
            <ExternalLink />
            </a> : <ExternalLink />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
