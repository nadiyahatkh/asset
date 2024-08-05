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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


export const columns = (handleDelete, isDeleteDialogOpen, setIsDeleteDialogOpen, setIdToDelete) => [
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
    header: 'Nama Karyawan'
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
    cell: ({ row }) => capitalizeFirstLetter(row.original.employee.department.name)
  },
  {
    accessorKey: 'employee.position.name',
    header: 'Posisi',
    cell: ({ row }) => capitalizeFirstLetter(row.original.employee.position.name)
  },
  {
    accessorKey: 'Aksi',
    id: 'aksi',
    cell: ({ row }) => {
      // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      // const { data: session } = useSession();
      // const token = session?.user?.token;
      const id = row.original.id;

      // const handleDelete = async () => {
      //   try {
      //     const idToDelete = row.original.id;
      //     await removeEmployee({ id: idToDelete, token: token });
      //     deleteRow(idToDelete);
      //     setIsDeleteDialogOpen(false); // Tutup dialog setelah berhasil menghapus
      //   } catch (error) {
      //     console.error('Gagal menghapus data:', error);
      //   }
      // };

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
            <Link href={`/employee-management/update-employee/${id}`} className='flex items-center'>
              <PencilLine className='h-4 w-4 mr-2'/> Ubah
            
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setIdToDelete(id); setIsDeleteDialogOpen(true); }} className="text-red-500">
              <Trash2 className='h-4 w-4 mr-2' /> Hapus
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
