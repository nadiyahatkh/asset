'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import Link from "next/link";
import { DataTable } from "@/components/managemenKaryawan-table/data-table";
import { columns } from "./columns";
import { Card } from "@/components/ui/card";
import { fetchEmployee, selectRemoveEmployee } from "../apiService";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function EmployeeManagement() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const employeeData = await fetchEmployee({ token, search, page, per_page: perPage });
        setData(employeeData.data.data);
        setTotalPages(employeeData.total_page)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (token) {
      loadData();
    }
  }, [token, search, page, perPage]);

  const deleteRow = (id) => {
    setData((prevData) => prevData.filter(item => item.id !== id))
  }

  const deleteRows = async (ids) => {
    try {
      const response = await selectRemoveEmployee({ ids, token });
      if (response) {
        setData((prevData) => prevData.filter(item => !ids.includes(item.id)));
      }
    } catch (error) {
      console.error('Failed to delete rows:', error);
    }
  };

    return (
        <div className="py-4">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              {/* Left section */}
              <div>
                <p className="title font-manrope font-bold text-2xl leading-10">Manajemen Karyawan</p>
                <p className="text-muted-foreground text-sm">
                    Here's a list of your employe.
                </p>
              </div>
              {/* Right section */}
              <div className="flex items-center space-x-4">
                {/* Add Asset Button */}
                <Button variant="solid" className="" style={{ background: "#F9B421" }}>
                    <Link href="./employee-management/add-employee">
                        Tambah Karyawan
                    </Link>
                </Button>
              </div>
            </div>
            <Card className="shadow-md">
              <div className="container mx-auto p-4">
                <DataTable 
                  columns={columns(deleteRow)} 
                  data={data} search={search} 
                  setSearch={setSearch} 
                  currentPage={page}
                  totalPages={totalPages}
                  setPage={setPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                  onDelete={deleteRows}
                  />
              </div>
            </Card>
          </div>
        </div>
    );
}
