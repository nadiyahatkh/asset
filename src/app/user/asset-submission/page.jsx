'use client'
import { createApplicantUser, fetchAssetData, fetchGetAsetApplicant } from "@/app/apiService";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
    asset_id: z.string().min(1, { message: "asset wajib diisi." }),
    submission_date: z.date({
      required_error: "Tanggal mulai is required.",
    }),
    expiry_date: z.date({
      required_error: "Tanggal habis is required.",
    }),
    type: z.string().min(1, { message: "type is required." }),
});

export default function PengajuanAset(){
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [assets, setAssets] = useState([]);
    const [assetId, setAssetId] = useState()
    const router = useRouter()

    useEffect(() => {
        const loadData = async () => {
          try {
            const response = await fetchGetAsetApplicant({ token });
            console.log(response)
            setAssets(response);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        if (token) {
          loadData();
        }
    }, [token]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({ file: file }));
        setSelectedFiles([...selectedFiles, ...newFiles]);
      };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles(selectedFiles.filter(file => file.name !== fileName));
    };

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit= async (data) => {
        data.asset_id = assetId;
        try{
            const result = await createApplicantUser({data, token, path: selectedFiles.map(file => file.file) });
            toast.success("created successfully");
            form.reset();
            router.push('/')
        } catch (error) {
            toast.error("Failed to create asset.");
            console.error('Error creating asset:', error);
        }
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2 font-semibold">Tipe</Label>
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <RadioGroup onValueChange={field.onChange} value={field.value?.toString()}>
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem name="type" value="1" id="r1" style={{ color: "#F9B421" }} />
                                                        <Label htmlFor="r1">Peminjaman</Label>
                                                    </div>
                                                    <p className="title text-muted-foreground text-xs ml-6">Memungkinkan pengguna untuk mengajukan permohonan peminjaman.</p>
                                                </div>
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem name="type" value="2" id="r2" style={{ color: "#F9B421" }} />
                                                        <Label htmlFor="r2">Pengembalian</Label>
                                                    </div>
                                                    <p className="title text-muted-foreground text-xs ml-6">Mengembalikan aset setelah penggunaan selesai</p>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2 font-semibold" htmlFor="kategori">Aset</Label>
                                    <FormField
                                        control={form.control}
                                        name="asset_id"
                                        render={({ field }) => (
                                        <Select
                                            value={field.value ? field.value.toString() : ""}
                                            onValueChange={(value) => {
                                                field.onChange(value); // Update react-hook-form state
                                                setAssetId(value)
                                            }}
                                            {...field}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih asset untuk ditampilkan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {assets?.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>{item.asset_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                <div className="flex justify-between items-center">
                                    <div className="w-full mr-2">
                                    <Label className="block text-sm mb-2">Tanggal Pengajuan</Label>
                                    <FormField
                                        control={form.control}
                                        name="submission_date"
                                        render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                {field.value ? format(field.value, 'PPP') : <span>Pilih tanggal pengajuan</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date('1900-01-01') || date > new Date('2100-12-31')} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        )}
                                    />
                                    </div>
                                    <div className="w-full ml-2">
                                    <Label className="block text-sm mb-2">Jangka Waktu</Label>
                                    <FormField
                                        control={form.control}
                                        name="expiry_date"
                                        render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                {field.value ? format(field.value, 'PPP') : <span>Pilih Jangka Waktu</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date('1900-01-01') || date > new Date('2100-12-31')} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        )}
                                    />
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
                                            name="path"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="fileInput"
                                            onChange={handleFileChange}
                                        />
                                        <Button type="button" variant="outline" className="mb-4" onClick={() => document.getElementById('fileInput').click()}>Browse File</Button>
                                    </div>
                                    {selectedFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {selectedFiles.map(file => (
                                                <Card key={file.name} className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground p-2">{file.file.name}</span>
                                                    <Button type="button" variant="danger" onClick={() => handleRemoveFile(file.file.name)}>
                                                        <CircleX className="h-4 w-4"/>
                                                    </Button>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" onClick={() => (console.log(form))} className="px-4 py-2 text-sm font-semibold rounded-lg" style={{ background: "#F9B421" }}>Buat Pengajuan</button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}