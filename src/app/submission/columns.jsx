'use client';

import { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal, ArrowUpDown, PencilLine, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: 'asset.asset_name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nama Aset
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'asset.category.name',
    header: 'Kategori'
  },
  {
    accessorKey: 'expiry_date',
    header: 'Tanggal Pengajuan',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'accepted_at',
    header: 'Tanggal Masa Habis',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'user.name',
    header: 'Pengaju'
  },
  {
    accessorKey: 'type',
    header: 'Tipe'
  },
  {
    accessorKey: 'Aksi',
    id: 'aksi',
    cell: ({ row }) => {
      const id = row.original.id;
  
      return (
        <Button variant='ghost' className='h-8 w-8 p-0' style={{ color: "#F9B421" }}>
          <Link href={`/submission/applicationDetails/${id}`}>
            Detail
          </Link>
        </Button>
      );
    }
  }
];
