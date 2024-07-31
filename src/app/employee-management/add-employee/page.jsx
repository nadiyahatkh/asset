"use client"
import { createEmployee, fetchDepartement, fetchPosition } from "@/app/apiService";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Nama karyawan is required." }),
  email: z.string().min(1, { message: "Email is required." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
  nip: z.string().min(1, { message: "nip is required." }),
  department_id: z.string().min(1, { message: "Department wajib diisi." }),
  position_id: z.string().min(1, { message: "Posisi wajib diisi." }),
});

export default function AddEmployee() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const router = useRouter();

  const [departmentId, setDepartmentId] = useState();
  const [positionId, setPositionId] = useState();

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const loadDataDepartments = async () => {
      try {
        const departmentData = await fetchDepartement({ token });
        setDepartments(departmentData);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    const loadDataPositions = async () => {
      try {
        const positionData = await fetchPosition({ token });
        setPositions(positionData);
      } catch (error) {
        console.error('Failed to fetch positions:', error);
      }
    };

    if (token) {
      loadDataDepartments();
      loadDataPositions();
    }
  }, [token]);

  const onSubmit = async (data) => {
    console.log(data)
    data.departement_id = departmentId;
    data.position_id = positionId
    setIsLoading(true);
    try {
      const result = await createEmployee({ data, token });
      setOpenSuccess(true)
    } catch (error) {
      setErrorMessage('Error creating employee. Please try again.');
      setOpenError(true)
      console.error('Error creating employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-4">
      <div className="w-full max-w-7xl mx-auto">
        <p className="title font-manrope font-bold text-2xl leading-10">Manajemen Karyawan</p>
        <p className="title text-muted-foreground text-sm mb-5">Here's a list of your employees.</p>
        <hr className="mb-4" />
        <div className="flex items-start">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">
              Manajemen Karyawan
            </div>
            <div className="text-muted-foreground text-xs">
              Silahkan mengisi form secara benar dan teliti
            </div>
          </div>

          <div className="ml-5 w-full max-w-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Label className="block text-sm mb-2">Nama Karyawan</Label>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <>
                            <Input {...field} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Alicia" type="text" />
                            {form.formState.errors.name && (
                              <FormMessage type="error" className="italic">{form.formState.errors.name.message}</FormMessage>
                            )}
                            </>
                        )}
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm mb-2">Password</Label>
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <>
                          <Input {...field} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="****" type="password" />
                          {form.formState.errors.password && (
                              <FormMessage type="error" className="italic">{form.formState.errors.password.message}</FormMessage>
                            )}
                          </>
                        )}
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm mb-2">NIP</Label>
                        <FormField
                        control={form.control}
                        name="nip"
                        render={({ field }) => (
                          <>
                            <Input {...field} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="121300" type="number" />
                            {form.formState.errors.nip && (
                              <FormMessage type="error" className="italic">{form.formState.errors.nip.message}</FormMessage>
                            )}
                          </>
                        )}
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm mb-2">Email</Label>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <>
                          <Input {...field} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="name@gmail.com" type="email" />
                          {form.formState.errors.email && (
                            <FormMessage type="error" className="italic">{form.formState.errors.email.message}</FormMessage>
                          )}
                          </>
                        )}
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm mb-2" htmlFor="department_id">Departemen</Label>
                        <FormField
                        control={form.control}
                        name="department_id"
                        render={({ field }) => (
                            <Select
                            value={field.value ? field.value.toString() : ""}
                            onValueChange={(value) => {
                                field.onChange(value); // Update react-hook-form state
                                setDepartmentId(value);
                            }}
                            {...field}
                            >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih departement untuk ditampilkan" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments?.map((department) => (
                                <SelectItem key={department.id} value={department.id.toString()}>{department.name}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        )}
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm mb-2" htmlFor="position_id">Posisi</Label>
                        <FormField
                        control={form.control}
                        name="position_id"
                        render={({ field }) => (
                            <Select
                            value={field.value ? field.value.toString() : ""}
                            onValueChange={(value) => {
                                field.onChange(value); // Update react-hook-form state
                                setPositionId(value);
                            }}
                            {...field}
                            >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih posisi untuk ditampilkan" />
                            </SelectTrigger>
                            <SelectContent>
                                {positions?.map((position) => (
                                <SelectItem key={position.id} value={position.id.toString()}>{position.name}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        )}
                        />
                    </div>
                    <div className="flex justify-end">
                    <Button
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
                        "Tambah Karyawan"
                      )}
                    </Button>
                    </div>
                    {/* Success Dialog */}
                    <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
                      <AlertDialogContent>
                      <AlertDialogTitle>Success</AlertDialogTitle>
                        <AlertDialogDescription>Aset has been created employee successfully!</AlertDialogDescription>
                        <AlertDialogAction onClick={() => router.push('/employee-management')}>OK</AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Error Dialog */}
                    <AlertDialog open={openError} onOpenChange={setOpenError}>
                      <AlertDialogContent>
                      <AlertDialogTitle>Error</AlertDialogTitle>
                        <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
                        <AlertDialogAction onClick={() => setOpenError(false)}>Close</AlertDialogAction>
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
