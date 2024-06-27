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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

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
    accessorKey: 'tipe',
    header: 'Tipe'
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'Aksi',
    id: 'aksi',
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
            <Link href="./user/update-submission" className="flex items-center p-1 rounded-md hover:bg-gray-100">
                        <PencilLine className="mr-2 h-4 w-4" />
                        Ubah
              </Link>
              {/* <Link href="./asetData/updateAset">
              <p><PencilLine className='h-4 w-4 mr-2'/> Ubah</p>
              </Link> */}
            </DropdownMenuItem>
            <AlertDialog>
                <AlertDialogTrigger>
                <DropdownMenuItem className="text-red-500">
                <Trash2 className='h-4 w-4 mr-2' /> Hapus
                </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    the data from the server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                    Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* <DropdownMenuItem className="text-red-500">
              <Trash2 className='h-4 w-4 mr-2' /> Hapus
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
