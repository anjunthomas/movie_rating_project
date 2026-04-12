import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, createColumnHelper, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import {Hash, Star, BookType, Earth, ArrowUpDown, Search, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from "lucide-react";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("movie_title", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <BookType className="mr-2" size={16}/> Movie Title
      </span>
    )
  }),

  columnHelper.accessor("num_ratings", {
    cell: (info) => info.getValue(),
    header: () => (
     <span className="flex items-center">
        <Hash className="mr-2" size={16}/> Number of Ratings
      </span>
    )
  }),

  columnHelper.accessor("avg_rating", {
    cell: (info) => info.getValue(),
    header: () => (
     <span className="flex items-center">
        <Star className="mr-2" size={16}/> Average Rating
      </span>
    )
  }),
];

const countryColumns = [
  columnHelper.accessor("country_nm", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Earth className="mr-2" size={16}/> Country
      </span>
    )
  }),
  columnHelper.accessor("avg_rating", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Star className="mr-2" size={16}/> Avg Rating
      </span>
    )
  }),
];

export default function ReportsPage(){
  const [data, setData] = React.useState([]);
  const [countryData, setCountryData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [activeReport, setActiveReport] = React.useState('movies');

  React.useEffect(() => {
    fetch('http://localhost:3000/reports/movies')
      .then((res) => res.json())
      .then((reports) => setData(reports));
  }, []);

  React.useEffect(() => {
  fetch('http://localhost:3000/reports/countries')
    .then((res) => res.json())
    .then((countries) => setCountryData(countries));
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  const countryTable = useReactTable({
    data: countryData,
    columns: countryColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const renderPagination = (t) => (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
      <div className="flex items-center mb-4 sm:mb-0">
        <span className="mr-2">Items per page</span>
        <select
          className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          value={t.getState().pagination.pageSize}
          onChange={(e) => t.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>{pageSize}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50" onClick={() => t.setPageIndex(0)} disabled={!t.getCanPreviousPage()}><ChevronsLeft size={20} /></button>
        <button className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50" onClick={() => t.previousPage()} disabled={!t.getCanPreviousPage()}><ChevronLeft size={20} /></button>
        <span className="flex items-center">
          <input
            min={1} max={t.getPageCount()} type="number"
            value={t.getState().pagination.pageIndex + 1}
            onChange={(e) => { const page = e.target.value ? Number(e.target.value) - 1 : 0; t.setPageIndex(page); }}
            className="w-16 p-2 rounded-md border border-gray-300 text-center"
          />
          <span className="ml-1">of {t.getPageCount()}</span>
        </span>
        <button className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50" onClick={() => t.nextPage()} disabled={!t.getCanNextPage()}><ChevronRight size={20} /></button>
        <button className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50" onClick={() => t.setPageIndex(t.getPageCount() - 1)} disabled={!t.getCanNextPage()}><ChevronsRight size={20} /></button>
      </div>
    </div>
  );

  const renderTable = (t) => (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {t.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div {...{ className: header.column.getCanSort() ? "cursor-pointer select-none flex items-center" : "", onClick: header.column.getToggleSortingHandler() }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && <ArrowUpDown className="ml-2" size={14} />}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {t.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveReport('movies')}
          className={`px-4 py-1.5 rounded text-sm ${activeReport === 'movies' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          By Movie
        </button>
        <button
          onClick={() => setActiveReport('countries')}
          className={`px-4 py-1.5 rounded text-sm ${activeReport === 'countries' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          By Country
        </button>
      </div>

      {activeReport === 'movies' && (
        <>
          <div className="mb-4 relative">
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {renderTable(table)}
          {renderPagination(table)}
        </>
      )}

      {activeReport === 'countries' && (
        <>
          {renderTable(countryTable)}
          {renderPagination(countryTable)}
        </>
      )}
    </div>
  );
}