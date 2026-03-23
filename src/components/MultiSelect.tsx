import React, { useState, useMemo } from 'react'
import { ChevronsUpDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'

export interface MultiSelectOption {
  label: string
  value: string
  group?: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Selecione...',
  searchPlaceholder = 'Buscar...',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    if (!search) return options
    const s = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(s))
  }, [options, search])

  const handleToggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((item) => item !== val))
    } else {
      onChange([...selected, val])
    }
  }

  const handleRemove = (val: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selected.filter((item) => item !== val))
  }

  const grouped = filteredOptions.reduce(
    (acc, opt) => {
      const g = opt.group || 'Outros'
      if (!acc[g]) acc[g] = []
      acc[g].push(opt)
      return acc
    },
    {} as Record<string, typeof options>,
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10 px-3 py-2 text-left font-normal border-input"
        >
          <div className="flex flex-wrap gap-1.5 items-center flex-1 pr-2">
            {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
            {selected.map((val) => {
              const opt = options.find((o) => o.value === val)
              return (
                <Badge key={val} variant="secondary" className="px-1.5 py-0 font-normal">
                  {opt?.label || val}
                  <div
                    role="button"
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-muted"
                    onClick={(e) => handleRemove(val, e)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              )
            })}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 shadow-none"
          />
        </div>
        <ScrollArea className="max-h-[300px] overflow-y-auto">
          <div className="p-2">
            {Object.keys(grouped).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhum resultado.</p>
            )}
            {Object.entries(grouped).map(([group, opts]) => (
              <div key={group} className="mb-2 last:mb-0">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 rounded mb-1">
                  {group}
                </div>
                {opts.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-2 px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer group"
                    onClick={() => handleToggle(opt.value)}
                  >
                    <Checkbox
                      checked={selected.includes(opt.value)}
                      onCheckedChange={() => handleToggle(opt.value)}
                      id={`cb-${opt.value}`}
                      className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={`cb-${opt.value}`}
                      className="text-sm cursor-pointer flex-1 group-hover:font-medium transition-all"
                    >
                      {opt.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
