'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { acceptApplicant, denyApplicant, fetchApplicantDetail } from "@/app/apiService";
import { useParams, useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default function DetailPengajuan() {
  const [isDisetujuiDialogOpen, setIsDisetujuiDialogOpen] = useState(false)
  const [isDitolakDialogOpen, setIsDitolakDialogOpen] = useState(false)
  const { id } = useParams(); // Get id from the URL parameters
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [detail, setDetail] = useState(null);
  const [isActionCompleted, setActionCompleted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadDetail = async () => {
      if (token && id) {
        const response = await fetchApplicantDetail({ token, id });
        setDetail(response?.data);
        setActionCompleted(response?.data?.status === 'Disetujui' || response?.data?.status === 'Ditolak');
      }
    };

    loadDetail();
  }, [token, id]);

  const handleAccept = async () => {
    try {
      await acceptApplicant({ id, token });
      setActionCompleted(true); 
      router.push('/submission');
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };
  
  const handleDeny = async () => {
    try {
      await denyApplicant({ id, token });
      setActionCompleted(true);
      router.push('/submission');
    } catch (error) {
      console.error('Error denying applicant:', error);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <div className="py-4">
      <div className="w-full max-w-7xl mx-auto">
        <p className="title font-manrope font-bold text-2xl leading-10">Pengajuan Aset</p>
        <p className="text-muted-foreground text-sm mb-5">
          Pengajuan Aset - Detail aset
        </p>
        <hr className="mb-4" />
        <Card className="p-4 relative">
          {detail?.Images.length > 0 && (
            <div className="flex items-start mb-4">
              <div onClick={() => handleImageClick(0)} className="bg-gray-200 w-60 h-60 rounded-lg overflow-hidden cursor-pointer">
                <Image src={detail.Images[0]} alt="Image 1" width={240} height={240} className="w-full h-full object-cover" />
              </div>
              {detail?.Images.length > 1 && (
                <div className="flex flex-col space-y-2 ml-4">
                  {detail?.Images.slice(1, 3).map((image, index) => (
                    <div key={index} onClick={() => handleImageClick(index + 1)} className="bg-gray-200 w-28 h-28 rounded-lg overflow-hidden cursor-pointer">
                      <Image src={image} alt={`Image ${index + 2}`} width={112} height={112} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="flex flex-col items-center justify-center">
              <Image src={detail?.Images[selectedImageIndex]} alt={`Selected Image ${selectedImageIndex + 1}`} className="w-full h-60 object-cover rounded-lg mb-4" width={600} height={240} />
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-sm"
              >
                <CarouselContent>
                  {detail?.Images.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Image src={image} alt={`Carousel Image ${index + 1}`} width={240} height={240} className="w-full h-full object-cover cursor-pointer" onClick={() => setSelectedImageIndex(index)} />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <div className="col-span-1">
              <Label className="text-sm">Nama Aset</Label>
              <p className="font-semibold text-sm">{detail?.NameAsset}</p>
            </div>
            <div className="col-span-1">
              <Label className="text-sm">Kategori</Label>
              <p className="font-semibold text-sm">{detail?.Category}</p>
            </div>
            <div className="col-span-1">
              <Label className="text-sm">Tanggal Pengajuan</Label>
              <p className="font-semibold text-sm">{new Date(detail?.SubmissionDate).toLocaleDateString()}</p>
            </div>
            <div className="col-span-1">
              <Label className="text-sm">Tanggal Masa Habis</Label>
              <p className="font-semibold text-sm">{new Date(detail?.ExpiryDate).toLocaleDateString()}</p>
            </div>
            <div className="col-span-1">
              <Label className="text-sm">Pengaju</Label>
              <p className="font-semibold text-sm">{detail?.UserApplicants}</p>
            </div>
            <div className="col-span-1">
              <Label className="text-sm">Tipe</Label>
              <p className="font-semibold text-sm">{detail?.type}</p>
            </div>
            <div className="col-span-1">
              <Label className="text-sm">Status</Label>
              <p className="font-semibold text-sm">{detail?.status}</p>
            </div>
          </div>
          <div className="flex space-x-2 absolute right-4 bottom-4">
            <Button variant="outline" onClick={() => setIsDitolakDialogOpen(true)} style={{ display: isActionCompleted ? 'none' : 'inline-block', border: 'none', color: '#F9B421' }}>Tolak</Button>
            <Button variant="outline" onClick={() => setIsDisetujuiDialogOpen(true)} style={{ display: isActionCompleted ? 'none' : 'inline-block', backgroundColor: "#F9B421" }}>Setujui</Button>
            <AlertDialog open={isDisetujuiDialogOpen} onClose={() => setIsDisetujuiDialogOpen(false)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda bisa saja ingin menolak pengajuan ini
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsDisetujuiDialogOpen(false)}>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAccept}>Ya</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={isDitolakDialogOpen} onClose={() => setIsDitolakDialogOpen(false)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda bisa saja ingin menyetujui pengajuan ini
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsDitolakDialogOpen(false)}>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeny}>Ya</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>
    </div>
  );
}
