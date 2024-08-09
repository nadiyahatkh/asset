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
import { CalendarIcon, CircleX, CloudDownload } from 'lucide-react';
import { createAset, fetchCategory } from '@/app/apiService';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { TailSpin } from 'react-loader-spinner';

const FormSchema = z.object({
  asset_code: z.string().min(1, { message: "Kode aset is required." }),
  asset_name: z.string().min(1, { message: "Nama aset is required." }),
  category_id: z.preprocess((val) => Number(val), z.number().min(1, { message: "Kategori wajib diisi." })),
  item_condition: z.string().min(1, { message: "Kondisi is required." }),
  price: z.preprocess((val) => Number(String(val).replace(/[^0-9]/g, '')), z.number().min(1, { message: "Harga aset is required." })),
  received_date: z.date({
    required_error: "Tanggal Pembelian is required.",
  }),
  expiration_date: z.date({
    required_error: "Jangka Waktu  is required.",
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
  const router = useRouter();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    data.category_id = categoryId;
    data.item_condition = itemCondition;

    if (typeof data.price === 'string') {
      data.price = Number(data.price.replace(/[^0-9]/g, ''));
    }

    setIsSubmitting(true);

    try {
      const result = await createAset({ data, token, path: selectedFiles.map(file => file.file) });
      setOpenSuccess(true)
      
    } catch (error) {
      const message = JSON.parse(error.message)
      setErrorMessages(Object.values(message.error).flat());
      setOpenError(true)
      console.error('Error creating asset:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const category = await fetchCategory({ token });
        setCategory(category.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (token) {
      loadData();
    }
  }, [token]);

  const formatPrice = (value) => {
    if (!value) return "";
    const numberValue = Number(value.replace(/[^0-9]/g, ""));
    const numberFormat = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return numberFormat.format(numberValue).replace('Rp', 'Rp ');
  };

  return (
    <div className="py-4">
      <div className="w-full max-w-7xl mx-auto">
        <p className="title font-manrope font-bold text-2xl leading-10">Tambah Aset</p>
        <p className="title text-muted-foreground text-sm mb-5">Heres a list of your assets.</p>
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
                      <>
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
                      {form.formState.errors.item_condition && (
                          <FormMessage type="error" className="italic">{form.formState.errors.item_condition.message}</FormMessage>
                        )}
                      </>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Label className="block text-sm mb-2" htmlFor="hargaAset">Harga Asset</Label>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <>
                      <Input {...field} placeholder="Rp. 129,000,000" type="text" value={field.value} onChange={(e) => field.onChange(formatPrice(e.target.value))} />
                      {form.formState.errors.price && (
                        <FormMessage type="error" className="italic">{form.formState.errors.price.message}</FormMessage>
                      )}
                      </>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="w-full mr-2">
                      <Label className="block text-sm mb-2">Tanggal Pembelian</Label>
                      <FormField
                        control={form.control}
                        name="received_date"
                        render={({ field }) => (
                          <>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                  {field.value ? format(field.value, 'PPP') : <span>Pilih Tanggal Pembelian</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date('1900-01-01') || date > new Date('2100-12-31')} initialFocus />
                            </PopoverContent>
                          </Popover>
                          {form.formState.errors.received_date && (
                            <FormMessage type="error" className="italic">{form.formState.errors.received_date.message}</FormMessage>
                          )}
                          
                          </>
                        )}
                      />
                      <Label className="title text-muted-foreground text-xs">Pilih Tanggal Pembelian</Label>
                    </div>
                    <div className="w-full ml-2">
                      <Label className="block text-sm mb-2">Jangka Waktu</Label>
                      <FormField
                        control={form.control}
                        name="expiration_date"
                        render={({ field }) => (
                          <>
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
                          {form.formState.errors.expiration_date && (
                              <FormMessage type="error" className="italic">{form.formState.errors.expiration_date.message}</FormMessage>
                            )}
                          </>
                        )}
                      />
                      <Label className="title text-muted-foreground text-xs">Pilih Jangka Waktu</Label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="block text-sm mb-2" htmlFor="status">Status</Label>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <>
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
                        <SelectItem value="4">Dalam Proses Peminjaman</SelectItem>
                        <SelectItem value="5">Dalam Proses Pengembalian</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.status && (
                          <FormMessage type="error" className="italic">{form.formState.errors.status.message}</FormMessage>
                        )}
                      </>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Label className="block text-sm mb-2">Gambar Aset</Label>
                  <div className="border-dashed border-2 rounded-lg flex flex-col items-center justify-center p-4 mb-1">
                      <CloudDownload className="h-4 w-4 mb-4" />
                          <div className="text-sm font-semibold mb-2">Choose a file or drag & drop it here</div>
                          <div className="text-muted-foreground text-xs mb-5">JEPG, JPG, PNG up to 2 MB</div>
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
                          <span className="text-sm text-muted-foreground text-black p-2" >{file.file.name}</span>
                          <Button variant="danger" type="button" onClick={() => handleRemoveFile(file.file.name)}>
                            <CircleX className="h-4 w-4"/>
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                  <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg" style={{ background: "#F9B421" }}>
                  {isSubmitting ? (
                      <TailSpin
                            height="20"
                            width="20"
                            color="#ffffff"
                            ariaLabel="loading"
                            />
                        ) : (
                            "Submit"
                        )}
                  </Button>

                  </div>
                  {/* Success Dialog */}
                  <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
                    <AlertDialogContent>
                    <AlertDialogTitle>Success</AlertDialogTitle>
                      <AlertDialogDescription>Aset has been created successfully!</AlertDialogDescription>
                      <AlertDialogAction onClick={() => router.push('/asset-data')} style={{ background: "#F9B421" }} >OK</AlertDialogAction>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* Error Dialog */}
                  <AlertDialog open={openError} onOpenChange={setOpenError}>
                      <AlertDialogContent>
                      <AlertDialogTitle className="text-2xl">Error</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="max-h-32 overflow-y-auto">
                            {errorMessages.map((message, index) => (
                              <p key={index} className="text-red-500 italic">{message}</p>
                            ))}
                          </div>
                        </AlertDialogDescription>
                        <AlertDialogAction onClick={() => setOpenError(false)} style={{ background: "#F9B421" }}>Close</AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
