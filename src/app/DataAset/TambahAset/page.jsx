import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

export default function AddAset(){
    return(
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
                        <div className="mb-4">
                            <Label className="block text-sm mb-2">Kode aset</Label>
                            <Input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="A-827" type="text" />
                            <Label className="title text-muted-foreground text-xs">Untuk mengisi kode aset silahkan sesuaikan agar mudah ditemukan</Label>
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2" htmlFor="kategori">Kategori</Label>
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
                            <Label className="block text-sm mb-2" htmlFor="kategori">Kondisi</Label>
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
                            <Label className="block text-sm mb-2" htmlFor="hargaaset">Harga Asset</Label>
                            <Input placeholder="Rp. 129,000,000" type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <div className="w-full mr-2">
                                    <Label className="block text-sm mb-2" htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input placeholder="" type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                                        <button className="absolute top-0 right-0 mt-2 mr-3">
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full ml-2">
                                    <Label className="block text-sm mb-2" htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input placeholder="" type="password" id="confirmPassword" name="confirmPassword" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm mb-2" htmlFor="status">Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status untuk ditampilkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Aktif">Aktif</SelectItem>
                                    <SelectItem value="TidakAktif">Tidak Aktif</SelectItem>
                                    <SelectItem value="rusak">Rusak</SelectItem>
                                    <SelectItem value="Dipinjamkan">Dipinjamkan</SelectItem>
                                    <SelectItem value="DalamPemeliharaan">Dalam Pemeliharaan</SelectItem>
                                    <SelectItem value="DalamPenyimpanan">Dalam Penyimpanan</SelectItem>
                                    <SelectItem value="DalamPerbaikan">Dalam Perbaikan</SelectItem>
                                    <SelectItem value="Dalam Proses Peminjaman">Dalam Proses Peminjaman</SelectItem>
                                    <SelectItem value="Tidak Layak Pakai">Tidak Layak Pakai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 font-semibold rounded-lg" style={{ background: "#F9B421" }}>Tambah Aset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}