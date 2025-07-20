import React from 'react'
import { Editor } from '@tiptap/react'
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight,
  Bold, ChevronDown, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Italic, List, ListOrdered, Redo2, Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  TextQuote,
  Underline,
  Undo2,
} from 'lucide-react'
import { Separator } from '../ui/separator'
import { Toggle } from '../ui/toggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { LinkPopover } from './LinkPopover'

function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  // Select options as string values
  type HeadingValue = 'paragraph' | '1' | '2' | '3' | '4'
  const headingOptions: { label: string, value: HeadingValue, icon: React.ReactNode }[] = [
    { label: 'Heading 1', value: '1', icon: <Heading1Icon /> },
    { label: 'Heading 2', value: '2', icon: <Heading2Icon /> },
    { label: 'Heading 3', value: '3', icon: <Heading3Icon /> },
    { label: 'Heading 4', value: '4', icon: <Heading4Icon /> },
  ]

  // Determine the current heading level or 'paragraph'
  const activeHeading = headingOptions.find(option =>
    option.value === 'paragraph'
      ? editor.isActive('paragraph')
      : editor.isActive('heading', { level: parseInt(option.value) })
  )?.value ?? 'paragraph'

  const formattingOptions = [
    {
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isPressed: editor.isActive('bold')
    },
    {
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isPressed: editor.isActive('italic')
    },
    {
      icon: <Underline />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isPressed: editor.isActive('underline')
    },
    {
      icon: <Strikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isPressed: editor.isActive('strike')
    },
    {
      icon: <SuperscriptIcon />,
      onClick: () => editor.chain().focus().toggleSuperscript().run(),
      isPressed: editor.isActive('superscript')
    },
    {
      icon: <SubscriptIcon />,
      onClick: () => editor.chain().focus().toggleSubscript().run(),
      isPressed: editor.isActive('subscript')
    },
  ]

  const alignmentOptions = [
    {
      icon: <AlignLeft />,
      label: "Align Left",
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      isPressed: editor.isActive({ textAlign: 'left' })
    },
    {
      icon: <AlignCenter />,
      label: "Align Center",
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      isPressed: editor.isActive({ textAlign: 'center' })
    },
    {
      icon: <AlignRight />,
      label: "Align Right",
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      isPressed: editor.isActive({ textAlign: 'right' })
    },
    {
      icon: <AlignJustify />,
      label: "Align Justify",
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      isPressed: editor.isActive({ textAlign: 'justify' })
    }
  ]

  const listOptions: { label: string, value: HeadingValue, icon: React.ReactNode, onClick: () => void, isActive: boolean }[] = [
    { label: 'Bullet List', value: '1', icon: <List />, onClick: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), },
    { label: 'Ordered List', value: '2', icon: <ListOrdered />, onClick: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList'), },
  ]

  return (
    <div className="flex items-center p-1 h-12 border-b">

      {/* Undo / Redo */}
    <div className="flex items-center gap-1">
        <Toggle
            onClick={() => editor.chain().focus().undo().run()}
            pressed={false}
            disabled={!editor.can().chain().focus().undo().run()}
        >
            <Undo2 className="w-4 h-4" />
        </Toggle>
        <Toggle
            onClick={() => editor.chain().focus().redo().run()}
            pressed={false}
            disabled={!editor.can().chain().focus().redo().run()}
        >
            <Redo2 className="w-4 h-4" />
        </Toggle>
    </div>

      <Separator orientation="vertical" className="mx-2" />

        {/* Heading Select */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="ghost"
                className={activeHeading !== 'paragraph' ? "bg-accent" : ""}
                >
                {headingOptions.find(opt => opt.value === activeHeading)?.icon ?? <Heading1Icon />}
                <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {headingOptions.map((opt) => {
                const isActive =
                    opt.value === 'paragraph'
                    ? editor.isActive('paragraph')
                    : editor.isActive('heading', { level: parseInt(opt.value) })

                return (
                    <DropdownMenuItem
                    key={opt.value}
                    onClick={() => {
                        const chain = editor.chain().focus()
                        if (opt.value === 'paragraph') {
                        chain.setParagraph().run()
                        } else {
                        chain.toggleHeading({ level: parseInt(opt.value) as 1 | 2 | 3 | 4 | 5 | 6 }).run()
                        }
                    }}
                    className={isActive ? 'bg-muted font-medium' : ''}
                    >
                    <div className="flex items-center gap-2">
                        {opt.icon}
                        <span>{opt.label}</span>
                    </div>
                    </DropdownMenuItem>
                )
                })}
            </DropdownMenuContent>
        </DropdownMenu>

        {/* List Select */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={listOptions.some(opt => opt.isActive) ? "bg-accent" : ""} variant="ghost" >
                {listOptions.find(opt => opt.isActive)?.icon ?? <List />}
                <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {listOptions.map((opt) => (
                <DropdownMenuItem
                    key={opt.label}
                    onClick={opt.onClick}
                >
                    <div className="flex items-center gap-2">
                    {opt.icon}
                    <span>{opt.label}</span>
                    </div>
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        <Toggle
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            pressed={editor.isActive('blockquote')}
        >
            <TextQuote />
        </Toggle>
      <Separator orientation="vertical" className="mx-2" />

      {/* Formatting */}
      <div className="flex items-center gap-1">
        {formattingOptions.map((opt, i) => (
          <Toggle key={i} onClick={opt.onClick} pressed={opt.isPressed}>
            {opt.icon}
          </Toggle>
        ))}
        <LinkPopover editor={editor} />
      </div>

      <Separator orientation="vertical" className="mx-2" />

      {/* Alignment */}
      <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={listOptions.some(opt => opt.isActive) ? "bg-accent" : ""} variant="ghost" >
                {alignmentOptions.find(opt => opt.isPressed)?.icon ?? <AlignLeft />}
                <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {alignmentOptions.map((opt) => (
                <DropdownMenuItem
                    key={opt.label}
                    onClick={opt.onClick}
                >
                    <div className="flex items-center gap-2">
                    {opt.icon}
                    <span>{opt.label}</span>
                    </div>
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      {/* <div className="flex items-center gap-1">
        {alignmentOptions.map((opt, i) => (
          <Toggle key={i} onClick={opt.onClick} pressed={opt.isPressed}>
            {opt.icon}
          </Toggle>
        ))}
      </div> */}
    </div>
  )
}

export default EditorToolbar
