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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import React, { useRef, useState } from 'react';
import Autoplay from "embla-carousel-autoplay"
import { useSession } from 'next-auth/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { removeAssetData } from '../apiService';
import { formatCurrency } from '../utils/formatCurrency';

  

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
        accessorKey: 'asset_code',
        header: 'Kode Aset'
      },
  {
    accessorKey: 'asset_name',
    header: 'Nama Aset'
  },
  {
    accessorKey: 'category',
    header: 'Kategori'
  },
  {
    accessorKey: 'item_condition',
    header: 'Kondisi'
  },
  {
    accessorKey: 'price',
    header: 'Harga',
    cell: info => formatCurrency(info.getValue())
  },
  {
    accessorKey: 'received_date',
    header: 'Tanggal',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'expiration_date',
    header: 'Expired',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize"> {row.getValue("status")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'document',
    header: 'Document',
    cell: ({ row }) => {
      const user = row.original;

      // Pastikan user.image adalah array sebelum menggunakan split
      const images = Array.isArray(user.image) ? user.image : [];

      return (
        <Dialog>
          <DialogTrigger>
            <Button variant='ghost' className='h-4 w-4 p-0' style={{ color: "#F9B421" }}>
              Lihat
            </Button>
          </DialogTrigger>
          <DialogContent className="flex items-center justify-center">
            <div className="w-full max-w-xs">
              <Carousel
                plugins={[Autoplay({ delay: 2000 })]}
                className="w-full"
              >
                <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <img src={image} alt={`Asset Image ${index}`} className="w-full h-full object-cover" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </DialogContent>
        </Dialog>

      );
    }
  },
  {
    accessorKey: 'Aksi',
    id: 'actions',
    cell: ({ row }) => {
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const { data: session } = useSession();
      const token = session?.user?.token;
      const id = row.original.id;

      const handleDelete = async () => {
        try {
          const idToDelete = row.original.id;
          console.log(row.original) // Sesuaikan dengan cara Anda mendapatkan ID yang tepat dari data baris
          await removeAssetData({ id: idToDelete, token: token });
          
          deleteRow(idToDelete);
          setIsDeleteDialogOpen(false); // Tutup dialog setelah berhasil menghapus
        } catch (error) {
          console.error('Gagal menghapus data:', error);
        }
      };

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
                <Link href={`./asset-data/update-aset/${id}`} className='flex items-center'>
                  <PencilLine className="mr-2 h-4 w-4" />
                  Ubah
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-500">
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
