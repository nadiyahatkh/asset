'use client'
import { fetchApplicantUserId, fetchGetAsetApplicant, updateApplicantUser } from "@/app/apiService";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
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
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";


const FormSchema = z.object({
    asset_id: z.string().optional(),
    submission_date: z.date().optional(),
    expiry_date: z.date().optional(),
    type: z.number().optional(),
});

export default function UbahPengajuanAset(){
    const { id } = useParams()
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [assets, setAssets] = useState()
    const [assetId, setAssetId] = useState()
    const [transactionType, setTransactionType] = useState('');
    const [image, setImage] = useState()
    const [deletedImages, setDeletedImages] = useState([]);
    const router = useRouter();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({ file: file }));
        setSelectedFiles([...selectedFiles, ...newFiles]);
      };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles(selectedFiles.filter(file => file.file.name !== fileName));
    };

    const handleRemoveImage = (filePath) => {
        setImage((prevImage) => prevImage.filter((file) => file.path !== filePath));
        setDeletedImages((prevDeletedImages) => [...prevDeletedImages, filePath]);
      };

    const form = useForm({
        resolver: zodResolver(FormSchema),
      });

      const onSubmit= async (data) => {
        const payload = {
            ...data,
            asset_id: data.asset_id || assetId,
            path: selectedFiles.map(file => file.file),
            delete_images: deletedImages

        };
        setIsLoading(true);
        try{
            const result = await updateApplicantUser({id, data: payload, token, path: selectedFiles.map(file => file.file) });
            form.reset();
            setOpenSuccess(true)
        } catch (error) {
            const message = JSON.parse(error.message)
            setErrorMessages(Object.values(message.error).flat());
            setOpenError(true)
            console.error('Error update submission:', error);
        } finally {
            setIsLoading(false);
          }
    }

    useEffect(() => {
        const loadData = async () => {
          try {
            const response = await fetchGetAsetApplicant({ token, type: transactionType });
            console.log(response)
            setAssets(response);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        if (token && transactionType) {
          loadData();
        }
    }, [token, transactionType]);

    useEffect(() => {
        const fetchData = async () => {
            
          if (token && id) {
            const response = await fetchApplicantUserId({ token, id });
            console.log(response)
            form.setValue('asset_id', response.asset_id.toString(), {shouldValidate: true})
            form.setValue('submission_date', new Date(response.submission_date), {shouldValidate: true})
            form.setValue('expiry_date', new Date(response.expiry_date), {shouldValidate: true})
            form.setValue('type', response.type, {shouldValidate: true})
            setImage(response.image_assets);
            setTransactionType(response.type)
            setAssetId(response.asset_id);  // Set assetId
          }
        };
    
        fetchData();
      }, [token, id]);

      useEffect(() => {
        const fetchAssets = async () => {
            if (transactionType === 1 ) {
                const response = await fetchGetAsetApplicant({ token, type: transactionType });
                console.log(response)
                setAssets(response);
            }
        };

        if (token && transactionType) {
            fetchAssets();
        }
    }, [transactionType, token]);


    return(
        <div className="py-4">
            <div className="w-full max-w-7xl mx-auto">
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" >Home</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
                <hr className="mb-4" />
                <p className="title font-manrope font-bold text-2xl leading-10">Ubah Pengajuan Aset</p>
                <p className="title text-muted-foreground text-sm mb-5">Here a list of your assets.</p>
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
                                            <RadioGroup onValueChange={(value) => {
                                                field.onChange(value);
                                                setTransactionType(value);
                                            }} value={field.value?.toString()}>
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem name="type" value="1" id="r1" style={{ color: "#F9B421" }} disabled={transactionType === 2} />
                                                        <Label htmlFor="r1">Peminjaman</Label>
                                                    </div>
                                                    <p className="title text-muted-foreground text-xs ml-6">Memungkinkan pengguna untuk mengajukan permohonan peminjaman.</p>
                                                </div>
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem name="type" value="2" id="r2" style={{ color: "#F9B421" }} disabled={transactionType === 1} />
                                                        <Label htmlFor="r2">Pengembalian</Label>
                                                    </div>
                                                    <p className="title text-muted-foreground text-xs ml-6">Mengembalikan aset setelah penggunaan selesai</p>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-2 font-semibold">Aset</Label>
                                    <FormField
                                        control={form.control}
                                        name="asset_id"
                                        render={({ field }) => (
                                            <>
                                            {assets && assets.length > 0 ? (
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
                                            ) : (
                                                <p className="text-sm text-red-500">Data aset tidak tersedia.</p>
                                            )}
                                        </>
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
                                        <div className="text-muted-foreground text-xs mb-5">JEPG, JPG, PNG up to 2 MB</div>
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
                                                    <span className="text-sm text-muted-foreground p-2">{file.file?.name}</span>
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
                                                    <span className="text-sm text-muted-foreground p-2">{file.path}</span>
                                                    <Button type="button" variant="danger" onClick={() => handleRemoveImage(file.path)}>
                                                        <CircleX className="h-4 w-4"/>
                                                    </Button>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                <Button
                                onClick={() => console.log(form)}
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 text-sm font-semibold rounded-lg"
                                style={{ background: "#F9B421" }}
                                >
                                {isLoading ? (
                                    <TailSpin
                                    height="20"
                                    width="20"
                                    color="#ffffff"
                                    ariaLabel="loading"
                                    />
                                ) : (
                                    "Ubah Pengajuan"
                                )}
                                </Button>
                                </div>
                                {/* Success Dialog */}
                                <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
                                    <AlertDialogContent>
                                    <AlertDialogTitle>Success</AlertDialogTitle>
                                    <AlertDialogDescription>Aset has been updated successfully!</AlertDialogDescription>
                                    <AlertDialogAction onClick={() => router.push('/')} style={{ background: "#F9B421" }}>OK</AlertDialogAction>
                                    </AlertDialogContent>
                                </AlertDialog>

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
    )
}