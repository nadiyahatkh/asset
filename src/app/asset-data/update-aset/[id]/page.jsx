'use client'
import { fetchAssetDataId, fetchCategory, updateAset } from "@/app/apiService";
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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";


const FormSchema = z.object({
    asset_code: z.string().min(1, { message: "Kode aset is required." }),
    asset_name: z.string().min(1, { message: "Nama aset is required." }),
    category_id: z.string().min(1, { message: "Kategori wajib diisi." }),
    item_condition: z.string().min(1, { message: "Kondisi is required." }),
    price: z.string().min(1, { message: "Harga aset is required." }),
    received_date: z.date({
      required_error: "Tanggal mulai is required.",
    }),
    expiration_date: z.date({
      required_error: "Tanggal habis is required.",
    }),
    status: z.string().min(1, { message: "Status is required." }),
  });

export default function ubahAset(){
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [category, setCategory] = useState();
    const [categoryId, setCategoryId] = useState();
    const [itemCondition, setItemCondition] = useState('');
    const [status, setStatus] = useState('');
    const { data: session } = useSession();
    const token = session?.user?.token;
    const router = useRouter();
    const [dataInput, setDataInput] = useState();
    const [image, setImage] = useState()

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({ file: file }));
        setSelectedFiles([...selectedFiles, ...newFiles]);
      };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles(selectedFiles.filter(file => file.file.name !== fileName));
    };

    const handleRemoveImage = (filePath) => {
        setImage(image.filter(file => file.path !== filePath));
    };

    const form = useForm({
        resolver: zodResolver(FormSchema),

      });

      const onSubmit = async (data) => {
        data.category_id = categoryId; // Set category_id from state
        data.item_condition = itemCondition; // Set item_condition from state
        data.status = status; 
        try{
            const result = await updateAset({data, id, token, path: selectedFiles.map(file => file.file)})
            toast.success("Asset update successfully!");
            form.reset();
            router.push('/asset-data')
        } catch(error) {
            toast.error("Failed to update asset");
            console.error("Error creating asser", error)
        }
      }

      useEffect(() => {
        const loadData = async () => {
          try {
            const category = await fetchCategory({ token });
            setCategory(category.data);
            console.log(category);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        if (token) {
          loadData();
        }
      }, [token]);

      useEffect(() => {
        const fetchData = async () => {
          if (token && id) {
            const response = await fetchAssetDataId({ token, id });
            console.log(response);
            form.setValue('asset_code', response.asset_code)
            form.setValue('asset_name', response.asset_name)
            form.setValue('category_id', response.category_id)
            form.setValue('item_condition', response.item_condition)
            form.setValue('price', response.price)
            form.setValue('received_date', response.received_date)
            form.setValue('expiration_date', response.expiration_date)
            form.setValue('status', response.status)
            setImage(response.image_assets)
            setDataInput(response?.data);
          }
        };
    
        fetchData();
      }, [token, id]);

    return(
        <div className="py-4">
            <div className="w-full max-w-7xl mx-auto">
                <p className="title font-manrope font-bold text-2xl leading-10">Update Aset</p>
                <p className="title text-muted-foreground text-sm mb-5">Here's a list of your assets.</p>
                <hr className="mb-4" />
                <div className="flex items-start">
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold">
                            Manajemen Aset
                        </div>
                        <div className="text-muted-foreground text-xs">
                            Silahkan mengisi form secara benar dan teliti
                        </div>
                    </div>

                    <div className="ml-20 w-full max-w-lg">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2">Kode aset</Label>
                                    <FormField
                                        control={form.control}
                                        name="asset_code"
                                        render={({ field }) => (
                                        <Input {...field} placeholder="A-827" type="text" />
                                        )}
                                    />
                                    <Label className="title text-muted-foreground text-xs">Untuk mengisi kode aset silahkan sesuaikan agar mudah ditemukan</Label>
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2">Nama aset</Label>
                                    <FormField
                                        control={form.control}
                                        name="asset_name"
                                        render={({ field }) => (
                                        <Input {...field} placeholder="Name" type="text" />
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2" htmlFor="kategori">Kategori</Label>
                                    <FormField
                                        control={form.control}
                                        name="category_id"
                                        render={({ field }) => (
                                        <Select
                                        value={field.value ? field.value.toString() : ""}
                                            onValueChange={(value) => {
                                            field.onChange(value); // Update react-hook-form state
                                            setCategoryId(value); // Update component state
                                            }}
                                            {...field}
                                        >
                                            <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori untuk ditampilkan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {category?.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                <Label className="block text-sm mb-2" htmlFor="kondisi">Kondisi</Label>
                                    <FormField
                                        control={form.control}
                                        name="item_condition"
                                        render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => {
                                            field.onChange(value); // Update react-hook-form state
                                            setItemCondition(value); // Update component state
                                            }}
                                            {...field}
                                        >
                                            <SelectTrigger>
                                            <SelectValue placeholder="Pilih kondisi untuk ditampilkan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="Baik">Baik</SelectItem>
                                            <SelectItem value="Perlu_Perbaikan">Perlu Perbaikan</SelectItem>
                                            <SelectItem value="Rusak">Rusak</SelectItem>
                                            <SelectItem value="Dalam_Perbaikan">Dalam Perbaikan</SelectItem>
                                            <SelectItem value="Tidak_Aktif">Tidak Aktif</SelectItem>
                                            <SelectItem value="Hilang">Hilang</SelectItem>
                                            <SelectItem value="Tidak_Layak_Pakai">Tidak Layak Pakai</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2" htmlFor="hargaAset">Harga Asset</Label>
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                        <Input {...field} placeholder="Rp. 129,000,000" type="text" />
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="w-full mr-2">
                                        <Label className="block text-sm mb-2">Tanggal Mulai</Label>
                                        <FormField
                                            control={form.control}
                                            name="received_date"
                                            render={({ field }) => (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                    {field.value ? format(field.value, 'PPP') : <span>Pilih tanggal mulai</span>}
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
                                        <Label className="title text-muted-foreground text-xs">Pilih tanggal mulai</Label>
                                        </div>
                                        <div className="w-full ml-2">
                                        <Label className="block text-sm mb-2">Tanggal Habis</Label>
                                        <FormField
                                            control={form.control}
                                            name="expiration_date"
                                            render={({ field }) => (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                    {field.value ? format(field.value, 'PPP') : <span>Pilih tanggal habis</span>}
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
                                        <Label className="title text-muted-foreground text-xs">Pilih tanggal habis</Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2" htmlFor="status">Status</Label>
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => {
                                            field.onChange(value); // Update react-hook-form state
                                            setStatus(value); // Update component state
                                            }}
                                            {...field}
                                        >
                                            <SelectTrigger>
                                            <SelectValue placeholder="Pilih status untuk ditampilkan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="Aktif">Aktif</SelectItem>
                                            <SelectItem value="Tidak_Aktif">Tidak Aktif</SelectItem>
                                            <SelectItem value="Dipinjamkan">Dipinjamkan</SelectItem>
                                            <SelectItem value="Dalam_Pemeliharaan">Dalam Pemeliharaan</SelectItem>
                                            <SelectItem value="Dalam_Penyimpanan">Dalam Penyimpanan</SelectItem>
                                            <SelectItem value="Dalam_Perbaikan">Dalam Perbaikan</SelectItem>
                                            <SelectItem value="Dalam_Proses_Peminjaman">Dalam Proses Peminjaman</SelectItem>
                                            <SelectItem value="Tidak_Layak_Pakai">Tidak Layak Pakai</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        )}
                                    />
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
                                                    <span className="text-sm text-muted-foreground">{file.file.name}</span>
                                                    <Button type="button" variant="danger" onClick={() => handleRemoveFile(file.file.name)}>
                                                        <CircleX className="h-4 w-4"/>
                                                    </Button>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                    {image?.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {image?.map(file => (
                                                <Card key={file.path} className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">{file.path}</span>
                                                    <Button type="button" variant="danger" onClick={() => handleRemoveImage(file.path)}>
                                                        <CircleX className="h-4 w-4"/>
                                                    </Button>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg" style={{ background: "#F9B421" }}>Ubah Aset</button>
                                </div>
                            </form>
                        </Form>  
                    </div>
                </div>
            </div>
        </div>
    )
}