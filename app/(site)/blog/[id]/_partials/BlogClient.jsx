"use client";
import React, { useEffect } from "react";
import {
  Calendar,
  Heart,
  Share2,
  MessageCircle,
  Tag,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { formatToSolarDate } from "@/utils/FormatDate";
import ReadingTime from "@/utils/ReadingTime";
import SpinnerLoading from "@/components/shared/SpinnerLoading";
import { UseBlogPageManager } from "@/hooks/useBlogPageManager";
import Image from "next/image";
import { getCategoryName } from "@/utils/categoriesHelper";

const BlogClient = ({
  initialBlogDetails,
  initialBlogs,
  initialComments,
  initialCategories,
}) => {
  const {
    suggestedBlogs,
    handleSubmit,
    setNewComment,
    newComment,
    isPending,
    comments,
  } = UseBlogPageManager(initialBlogDetails, initialBlogs, initialComments);

  useEffect(() => {
    console.log(newComment);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-iransans-edit">
      {/* Hero section with cover image */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-5 right-5 mx-auto max-w-4xl px-4 pt-6 z-50"
        >
          <button className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group cursor-pointer">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            بازگشت به صفحه اصلی
          </button>
        </Link>

        <div className="absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${initialBlogDetails.image}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fill
            alt={initialBlogDetails.title}
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm mb-4">
              <span>{getCategoryName(initialBlogDetails.categoryId)}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight font-iransans-bold">
              {initialBlogDetails.title}
            </h1>

            {/* Author & Meta info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2 font-iransans-bold">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden font-bold">
                  {initialBlogDetails?.author?.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white">
                    {initialBlogDetails.author}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatToSolarDate(initialBlogDetails.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  456 بازدید
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto w-full px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main article */}
          <article className="lg:flex-1">
            <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 text-center">
              <div className="pb-2 border-b border-gray-700 flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-2 py-1 bg-gray-800/50 rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-colors group">
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>پسندیدن</span>
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 bg-gray-800/50 rounded-lg hover:bg-green-600/20 hover:text-green-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>اشتراک‌ گذاری</span>
                  </button>
                </div>
                <span className="flex items-center gap-1">
                  زمان مطالعه: {ReadingTime(initialBlogDetails.content)}
                </span>
              </div>

              <p className="text-start pt-4 whitespace-pre-line font-medium">
                {initialBlogDetails.content}
              </p>

              {/* Categories section */}
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-400" />
                  <span className="">برچسب‌ها:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300 hover:bg-purple-600/50 hover:border-purple-500 transition-all duration-300 cursor-pointer">
                    {getCategoryName(
                      initialCategories,
                      initialBlogDetails.categoryId,
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="mt-12 pt-8 border-t border-gray-700/50">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-400" />
                نظرات ({comments?.length || 0})
              </h3>

              {/* Comment form */}
              <div className="mb-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="نظر خود را بنویسید..."
                    rows="4"
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="mt-3 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {!isPending ? (
                      "ارسال نظر"
                    ) : (
                      <SpinnerLoading width="w-6" height="h-6" />
                    )}
                  </button>
                </form>
              </div>

              {/* Comments list */}
              <div className="space-y-4">
                {comments?.length > 0 ? (
                  comments.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          {item.author?.charAt(0) || "ن"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white">
                              {item.author || "نویسنده نظر"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatToSolarDate(item.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm font-iransans-bold">
                            {item.content}
                          </p>
                          <button className="mt-2 text-xs text-purple-400 hover:text-purple-300">
                            پاسخ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهید!
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex flex-col gap-4">
            {/* Featured blog */}
            {suggestedBlogs.length > 0 && (
              <Link href={`/blog/${suggestedBlogs[0].id}`}>
                <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 text-center hover:bg-gray-800/50 transition-all duration-300">
                  <h3 className="text-start text-xl mb-2">مقاله ویژه</h3>
                  <div className="h-32 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${suggestedBlogs[0]?.image}`}
                      className="bg-cover line-clamp-1"
                      width={300}
                      height={350}
                      alt={suggestedBlogs[0]?.title}
                      quality={80}
                    />
                  </div>
                  <h4 className="text-lg font-bold line-clamp-1">
                    {suggestedBlogs[0]?.title}
                  </h4>
                </div>
              </Link>
            )}

            {/* Related blogs */}
            <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <h4 className="text-lg mb-4 flex items-center gap-2">
                <span>مقالات مرتبط</span>
              </h4>
              <div className="space-y-4">
                {suggestedBlogs.length > 0 &&
                  suggestedBlogs.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group block"
                    >
                      <div className="flex gap-3">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${post?.image}`}
                          className="rounded-lg object-cover group-hover:opacity-80 transition-opacity line-clamp-1"
                          width={80}
                          height={80}
                          alt={post.title}
                          quality={80}
                        />
                        <div className="flex-1">
                          <h5 className="text-sm font-semibold group-hover:text-purple-400 transition-colors line-clamp-2">
                            {post.title}
                          </h5>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatToSolarDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogClient;
