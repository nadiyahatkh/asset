import React from 'react';

export default function SalesCard(props) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
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
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
            Masa habis pakai : <div className='text-black'>{props.date}</div>
          </div>
        </div>
      </section>
      <p>{props.merk}</p>
    </div>
  );
}
