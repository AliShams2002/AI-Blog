"use client";
import React from "react";
import { ChevronLeft, ChevronRight, Search, Plus } from "lucide-react";
import Link from "next/link";
import SpinnerLoading from "../shared/SpinnerLoading";
import { useTableManager } from "@/hooks/useTableManager";

const ReusableTable = ({
  columns,
  data,
  blogs,
  categories,
  title,
  showSearch = true,
  showFilter = true,
  selectBoxData,
  showPagination = true,
  itemsPerPage = 5,
  onRowClick,
  onAdd,
  onEdit,
  onDelete,
  onView,
  customActions,
  searchPlaceholder = "جستجو...",
  emptyMessage = "هیچ داده‌ای یافت نشد",
  className = "",
}) => {
  const {
    searchTerm,
    setSearchTerm,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    filteredData,
    totalPages,
    startIndex,
    paginatedData,
    goToPage,
    renderCell,
  } = useTableManager({ data, itemsPerPage, blogs, categories });

  return (
    <div
      className={`bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden ${className}`}
    >
      {/* Header with Title, Search, selectbox & add btn */}
      {(title || showSearch) && (
        <div className="p-4 border-b border-gray-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}

          <div className="flex gap-2 w-full sm:w-auto">
            {showSearch && (
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm text-white placeholder-gray-500"
                />
              </div>
            )}
            {selectBoxData && (
              <select
                name=""
                id=""
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm text-white placeholder-gray-500"
              >
                <option value="all">همه</option>
                {selectBoxData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            )}
            {onAdd && (
              <button
                onClick={onAdd}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                مقاله جدید
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700 bg-gray-800/20">
            <tr className="text-right text-sm text-gray-400">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`pb-3 pt-3 px-4 text-left`}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-1 justify-start">
                    {column.label}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView || customActions) && (
                <th className="pb-3 pt-3 px-4 text-right">عملیات</th>
              )}
            </tr>
          </thead>

          <tbody>
            {/* Spinner loading */}
            {isLoading ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (onEdit || onDelete || onView || customActions ? 1 : 0)
                  }
                  className="py-3 text-center text-gray-400"
                >
                  <SpinnerLoading width="v-8" height="h-8" />
                </td>
              </tr>
            ) : (
              <>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr
                      key={item.id || index}
                      onClick={() => onRowClick?.(item)}
                      className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="py-3 px-4 text-sm text-gray-300 max-w-40 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {renderCell(item, column)}
                        </td>
                      ))}
                      {/* Operations cell */}
                      {(onEdit || onDelete || onView || customActions) && (
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {onView && (
                              <Link
                                href={`/blog/${item.articleId ? item.articleId : item.id}`}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onView(item);
                                  }}
                                  className="p-1 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                                  title="مشاهده"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </button>
                              </Link>
                            )}
                            {onEdit && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEdit(item);
                                }}
                                className="p-1 text-green-400 hover:text-green-300 transition-colors cursor-pointer"
                                title="ویرایش"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(item.id);
                                }}
                                className="p-1 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                title="حذف"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            )}
                            {customActions?.(item)}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  // Empty message if data is null
                  <tr>
                    <td
                      colSpan={
                        columns.length +
                        (onEdit || onDelete || onView || customActions ? 1 : 0)
                      }
                      className="py-3 text-center text-gray-400"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="p-4 border-t border-gray-700/50 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            نمایش {startIndex + 1} تا{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} از{" "}
            {filteredData.length} نتیجه
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                      currentPage === pageNum
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800/50 border border-gray-700 text-gray-400 hover:bg-gray-700/50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
