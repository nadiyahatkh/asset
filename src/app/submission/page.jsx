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

const data = [
  {
    id: "m5gr84i9",
    namaaset: "Mackbook Air M1 2020",
    kategori: "Laptop",
    tanggalpengajuan: "22-02-2023",
    tanggalmasahabis: "22-02-2023",
    pengaju: "Olivia",
    tipe: "peminjaman",
  },
  {
    id: "3u1reuv4",
    namaaset: "Hp Pav Pro",
    kategori: "Handphone",
    tanggalpengajuan: "22-02-2023",
    tanggalmasahabis: "22-02-2023",
    pengaju: "Olivia",
    tipe: "peminjaman",
  },
  {
    id: "derv1ws0",
    namaaset: "iPhone 13",
    kategori: "Handphone",
    tanggalpengajuan: "22-02-2023",
    tanggalmasahabis: "22-02-2023",
    pengaju: "Olivia",
    tipe: "peminjaman",
  },
  {
    id: "5kma53ae",
    namaaset: "Macbook Pro 13",
    kategori: "Laptop",
    tanggalpengajuan: "22-02-2023",
    tanggalmasahabis: "22-02-2023",
    pengaju: "Olivia",
    tipe: "peminjaman",
  },
  {
    id: "bhqecj4p",
    namaaset: "Samsung Galaxy Fold Z 3 ",
    kategori: "Handphone",
    tanggalpengajuan: "22-02-2023",
    tanggalmasahabis: "22-02-2023",
    pengaju: "Olivia",
    tipe: "peminjaman",
  },
]


const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });

export default function Pengajuan() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
      });

      function onSubmit(data) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
      }

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
                <Form {...form} className="flex-grow">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pilih tanggal</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
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
