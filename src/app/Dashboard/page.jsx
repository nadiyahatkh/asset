"use client"
import { Button } from "@/components/ui/button";
import { Activity, CalendarIcon, CreditCard, DollarSign, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard from "@/components/SalesCard";

const cardData = [
    {
      label: "Jumlah Aset",
      amount: "123",
      description: "+2 from last month",
    },
    {
      label: "Total Aset Aktif",
      amount: "120",
      description: "+3 from last month",
    },
    {
      label: "Aset Rusak",
      amount: "3",
      description: "+1 from last month",
    },
    {
      label: "Aset Dipinjamkan",
      amount: "10",
      description: "+1 from last hour",
    }
  ];

  const uesrSalesData = [
    {
      name: "Olivia Martin",
      date: "21-10-2024",
      merk: "Macbook Air 2020",
      
    },
    {
      name: "Jackson Lee",
      date: "21-10-2024",
      merk: "Macbook Air 2020"
    },
    {
      name: "Isabella Nguyen",
      date: "21-10-2024",
      merk: "Macbook Air 2020"
    },
    {
      name: "William Kim",
      date: "21-10-2024",
      merk: "Macbook Air 2020"
    },
    {
      name: "Sofia Davis",
      date: "21-10-2024",
      merk: "Macbook Air 2020"
    }
  ];

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default function Dashboard() {

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
          <p className="title font-manrope font-bold text-2xl leading-10">Dashboard</p>
          <Form {...form}>
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
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 mb-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            description={d.description}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
            
        <p className="p-4 font-semibold">Kategori Aset</p>
        <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
        <section>
            <p className="text-base font-bold">Pengembalian Terdekat</p>
            <p className="text-sm text-gray-400">
              Terdapat 5 pengembalian terdekat
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              date={d.date}
              name={d.name}
              merk={d.merk}
            />
          ))}
        </CardContent>
      </section>
      </div>
    </div>
  );
}
