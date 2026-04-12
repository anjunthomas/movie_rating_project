
import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, createColumnHelper } from "@tanstack/react-table";
import {User, Earth, Calendar1, BookType } from "lucide-react";
import { MOVIES } from '../data/mockData'

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("mid", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16}/> MID
      </span>
    )
  }),
  

  columnHelper.accessor("movie_title", {
    cell: (info) => info.getValue(),
    header: () => (
     <span className="flex items-center">
        <BookType className="mr-2" size={16}/> Movie Title
      </span>
    )
  }),

  columnHelper.accessor("release_dt", {
    cell: (info) => info.getValue(),
    header: () => (
     <span className="flex items-center">
        <Calendar1 className="mr-2" size={16}/> Release Date
      </span>
    )
  }),

  columnHelper.accessor("og_language", {
    cell: (info) => info.getValue(),
    header: () => (
     <span className="flex items-center">
        <Earth className="mr-2" size={16}/> Original Language
      </span>
    )
  }),
];

export default function MoviesPage(){
  const [data] = React.useState(() => [...MOVIES]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log(table.getHeaderGroups());

  return ( <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className= "overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>

                    </th>
                  ))}
                </tr>
              ))
            }
          </thead>
        </table>
      </div>
    </div>
  );
}