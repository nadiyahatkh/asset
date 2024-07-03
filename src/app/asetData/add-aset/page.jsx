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
import { fetchCategory } from '@/app/apiService';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  asset_code: z.string().nonempty("Kode aset is required."),
  asset_name: z.string().nonempty("Nama aset is required."),
  category_id: z.string().nonempty("Kategori is required."),
  item_condition: z.string().nonempty("Kondisi is required."),
  price: z.string().nonempty("Harga aset is required."),
  received_date: z.date({
    required_error: "Tanggal mulai is required.",
  }),
  expiration_date: z.date({
    required_error: "Tanggal habis is required.",
  }),
  status: z.string().nonempty("Status is required."),
});

export default function AddAset() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [tanggalMulaiValue, setTanggalMulaiValue] = useState(null);

  // Handle change untuk tanggal mulai
  const handleTanggalMulaiChange = (date) => {
    form.setValue('tanggalMulai', date); // Set nilai di react-hook-form
    setTanggalMulaiValue(date);  }

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

  


const onSubmit = async (data) => {
    console.log(data)
  try {
    const result = await createAset({ data, token });
    toast.success("Asset created successfully!");
    // Reset form setelah submit berhasil
    form.reset();
    
    // Redirect to another page
    router.push('/src/app/asetData'); // Ganti dengan path halaman tujuan
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
        console.log(category)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (token) {
      loadData();
    }
  }, [token]);

  console.log(form)
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
            <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori untuk ditampilkan" />
                      </SelectTrigger>
                      <SelectContent>
                      {category?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
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
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kondisi untuk ditampilkan" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="1">Aktif</SelectItem>
                        <SelectItem value="2">Tidak Aktif</SelectItem>
                        <SelectItem value="3">Rusak</SelectItem>
                        <SelectItem value="4">Dipinjamkan</SelectItem>
                        <SelectItem value="5">Dalam Pemeliharaan</SelectItem>
                        <SelectItem value="6">Dalam Penyimpanan</SelectItem>
                        <SelectItem value="7">Dalam Perbaikan</SelectItem>
                        <SelectItem value="8">Dalam Proses Peminjaman</SelectItem>
                        <SelectItem value="9">Tidak Layak Pakai</SelectItem>
                        
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
                      )}
                    />
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
                                onSelect={(date) => field.onChange(date)} // Gunakan field.onChange untuk menangani perubahan tanggal
                                disabled={(date) =>
                                date <= tanggalMulaiValue || // Tanggal habis tidak boleh sebelum atau sama dengan tanggal mulai
                                date > new Date() || 
                                date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        )}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Label className="block text-sm mb-2" htmlFor="status">Status</Label>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select {...field}>
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
                  <div className="text-muted-foreground text-xs mb-5">JPEG, PNG up to 5 MB</div>
                  <input
                    type="file"
                    name='asset_image'
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
                          <CircleX className="h-4 w-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="px-4 py-2 font-semibold rounded-lg" style={{ background: "#F9B421" }}>Tambah Aset</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
