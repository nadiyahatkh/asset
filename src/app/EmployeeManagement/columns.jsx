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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nama Karyawan
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'employee.nip',
    header: 'NIP'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'employee.department.name',
    header: 'Departemen',
    // cell: ({ row }) => {
    //   const date = new Date(row.getValue('tanggalmasahabis'));
    //   const formatted = date.toLocaleDateString();
    //   return <div className='font-medium'>{formatted}</div>;
    // }
  },
  {
    accessorKey: 'employee.position.name',
    header: 'Posisi'
  },
  {
    accessorKey: 'Aksi',
    id: 'aksi',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-4 w-4 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <PencilLine className='h-4 w-4 mr-2'/> Ubah
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
