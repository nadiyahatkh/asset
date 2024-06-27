import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Label } from "@/components/ui/label";

export default function DetailPengajuanAset() {
    return (
        <div className="py-4">
            <div className="w-full max-w-7xl mx-auto">
                <p className="title font-manrope font-bold text-2xl leading-10">Pengajuan Aset</p>
                <p className="text-muted-foreground text-sm mb-5">
                    Pengajuan Aset - Detail aset
                </p>
                <hr className="mb-4" />
                <Card className="p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex">
                                <div className="bg-gray-200 w-60 h-60"></div> {/* Increased size */}
                                <div className="flex flex-col space-y-2 ml-2">
                                    <div className="bg-gray-200 w-28 h-28"></div>
                                    <div className="bg-gray-200 w-28 h-28"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                <div className="col-span-1 md:col-span-1">
                                    <label className="text-sm">Nama Aset</label>
                                    <p className="font-semibold text-sm">Macbook Air M1 2020</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                    <label className="text-sm">Kategori</label>
                                    <p className="font-semibold text-sm">Laptop</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <label className="text-sm">Tanggal Pengajuan</label>
                                     <p className="font-semibold text-sm">12-12-2024</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <label className="text-sm">Tanggal Masa Habis</label>
                                     <p className="font-semibold text-sm">12-12-2024</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <label className="text-sm">Pengaju</label>
                                     <p className="font-semibold text-sm">Olivia</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <label className="text-sm">Tipe</label>
                                     <p className="font-semibold text-sm">peminjaman</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <label className="text-sm">Status</label>
                                     <p className="font-semibold text-sm">Belum di setjui</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}


