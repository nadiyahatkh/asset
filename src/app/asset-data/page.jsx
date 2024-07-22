'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { addDays, format } from "date-fns";
import { z } from "zod";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/dataAset-table/data-table";
import { useSession } from "next-auth/react";
import { fetchAssetData, selectRemoveAsset } from "../apiService";
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';



const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });

export default function DataAset() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [statusFilter, setStatusFilter] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const [date, setDate] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31)
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const start_date = date.from ? format(date.from, 'yyyy-MM-dd') : '';
        const end_date = date.to ? format(date.to, 'yyyy-MM-dd') : '';
        const asseData = await fetchAssetData({ token, search, status: statusFilter, page, per_page: perPage, start_date, end_date});
        setData(asseData.data.data);
        setTotalPages(asseData.total_page)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (token) {
      loadData();
    }
  }, [token, search, statusFilter, page, perPage, date]);

  const deleteRow = (id) => {
    setData((prevData) => prevData.filter(item => item.id !== id));
  };

  // const handleDelete = async () => {
  //   const selectedIds = table.getSelectedRowModel().rows.map(row => row.original.id);
    
  //   try {
  //     const response = await selectRemoveAsset({ ids: selectedIds, token });
  //     if (response) {
  //       setData((prevData) => prevData.filter(item => !selectedIds.includes(item.id)));
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete rows:', error);
  //   }
  // };

  const deleteRows = async (ids) => {
    try {
      const response = await selectRemoveAsset({ ids, token });
      if (response) {
        setData((prevData) => prevData.filter(item => !ids.includes(item.id)));
      }
    } catch (error) {
      console.error('Failed to delete rows:', error);
    }
  };
  


    const form = useForm({
        resolver: zodResolver(FormSchema),
      });

    return (
        <div className="py-4">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              {/* Left section */}
              <div>
                <p className="title font-manrope font-bold text-2xl leading-10">Data Aset</p>
                <p className="text-muted-foreground text-sm">
                  Here's a list of your assets.
                </p>
              </div>
              {/* Right section */}
              <div className="flex items-center space-x-4">
              <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
              </Popover>

                {/* Delete Button */}
                <Button variant="outline" className="text-red-500" style={{ color: '#F9B421', border: 'none' }}>
                    Delete
                </Button>
                {/* Add Asset Button */}
                <Button variant="solid" className="" style={{ background: "#F9B421" }}>
                    <Link href="./asset-data/add-aset">
                        Tambah Aset
                    </Link>
                </Button>
              </div>
            </div>
            <Card className="shadow-md">
              <div className="container mx-auto p-4">
                <DataTable 
                columns={columns(deleteRow)} 
                data={data} 
                setData={setData} 
                search={search} 
                setSearch={setSearch} 
                statusFilter={statusFilter} 
                setStatusFilter={setStatusFilter} 
                totalPages={totalPages} 
                setPage={setPage} 
                perPage={perPage} 
                setPerPage={setPerPage} 
                currentPage={page}
                onDelete={deleteRows} 
                />
              </div>
            </Card>
          </div>
        </div>
    );
}
