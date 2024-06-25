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

const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });

export default function DataAset() {
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
                <p className="title font-manrope font-bold text-2xl leading-10">Data Aset</p>
                <p className="text-muted-foreground text-sm">
                  Here's a list of your assets.
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
                {/* Delete Button */}
                <Button variant="outline" className="text-red-500" style={{ color: '#F9B421', border: 'none' }}>
                    Delete
                </Button>
                {/* Add Asset Button */}
                <Button variant="solid" className="" style={{ background: "#F9B421" }}>
                    <Link href="./DataAset/TambahAset">
                        Tambah Aset
                    </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
    );
}
