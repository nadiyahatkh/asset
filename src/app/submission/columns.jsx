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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const columns = [
  {
    accessorKey: 'asset.asset_name',
    header: 'Nama Aset'
  },
  {
    accessorKey: 'asset.category.name',
    header: 'Kategori'
  },
  {
    accessorKey: 'submission_date',
    header: 'Tanggal Pengajuan',
    cell: info => formatDate(info.getValue()),
  },
  {
    accessorKey: 'expiry_date',
    header: 'Tanggal Masa Habis',
    cell: info => formatDate(info.getValue()),
  },
  {
    accessorKey: 'user.name',
    header: 'Pengaju'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize"> {row.getValue("status").replace(/_/g, ' ')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'type',
    header: 'Tipe',
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize"> {row.getValue("type")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
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
