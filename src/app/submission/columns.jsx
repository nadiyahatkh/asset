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
    accessorKey: 'namaaset',
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
    accessorKey: 'kategori',
    header: 'Kategori'
  },
  {
    accessorKey: 'tanggalpengajuan',
    header: 'Tanggal Pengajuan'
  },
  {
    accessorKey: 'tanggalmasahabis',
    header: 'Tanggal Masa Habis',
    // cell: ({ row }) => {
    //   const date = new Date(row.getValue('tanggalmasahabis'));
    //   const formatted = date.toLocaleDateString();
    //   return <div className='font-medium'>{formatted}</div>;
    // }
  },
  {
    accessorKey: 'pengaju',
    header: 'Pengaju'
  },
  {
    accessorKey: 'tipe',
    header: 'Tipe'
  },
  {
    accessorKey: 'Aksi',
    id: 'aksi',
    cell: ({ row }) => {
      const user = row.original;

      return (
            <Button variant='ghost' className='h-8 w-8 p-0' style={{ color: "#F9B421" }}>
                <Link href="./submission/applicationDetails">
                    Detail
                </Link>
            </Button>
      );
    }
  }
];
