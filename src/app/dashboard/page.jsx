"use client";
import { Button } from "@/components/ui/button";
import { Activity, CalendarIcon, CreditCard, DollarSign, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard from "@/components/SalesCard";
import { fetchDashboard } from "../apiService";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [cardData, setCardData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { data: session } = useSession();
  const [nearest, setNearest] = useState([]);
  const token = session?.user?.token;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboard({ token });
        setCardData([
          {
            label: "Jumlah Aset",
            amount: data.total_assets.toString(),
          },
          {
            label: "Total Aset Aktif",
            amount: data.total_active_assets.toString(),
          },
          {
            label: "Aset Rusak",
            amount: data.total_damaged_assets.toString(),
          },
          {
            label: "Aset Dipinjamkan",
            amount: data.total_loaned_assets.toString(),
          }
        ]);
        setChartData(data.asset_category.map(category => ({
          category: category.category,
          total_category: category.total_category,
        })));
        setNearest(data.nearest_return);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    if (token) {
      loadData();
    }
  }, [token]);

  return (
    <div className="py-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <p className="title font-manrope font-bold text-2xl leading-10">Dashboard</p>
        </div>
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 mb-4">
          {cardData.map((d, i) => (
            <Card
              key={i}
              amount={d.amount}
              label={d.label}
            />
          ))}
        </section>
        <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-5">
          <CardContent className="lg:col-span-3">
            <p className="p-4 font-semibold">Kategori Aset</p>
            <BarChart data={chartData} />
          </CardContent>
          <CardContent className="lg:col-span-2 flex flex-col gap-4">
            <section>
              <p className="text-base font-bold">Pengembalian Terdekat</p>
              <p className="text-sm text-gray-400">
                Terdapat 5 pengembalian terdekat
              </p>
            </section>
            <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide"
                  style={{ maxHeight: '400px' }}>
              {nearest?.map((d, i) => (
                <SalesCard
                  key={i}
                  expiry_date={d.expiry_date}
                  name={d.name}
                  assetname={d.assetname}
                />
              ))}
            </div>
          </CardContent>
        </section>
      </div>
    </div>
  );
}
