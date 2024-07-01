'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { addDays, format } from "date-fns";
import { z } from "zod";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { columns } from "./columns";
import { DataTable } from "@/components/user/pengajuanAset-table/data-table";
import { fetchApplicant } from "../apiService";
import { useSession } from "next-auth/react";

// const FormSchema = z.object({
//     dob: z.date({
//       required_error: "A date of birth is required.",
//     }),
// });

export default function User() {
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    const loadData = async () => {
      try {
        const pengajuanData = await fetchApplicant({ token });
        setData(pengajuanData.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (token) {
      loadData();
    }
  }, [token]);

  // const form = useForm({
  //   resolver: zodResolver(FormSchema),
  // });

  // function onSubmit(data) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  // const removeApplicant = async (id) => {
  //   try {
  //     const result = await removeApplicant({id, token})

  //   }
  // }

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
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
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
            <DataTable columns={columns} data={data} />
          </div>
        </Card>
      </div>
    </div>
  );
}
