'use client'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { fetchDetailApplicantUser } from "@/app/apiService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import Image from "next/image";

export default function DetailPengajuanAset() {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [detail, setDetail] = useState();
    const { id } = useParams();

    useEffect(() => {
        const loadDetail = async () => {
          if (token && id) {
            const response = await fetchDetailApplicantUser({ token, id });
            setDetail(response?.data);
          }
        };
    
        loadDetail();
      }, [token, id]);

    return (
        <div className="py-4">
            <div className="w-full max-w-7xl mx-auto">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-black leading-10 " >Home</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <hr className="mb-4" />
                <p className="title font-manrope font-bold text-2xl leading-10">Pengajuan Aset</p>
                <p className="text-muted-foreground text-sm mb-5">
                    Pengajuan Aset - Detail aset
                </p>
                <hr className="mb-4" />
                <Card className="p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                        <div className="flex">
                        {detail?.Images.length > 0 && (
                            <div className="bg-gray-200 w-60 h-60 rounded-lg overflow-hidden">
                                <Image src={detail.Images[0]} alt="Image 1" width={240} height={240} className="w-full h-full object-cover" />
                            </div>
                            )}
                            {detail?.Images.length > 1 && (
                            <div className="flex flex-col space-y-2 ml-2">
                                {detail?.Images.slice(1, 3).map((image, index) => (
                                <div key={index} className="bg-gray-200 w-28 h-28 rounded-lg overflow-hidden">
                                    <Image src={image} alt={`Image ${index + 2}`} width={112} height={112} className="w-full h-full object-cover" />
                                </div>
                                ))}
                            </div>
                            )}
                        </div>
                        </div>
                        <div className="flex-grow px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <div className="col-span-1 md:col-span-1">
                                <Label className="text-sm">Nama Aset</Label>
                                <p className="font-semibold text-sm">{detail?.NameAsset}</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <Label className="text-sm">Kategori</Label>
                                <p className="font-semibold text-sm">{detail?.Category}</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <Label className="text-sm">Tanggal Pengajuan</Label>
                                <p className="font-semibold text-sm">{new Date(detail?.SubmissionDate).toLocaleDateString()}</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <Label className="text-sm">Tanggal Masa Habis</Label>
                                <p className="font-semibold text-sm">{new Date(detail?.ExpiryDate).toLocaleDateString()}</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <Label className="text-sm">Pengaju</Label>
                                <p className="font-semibold text-sm">{detail?.UserApplicants}</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <Label className="text-sm">Tipe</Label>
                                <p className="font-semibold text-sm">{detail?.type}</p>
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                <Label className="text-sm">Status</Label>
                                <p className="font-semibold text-sm">{detail?.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}


