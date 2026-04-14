
import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, createColumnHelper, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import {User, Earth, Calendar1, BookType, ArrowUpDown, Search, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from "lucide-react";

const columnHelper = createColumnHelper();

export default function MoviesPage( { uid }){
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 });
  const [totalRows, setTotalRows] = React.useState(0);
  const [debouncedFilter, setDebouncedFilter] = React.useState("");
  const [showRatingModal, setShowRatingModal] = React.useState(false);
  const [ratingMovie, setRatingMovie] = React.useState(null);
  const [ratingTitle, setRatingTitle] = React.useState('');
  const [newRating, setNewRating] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(globalFilter);
      setPagination(p => ({ ...p, pageIndex: 0 }));
    }, 300);
    return () => clearTimeout(timer);
  }, [globalFilter]);


  React.useEffect(() => {
  const offset = pagination.pageIndex * pagination.pageSize;
  fetch(`http://localhost:3000/movies?q=${debouncedFilter}&limit=${pagination.pageSize}&offset=${offset}`)
    .then((res) => res.json())
    .then(( { movies, total }) => {
      setData(movies),
      setTotalRows(total);
  });
}, [pagination, debouncedFilter]);

    const handleAddToWatchlist = (mid) => {
      fetch(`http://localhost:3000/users/${uid}/watchlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mid })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) alert('Added to watchlist!');
        else alert('Already in watchlist or error.');
      });
    };

    const handleSubmitRating = () => {
      if(!newRating) return alert('Please enter a rating.');
      fetch('http://localhost:3000/ratings', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uid, mid: ratingMovie, countryID: 1, rating: Number(newRating)})
      })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok){
          alert('Submitted rating!');
          setNewRating('');
          setShowRatingModal(false);
        }
      })
    }

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
      cell: (info) => info.getValue()?.split('T')[0],
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

    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <button
          onClick={() => handleAddToWatchlist(info.row.original.mid)}
          className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-900"
        >
          + Watchlist
        </button>
      ),
      header: () => <span>Actions</span>
    }),

    columnHelper.display({
      id: "rate",
      cell: (info) => (
        <button
          onClick={() => {
            setRatingMovie(info.row.original.mid)
            setRatingTitle(info.row.original.movie_title);
            setShowRatingModal(true);
          }}
          className="px-3 py-1 text-xs rounded bg-purple-600 text-white hover:bg-purple-900"
        >
          + Rating
        </button>
      ),
      header: () => <span>Rate</span>
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    
    getCoreRowModel: getCoreRowModel(),

    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    manualPagination: true,
    pageCount: Math.ceil(totalRows / pagination.pageSize),
  }); 

  return ( 
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {showRatingModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', width: '320px' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 500 }}>Rate Movie</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#666666' }}>{ratingTitle}</p>
            <input
              type="number"
              min="1" max="10"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              placeholder="Rating (from 1 to 10)"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmitRating}
                className="flex-1 px-4 py-2 text-sm rounded bg-gray-900 text-white hover:bg-gray-700"
              >
                Submit
              </button>
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
        <div className= "flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="mr-2">Items per page</span>
              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft size={20} />
                </button>

                <button
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="flex items-center">
                  <input
                    min={1}
                    max={table.getPageCount()}
                    type="number"
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      table.setPageIndex(page);
                    }}
                    className="w-16 p-2 rounded-md border border-gray-300 text-center"
                  />
                  <span className="ml-1">of {table.getPageCount()}</span>
                </span>

                <button
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight size={20} />
                </button>

                <button
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => table.setPageIndex(table.getPageCount() -1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight size={20} />
                </button>
            </div>
        </div>
      </div>
  );
}