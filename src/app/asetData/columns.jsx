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
        accessorKey: 'kodeaset',
        header: 'Kode Aset'
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
    accessorKey: 'kondisi',
    header: 'Kondisi'
  },
  {
    accessorKey: 'harga',
    header: 'Harga'
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal'
  },
  {
    accessorKey: 'expired',
    header: 'Expired',
    // cell: ({ row }) => {
    //   const date = new Date(row.getValue('lastSeen'));
    //   const formatted = date.toLocaleDateString();
    //   return <div className='font-medium'>{formatted}</div>;
    // }
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'document',
    header: 'Document',
    cell: ({ row }) => {
      const user = row.original;

      return (
            <Button variant='ghost' className='h-4 w-4 p-0' style={{ color: "#F9B421" }}>
                <Link href="/">
                    Lihat
                </Link>
            </Button>
      );
    }
  },
  {
    accessorKey: 'Aksi',
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            <Link href="./asetData/updateAset" className="flex items-center p-1 rounded-md hover:bg-gray-100">
                        <PencilLine className="mr-2 h-4 w-4" />
                        Ubah
              </Link>
              {/* <Link href="./asetData/updateAset">
              <p><PencilLine className='h-4 w-4 mr-2'/> Ubah</p>
              </Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Trash2 className='h-4 w-4 mr-2' /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
