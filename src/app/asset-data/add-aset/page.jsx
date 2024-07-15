'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CalendarIcon, CircleX, CloudDownload } from 'lucide-react';
import { createAset, fetchCategory } from '@/app/apiService';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  asset_code: z.string().min(1, { message: "Kode aset is required." }),
  asset_name: z.string().min(1, { message: "Nama aset is required." }),
  category_id: z.preprocess((val) => Number(val), z.number().min(1, { message: "Kategori wajib diisi." })),
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

export default function AddAset() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState();
  const [itemCondition, setItemCondition] = useState('');
  const [status, setStatus] = useState('');
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [tanggalMulaiValue, setTanggalMulaiValue] = useState(null);
  const router = useRouter();

  // Handle change untuk tanggal mulai
  const handleTanggalMulaiChange = (date) => {
    form.setValue('tanggalMulai', date); // Set nilai di react-hook-form
    setTanggalMulaiValue(date);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({ file: file }));
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };
  
  

  const handleRemoveFile = (fileName) => {
    setSelectedFiles(selectedFiles.filter(file => file.file.name !== fileName));
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data) => {
    data.category_id = categoryId; // Set category_id from state
    data.item_condition = itemCondition; // Set item_condition from state
    data.status = status; 

    try {
      const result = await createAset({ data, token, path: selectedFiles.map(file => file.file) });
      toast.success("Asset created successfully!");
      // Reset form setelah submit berhasil
      form.reset();

      // Redirect to another page
      router.push('/asset-data'); // Ganti dengan path halaman tujuan
    } catch (error) {
      toast.error("Failed to create asset.");
      console.error('Error creating asset:', error);
    }
  };

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

  return (
    <div className="py-4">
      <div className="w-full max-w-7xl mx-auto">
        <p className="title font-manrope font-bold text-2xl leading-10">Tambah Aset</p>
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

          <div className="ml-5 w-full max-w-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Label className="block text-sm mb-2">Kode aset</Label>
                  <FormField
                    control={form.control}
                    name="asset_code"
                    render={({ field }) => (
                      <>
                      <Input {...field} placeholder="A-827" type="text" />
                      {form.formState.errors.asset_code && (
                        <FormMessage type="error" className="italic">{form.formState.errors.asset_code.message}</FormMessage>
                      )}
                      </>
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
                      <>
                      <Input {...field} placeholder="Name" type="text" />
                      {form.formState.errors.asset_name && (
                        <FormMessage type="error" className="italic">{form.formState.errors.asset_name.message}</FormMessage>
                      )}
                      </>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Label className="block text-sm mb-2" htmlFor="kategori">Kategori</Label>
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <>
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
                      {form.formState.errors.category_id && (
                        <FormMessage type="error" className="italic">{form.formState.errors.category_id.message}</FormMessage>
                      )}
                      </>
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
                          <SelectItem value="1">Baik</SelectItem>
                          <SelectItem value="2">Perlu Perbaikan</SelectItem>
                          <SelectItem value="3">Rusak</SelectItem>
                          <SelectItem value="4">Dalam Perlbaikan</SelectItem>
                          <SelectItem value="5">Tidak Aktif</SelectItem>
                          <SelectItem value="6">Hilang</SelectItem>
                          <SelectItem value="7">Tidak Layak Pakai</SelectItem>
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
                        <SelectItem value="1">Aktif</SelectItem>
                        <SelectItem value="2">Tidak Aktif</SelectItem>
                        <SelectItem value="3">Dipinjamkan</SelectItem>
                        <SelectItem value="4">Dalam Pemeliharaan</SelectItem>
                        <SelectItem value="5">Dalam Penyimpanan</SelectItem>
                        <SelectItem value="6">Dalam Perbaikan</SelectItem>
                        <SelectItem value="7">Dalam Proses Peminjaman</SelectItem>
                        <SelectItem value="8">Tidak Layak Pakai</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Label className="block text-sm mb-2">Gambar Aset</Label>
                  <div className="border-dashed border-2 rounded-lg flex flex-col items-center justify-center p-4 mb-1">
                      <CloudDownload className="h-4 w-4 mb-4" />
                          <div className="text-sm font-semibold mb-2">Choose a file or drag & drop it here</div>
                          <div className="text-muted-foreground text-xs mb-5">JEPG, PNG up to 5 MB</div>
                          <input
                              name='path'
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="fileInput"
                              onChange={handleFileChange}
                          />
                          <Button type="button" variant="outline" className="mb-4" onClick={() => document.getElementById('fileInput').click()}>Browse File</Button>
                      </div>
                  {/* <input type="file" name="path" className='hidden' multiple onChange={handleFileChange} /> */}
                  {selectedFiles.length > 0 && (
                    <div className='mt-4 space-y-2'>
                      {selectedFiles.map((file) => (
                        <Card key={file.name} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground text-black" >{file.file.name}</span>
                          <Button variant="danger" type="button" onClick={() => handleRemoveFile(file.file.name)}>
                            <CircleX className="h-4 w-4"/>
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                  <div className="flex justify-end">
                  <Button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg" style={{ background: "#F9B421" }}>Submit</Button>

                  </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
