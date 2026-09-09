"use client";

import Link from "next/link";
import {
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowUpRight,
  X,
} from "lucide-react";
import SpinnerLoading from "@/components/shared/SpinnerLoading";
import React from "react";
import ReadingTime from "@/utils/ReadingTime";
import { formatToSolarDate } from "@/utils/FormatDate";
import BlogCard from "@/components/shared/BlogCard";
import Image from "next/image";
import { getCategoryName } from "@/utils/categoriesHelper";

const Blogs = ({
  initialCategories,
  getCatById,
  featuredBlog,
  filteredBlogs,
  isLoading,
  searchTerm,
  setCurrentPage,
  currentPage,
  totalPages,
  resetFilter,
  paginatedBlogs,
}) => {
  return (
    <>
      {/* Featured blog section */}
      {featuredBlog && (
        <section className="container mx-auto px-4 py-12">
          <Link href={`/blog/${featuredBlog.id}`}>
            <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${featuredBlog.image}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    fill
                    alt={featuredBlog.title}
                    quality={80}
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full font-medium">
                    ویژه
                  </div>
                </div>

                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredBlog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatToSolarDate(featuredBlog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {ReadingTime(featuredBlog.content)}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                    {featuredBlog.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-lg">
                        {getCategoryName(
                          initialCategories,
                          featuredBlog.categoryId,
                        )}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-2 transition-all">
                      مطالعه مقاله
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blogs grid section */}
      <section className="container mx-auto px-4 py-2">
        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              تمام مقالات
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {!isLoading && filteredBlogs.length} مقاله یافت شد
            </p>
          </div>
          {searchTerm && (
            <button
              onClick={() => resetFilter()}
              className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              پاک کردن جستجو
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="w-full h-full text-center pt-8">
            <SpinnerLoading width="v-8" height="h-8" />
          </div>
        ) : (
          <>
            {/* Blogs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBlogs.map((article) => (
                <BlogCard
                  key={article.id}
                  article={article}
                  categories={initialCategories}
                />
              ))}
            </div>
            {/* No results */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  مقاله‌ای یافت نشد
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  با تغییر فیلترها یا جستجوی جدید، مقالات را پیدا کنید
                </p>
                <button
                  onClick={() => {
                    resetFilter();
                  }}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  نمایش همه مقالات
                </button>
              </div>
            )}
            {/* Pagenation */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

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
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/30"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Blogs;
