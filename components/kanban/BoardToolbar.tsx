"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, Undo2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { getAllTags } from "@/lib/kanban-utils"
import type { Column } from "@/lib/types"

interface BoardToolbarProps {
  columns: Column[]
  searchQuery: string
  filterTags: string[]
  sortBy: "priority" | "date" | "none"
  onSearch: (query: string) => void
  onFilterTags: (tags: string[]) => void
  onSort: (sortBy: "priority" | "date" | "none") => void
  onUndoDelete?: () => void
}

export function BoardToolbar({
  columns,
  searchQuery,
  filterTags,
  sortBy,
  onSearch,
  onFilterTags,
  onSort,
  onUndoDelete,
}: BoardToolbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const allTags = getAllTags(columns)

  const toggleTag = (tag: string) => {
    if (filterTags.includes(tag)) {
      onFilterTags(filterTags.filter((t) => t !== tag))
    } else {
      onFilterTags([...filterTags, tag])
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 pb-4 border-b border-border mb-4">
      <div className="flex items-center gap-2 flex-1">
        {isSearchOpen ? (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9 pr-9"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSearch("")
                  setIsSearchOpen(false)
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)} className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        )}

        {filterTags.length > 0 && (
          <div className="flex items-center gap-1">
            {filterTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button onClick={() => toggleTag(tag)} className="hover:bg-muted-foreground/20 rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onUndoDelete && (
          <Button variant="outline" size="sm" onClick={onUndoDelete} className="gap-2 bg-transparent">
            <Undo2 className="h-4 w-4" />
            Undo
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
              {filterTags.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {filterTags.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-sm font-semibold">Filter by tags</div>
            <DropdownMenuSeparator />
            {allTags.length === 0 ? (
              <div className="px-2 py-2 text-sm text-muted-foreground">No tags available</div>
            ) : (
              allTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={filterTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSort("none")} className={sortBy === "none" ? "bg-accent" : ""}>
              Default
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("priority")} className={sortBy === "priority" ? "bg-accent" : ""}>
              Priority
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("date")} className={sortBy === "date" ? "bg-accent" : ""}>
              Date Created
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
