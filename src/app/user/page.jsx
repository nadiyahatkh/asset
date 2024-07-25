'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { columns } from "./columns";
import { DataTable } from "@/components/user/pengajuanAset-table/data-table";
import { fetchApplicant, selectRemoveApplicant } from "../apiService";
import { useSession } from "next-auth/react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function User() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const defaultDate = {
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31)
  };

  const [date, setDate] = useState(defaultDate);


  useEffect(() => {
  const loadData = async () => {
    try {
      const start_date = date.from ? format(date.from, 'yyyy-MM-dd') : '';
      const end_date = date.to ? format(date.to, 'yyyy-MM-dd') : '';
      const pengajuanData = await fetchApplicant({ token, search, start_date, end_date, page, per_page: perPage });
      setData(pengajuanData.data.data);
      setTotalPages(pengajuanData.total_page);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

    if (token) {
      loadData();
    }
  }, [token, search, page, perPage, date]);

  const deleteRow = (id) => {
    setData((prevData) => prevData.filter(item => item.id !== id));
  }

  const deleteRows = async (ids) => {
    try {
      const response = await selectRemoveApplicant({ ids, token });
      if (response) {
        setData((prevData) => prevData.filter(item => !ids.includes(item.id)));
      }
    } catch (error) {
      console.error('Failed to delete rows:', error);
    }
  };

  const resetDateFilter = () => {
    setDate(defaultDate);
  };

  const isDateDefault = () => {
    return date.from.getTime() === defaultDate.from.getTime() && date.to.getTime() === defaultDate.to.getTime();
  };

  return (
    <div className="py-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {/* Left section */}
          <div>
            <p className="title font-manrope font-bold text-2xl leading-10">Pengajuan Aset</p>
            <p className="text-muted-foreground text-sm">
                Here's a list of your asset.
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

              {!isDateDefault() && (
              <Button variant="outline" className="text-red-500" style={{ color: '#F9B421', border: 'none' }} onClick={resetDateFilter}>
                Reset Date
              </Button>
            )}
            {/* Add Asset Button */}
            <Button variant="solid" className="" style={{ background: "#F9B421" }}>
                <Link href="./user/asset-submission">
                    Pengajuan Aset
                </Link>
            </Button>
          </div>
        </div>
        <Card className="shadow-md">
          <div className="container mx-auto p-4">
          <DataTable
            columns={columns(deleteRow)}
            data={data}
            search={search}
            setSearch={setSearch}
            onDelete={deleteRows}
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
          </div>
        </Card>
      </div>
    </div>
  );
}
