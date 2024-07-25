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
import { useState } from 'react';
import { removeApplicant } from '../apiService';
import { useSession } from 'next-auth/react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


export const columns = (deleteRow) => [
  
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
    header: 'Nama Aset'
  },
  {
    accessorKey: 'asset.category.name',
    header: 'Kategori',
    cell: info => info.row.original.asset.category.name,
  },
  {
    accessorKey: 'submission_date',
    header: 'Tanggal Pengajuan',
    cell: info => formatDate(info.getValue()),
  },
  {
    accessorKey: 'expiry_date',
    header: 'Tanggal Kedaluwarsa',
    cell: info => formatDate(info.getValue()),
  },
  {
    accessorKey: 'type',
    header: 'Tipe'
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'Aksi',
    id: 'aksi',
    cell: ({ row, data }) => {
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const { data: session } = useSession();
      const token = session?.user?.token;
      const id = row.original.id;

      const handleDelete = async () => {
        try {
          const idToDelete = row.original.id;
          console.log(row.original) // Sesuaikan dengan cara Anda mendapatkan ID yang tepat dari data baris
          await removeApplicant({ id: idToDelete, token: token });
          deleteRow(idToDelete)
          setIsDeleteDialogOpen(false); // Tutup dialog setelah berhasil menghapus
        } catch (error) {
          console.error('Gagal menghapus data:', error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Buka menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`./user/update-submission/${id}`} className="flex items-center hover:bg-gray-100">
                <PencilLine className="mr-2 h-4 w-4" />
                Ubah
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-500">
              <Trash2 className='h-4 w-4 mr-2' /> Hapus
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link href={`./user/submission-details/${id}`} className="flex items-center hover:bg-gray-100">
                <PencilLine className="mr-2 h-4 w-4" />
                Detail
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <AlertDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data secara permanen dari server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      );
    }
  }
];
