import React from 'react';
import { format } from 'date-fns';

export default function SalesCard(props) {
  const formattedDate = format(new Date(props.expiry_date), 'dd-MM-yyyy');

  return (
    <div className="flex justify-between gap-3">
      <section className="flex gap-3 m-2">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${props.name}`}
            alt="avatar"
          />
        </div>
        <div className="text-sm">
          <p className='font-semibold'>{props.name}</p>
          <div className="flex items-center text-gray-400">
            <span>Masa habis pakai : </span>
            <span className='text-black ml-1'>{formattedDate}</span>
          </div>
        </div>
      </section>
      <p>{props.assetname}</p>
    </div>
  );
}
