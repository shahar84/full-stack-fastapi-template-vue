import { h } from "vue"
import type { ColumnDef } from "@tanstack/vue-table"
import type { ItemPublic } from "@/client"
import ItemActionsMenu from "./ItemActionsMenu.vue"

export const columns: ColumnDef<ItemPublic>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string
      return h("span", { class: "font-mono text-xs" }, id.slice(0, 8) + "...")
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string | null
      return h("span", { class: "text-muted-foreground" }, desc || "N/A")
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return h(ItemActionsMenu, { item: row.original })
    },
  },
]
