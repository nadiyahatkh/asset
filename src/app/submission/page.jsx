'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { DataTable } from "@/components/pengajuan-table/data-table";
import { columns } from "./columns";
import { fetchApplicantAdmin, selectRemoveSubmission } from "../apiService";
import { useSession } from "next-auth/react";






export default function Pengajuan() {
  const [statusFilter, setStatusFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
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
        const pengajuan = await fetchApplicantAdmin({ token, search, status: statusFilter, type: typeFilter, page, per_page: perPage, start_date, end_date });
        setData(pengajuan.data.data);
        setTotalPages(pengajuan.total_page)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (token) {
      loadData();
    }
  }, [token, search, statusFilter, typeFilter, page, perPage, date]);

      const deleteRows = async (ids) => {
        try {
          const response = await selectRemoveSubmission({ ids, token });
          console.log(response)
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
                <p className="title font-manrope font-bold text-2xl leading-10">Pengajuan</p>
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
              </div>
            </div>
            <Card className="shadow-md">
              <div className="container mx-auto p-4">
                <DataTable 
                  columns={columns} 
                  data={data} 
                  search={search} 
                  setSearch={setSearch} 
                  statusFilter={statusFilter} 
                  setStatusFilter={setStatusFilter} 
                  typeFilter={typeFilter} 
                  setTypeFilter={setTypeFilter} 
                  currentPage={page}
                  totalPages={totalPages}
                  setPage={setPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                  onDelete={deleteRows} 
                />
              </div>
            </Card>
          </div>
        </div>
    );
}
