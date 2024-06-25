import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

export default function AddEmployee(){
    return(
        <div className="py-4">
            <div className="w-full max-w-7xl mx-auto">
                <p className="title font-manrope font-bold text-2xl leading-10">Manajemen Karyawan</p>
                <p className="title text-muted-foreground text-sm mb-5">Here's a list of your employe.</p>
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
                        <div className="mb-4">
                            <Label className="block text-sm mb-2">Nama Karyawan</Label>
                            <Input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Alicia" type="text" />
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2">NIP</Label>
                            <Input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="121300" type="number" />
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2">Email</Label>
                            <Input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="name@gmail.com" type="email" />
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2" htmlFor="departemen">Departemen</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih departemen untuk ditampilkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kategori1">Kategori 1</SelectItem>
                                    <SelectItem value="kategori2">Kategori 2</SelectItem>
                                    <SelectItem value="kategori3">Kategori 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2" htmlFor="posisi">Posisi</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih posisi untuk ditampilkan" />
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
                        <div className="flex justify-end">
                            <button className="px-4 py-2 font-semibold rounded-lg" style={{ background: "#F9B421" }}>Tambah Karyawan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}