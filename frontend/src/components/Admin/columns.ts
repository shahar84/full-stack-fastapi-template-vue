import type { ColumnDef } from "@tanstack/vue-table"
import { h } from "vue"
import type { UserPublic } from "@/client"
import { Badge } from "@/components/ui/badge"
import UserActionsMenu from "./UserActionsMenu.vue"

export interface UserTableData extends UserPublic {
  isCurrentUser: boolean
}

export const columns: ColumnDef<UserTableData>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => {
      const name = row.getValue("full_name") as string
      const isCurrentUser = row.original.isCurrentUser
      return h("div", { class: "flex items-center gap-2" }, [
        h("span", name || "N/A"),
        isCurrentUser
          ? h(Badge, { variant: "outline", class: "text-xs" }, () => "You")
          : null,
      ])
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "is_superuser",
    header: "Role",
    cell: ({ row }) => {
      const isSuperuser = row.getValue("is_superuser") as boolean
      return h(Badge, { variant: isSuperuser ? "default" : "secondary" }, () =>
        isSuperuser ? "Superuser" : "User",
      )
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean
      return h("div", { class: "flex items-center gap-2" }, [
        h("div", {
          class: `h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`,
        }),
        h("span", isActive ? "Active" : "Inactive"),
      ])
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return h(UserActionsMenu, {
        user: row.original,
        isCurrentUser: row.original.isCurrentUser,
      })
    },
  },
]
