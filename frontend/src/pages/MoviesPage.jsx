
import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, createColumnHelper, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import {User, Earth, Calendar1, BookType, ArrowUpDown, Search } from "lucide-react";
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
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  console.log(table.getHeaderGroups());

  return ( 
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-4 relative">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
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
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <ArrowUpDown className="ml-2" size={14} />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))
              }
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                table.getRowModel().rows.map(row => 
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
  );
}