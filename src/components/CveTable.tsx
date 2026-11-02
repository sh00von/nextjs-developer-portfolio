"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";

export interface CveItem {
  id: string;
  href: string;
  title: string;
  plugin: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  cvss: string;
  disclosed: string;
  description: string;
}

const columnHelper = createColumnHelper<CveItem>();

export function CveTable({ data }: { data: CveItem[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "severity", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("ALL");

  const filteredData = useMemo(() => {
    if (severityFilter === "ALL") return data;
    return data.filter((item) => item.severity === severityFilter);
  }, [data, severityFilter]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "CVE ID",
        cell: (info) => (
          <Link
            href={info.row.original.href}
            className="font-mono text-xs sm:text-sm font-semibold text-[#111111] hover:underline decoration-lime-500"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("plugin", {
        header: "Plugin",
        cell: (info) => (
          <span className="text-xs sm:text-sm font-medium text-[#111111]">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("title", {
        header: "Vulnerability Title",
        cell: (info) => (
          <div className="max-w-md">
            <Link
              href={info.row.original.href}
              className="text-xs sm:text-sm font-medium text-[#111111] hover:text-[#5c5c5c] transition-colors"
            >
              {info.getValue()}
            </Link>
            <p className="line-clamp-2 text-xs text-[#737373] mt-0.5">
              {info.row.original.description}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("severity", {
        header: "Severity",
        cell: (info) => {
          const sev = info.getValue();
          const cvss = info.row.original.cvss;
          const isHigh = sev === "HIGH";
          const isLow = sev === "LOW";

          return (
            <span
              className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={
                isHigh
                  ? { background: "#fef2f2", color: "#991b1b", borderColor: "#fca5a5" }
                  : isLow
                    ? { background: "#f0f9ff", color: "#0369a1", borderColor: "#bae6fd" }
                    : { background: "#fffbeb", color: "#92400e", borderColor: "#fcd34d" }
              }
            >
              {sev} {cvss}
            </span>
          );
        },
        sortingFn: (rowA, rowB) => {
          const cvssA = parseFloat(rowA.original.cvss) || 0;
          const cvssB = parseFloat(rowB.original.cvss) || 0;
          return cvssA - cvssB;
        },
      }),
      columnHelper.accessor("disclosed", {
        header: "Disclosed",
        cell: (info) => (
          <span className="text-xs text-[#737373] whitespace-nowrap">
            {info.getValue()}
          </span>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const highCount = data.filter((d) => d.severity === "HIGH").length;
  const mediumCount = data.filter((d) => d.severity === "MEDIUM").length;
  const lowCount = data.filter((d) => d.severity === "LOW").length;

  return (
    <div className="space-y-4">
      {/* Search & Severity Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-md">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a3a3a3]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search CVEs, plugins, severity, keywords..."
            className="h-11 w-full rounded-full border border-[var(--border)] bg-white pl-9 pr-4 text-base text-[var(--text)] placeholder-[#a1a1aa] outline-none transition-all focus:border-[var(--text)] sm:text-sm"
          />
        </div>

        {/* Severity Filter Buttons */}
        <div className="no-scrollbar -mx-5 flex items-center gap-1.5 overflow-x-auto px-5 text-xs sm:mx-0 sm:flex-wrap sm:px-0">
          {[
            { id: "ALL", label: `All (${data.length})` },
            { id: "HIGH", label: `High (${highCount})` },
            { id: "MEDIUM", label: `Medium (${mediumCount})` },
            { id: "LOW", label: `Low (${lowCount})` },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setSeverityFilter(btn.id)}
              className={`pill ${severityFilter === btn.id ? "active" : ""}`}
              aria-pressed={severityFilter === btn.id}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile card list */}
      <ul className="space-y-3 sm:hidden">
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => {
            const item = row.original;
            const sevClass =
              item.severity === "HIGH"
                ? "bg-red-50 text-red-700 border-red-200"
                : item.severity === "LOW"
                  ? "bg-sky-50 text-sky-700 border-sky-200"
                  : "bg-amber-50 text-amber-800 border-amber-200";
            return (
              <li key={row.id}>
                <Link href={item.href} className="card block p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[13px] font-semibold text-[var(--text)]">{item.id}</span>
                    <span className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${sevClass}`}>
                      {item.severity} {item.cvss}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] font-semibold leading-snug text-[var(--text)]">{item.title}</p>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-[var(--muted-2)]">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted-3)]">
                    <span className="truncate pr-3">{item.plugin}</span>
                    <span className="shrink-0 font-mono">{item.disclosed}</span>
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <li className="card p-6 text-center text-xs text-[var(--muted-3)]">
            No CVE records found matching your search query.
          </li>
        )}
      </ul>

      {/* TanStack Table Container */}
      <div className="hidden overflow-x-auto rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-sm)] sm:block">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-[#e5e5e5] bg-[#f9f9f9] text-[11px] font-semibold uppercase tracking-wider text-[#737373]"
              >
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`px-4 py-3 select-none ${
                        canSort ? "cursor-pointer hover:text-[#111111]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSorted === "asc" ? (
                          <span className="text-xs text-[#111111]">↑</span>
                        ) : isSorted === "desc" ? (
                          <span className="text-xs text-[#111111]">↓</span>
                        ) : canSort ? (
                          <span className="text-[10px] text-[#a3a3a3]">↕</span>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="group transition-colors hover:bg-[#f9f9f9]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5 align-top">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-xs text-[#737373]"
                >
                  No CVE records found matching your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-[#737373] px-1">
        <span>
          Showing {table.getRowModel().rows.length} of {data.length} disclosures
        </span>

      </div>
    </div>
  );
}
