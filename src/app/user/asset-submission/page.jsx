'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CircleX, CloudDownload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });

export default function PengajuanAset(){
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({ url: URL.createObjectURL(file), name: file.name }));
        setSelectedFiles([...selectedFiles, ...newFiles]);
    };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles(selectedFiles.filter(file => file.name !== fileName));
    };

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

    return(
        <div className="py-4">
            <div className="w-full max-w-7xl mx-auto">
                <p className="title font-manrope font-bold text-2xl leading-10">Pengajuan Aset</p>
                <p className="title text-muted-foreground text-sm mb-5">Here's a list of your assets.</p>
                <hr className="mb-4" />
                <div className="flex items-start">
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold">
                            Manajemen Aset
                        </div>
                        <div className="text-muted-foreground text-xs">
                            Pengajuan
                        </div>
                    </div>

                    <div className="ml-20 w-full max-w-lg">
                        <div className="mb-4">
                            <Label className="block text-sm mb-2 font-semibold">Tipe</Label>
                            <RadioGroup className=''>
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Peminjaman" id="r1" style={{ color: "#F9B421" }} />
                                        <Label htmlFor="r1">Peminjaman</Label>
                                    </div>
                                    <p className="title text-muted-foreground text-xs ml-6">Memungkinkan pegguna untuk mengajukan permohonan peminjaman.</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Pengembalian" id="r2" style={{ color: "#F9B421" }} />
                                        <Label htmlFor="r1">Pengembalian</Label>
                                    </div>
                                    <p className="title text-muted-foreground text-xs ml-6">Mengembalikan aset setelah penggunaan selesai</p>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2 font-semibold" htmlFor="kategori">Kategori</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori untuk ditampilkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kategori1">Kategori 1</SelectItem>
                                    <SelectItem value="kategori2">Kategori 2</SelectItem>
                                    <SelectItem value="kategori3">Kategori 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2 font-semibold" htmlFor="kategori">Aset</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kondisi untuk ditampilkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="baik">Baik</SelectItem>
                                    <SelectItem value="perluperbaikan">Perlu Perbaikan</SelectItem>
                                    <SelectItem value="rusak">Rusak</SelectItem>
                                    <SelectItem value="dalamperbaikan">Dalam Perbaikan</SelectItem>
                                    <SelectItem value="tidakaktif">Tidak Aktif</SelectItem>
                                    <SelectItem value="hilang">Hilang</SelectItem>
                                    <SelectItem value="tidaklayakpakai">Tidak Layak Pakai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <div className="w-full mr-2">
                                    <Label className="block text-sm mb-2 font-semibold">Tanggal Pengajuan</Label>
                                    <div className="relative">
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
                                <div className="w-full ml-2">
                                    <Label className="block text-sm mb-2 font-semibold">Jangka Waktu</Label>
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
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2 font-semibold">Gambar Aset</Label>
                            <div className="border-dashed border-2 rounded-lg flex flex-col items-center justify-center p-4 mb-1">
                            <CloudDownload className="h-4 w-4 mb-4" />
                                <div className="text-sm font-semibold mb-2">Choose a file or drag & drop it here</div>
                                <div className="text-muted-foreground text-xs mb-5">JEPG, PNG up to 5 MB</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                />
                                <Button variant="outline" className="mb-4" onClick={() => document.getElementById('fileInput').click()}>Browse File</Button>
                            </div>
                            {selectedFiles.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {selectedFiles.map(file => (
                                        <Card key={file.name} className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{file.name}</span>
                                            <Button variant="danger" onClick={() => handleRemoveFile(file.name)}>
                                                <CircleX className="h-4 w-4"/>
                                            </Button>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 text-sm font-semibold rounded-lg" style={{ background: "#F9B421" }}>Buat Pengajuan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}