'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { acceptApplicant, denyApplicant, fetchApplicantDetail } from "@/app/apiService";
import { useParams, useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function DetailPengajuan() {
  const [isDisetujuiDialogOpen, setIsDisetujuiDialogOpen] = useState(false)
  const [isDitolakDialogOpen, setIsDitolakDialogOpen] = useState(false)
  const { id } = useParams(); // Get id from the URL parameters
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [detail, setDetail] = useState(null);
  const [isActionCompleted, setActionCompleted] = useState(false);
  const router = useRouter()

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
      const result = await acceptApplicant({ id, token });
      console.log('Applicant accepted:', result);
      setActionCompleted(true); 
      setIsDisetujuiDialogOpen(false);
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };
  
  const handleDeny = async () => {
    try {
      const result = await denyApplicant({ id, token });
      console.log('Applicant denied:', result);
      setActionCompleted(true); // Set state to true after successful denial
      router.push('/submission');
    } catch (error) {
      console.error('Error denying applicant:', error);
    }
  };
  

  if (!detail) return <p>Loading...</p>;

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
                <div className="bg-gray-200 w-60 h-60">
                <img src={detail.Images[0]} alt="Image 1" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col space-y-2 ml-2">
                  <div className="bg-gray-200 w-28 h-28">
                  <img src={detail.Images[1]} alt="Image 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-gray-200 w-28 h-28">
                  <img src={detail.Images[2]} alt="Image 3" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div className="col-span-1 md:col-span-1">
                  <Label className="text-sm">Nama Aset</Label>
                  <p className="font-semibold text-sm">{detail.NameAsset}</p>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <Label className="text-sm">Kategori</Label>
                  <p className="font-semibold text-sm">{detail.Category}</p>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <Label className="text-sm">Tanggal Pengajuan</Label>
                  <p className="font-semibold text-sm">{new Date(detail.SubmissionDate).toLocaleDateString()}</p>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <Label className="text-sm">Tanggal Masa Habis</Label>
                  <p className="font-semibold text-sm">{new Date(detail.ExpiryDate).toLocaleDateString()}</p>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <Label className="text-sm">Pengaju</Label>
                  <p className="font-semibold text-sm">{detail.UserApplicants}</p>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <Label className="text-sm">Tipe</Label>
                  <p className="font-semibold text-sm">{detail.type}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsDitolakDialogOpen(true)}  style={{ display: isActionCompleted ? 'none' : 'inline-block', border: 'none', color: '#F9B421' }}>Tolak</Button>
                <Button variant="outline" onClick={() => setIsDisetujuiDialogOpen(true)}  style={{ display: isActionCompleted ? 'none' : 'inline-block', backgroundColor: "#F9B421" }}>Setujui</Button>
              {/* <Button variant="outline" onClick={handleDeny}>Tolak</Button>
              <Button variant="outline" onClick={handleAccept} >Setujui</Button> */}
                  <AlertDialog open={isDisetujuiDialogOpen} onClose={() => setIsDisetujuiDialogOpen(false)}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Anda Bisa Saja Ingin Tolak Pengajuan Ini
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
                        Anda Bisa Saja Ingin Mensetujui Pengajuan Ini
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setIsDitolakDialogOpen(false)}>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeny}>Ya</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
