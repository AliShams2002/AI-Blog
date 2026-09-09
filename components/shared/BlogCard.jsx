import { getCategoryName } from "@/utils/categoriesHelper";
import { formatToSolarDate } from "@/utils/FormatDate";
import ReadingTime from "@/utils/ReadingTime";
import {
  ArrowUpRight,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Share2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ article, categories }) => {
  return (
    article && (
      <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${article?.image}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fill
            loading="lazy"
            alt={article.title}
            quality={80}
          />
          <span className="absolute top-3 left-3 px-1 py-1 p-1.5 rounded-full bg-purple-300/10 dark:hover:bg-purple-900 text-white transition-all group/bookmark cursor-pointer">
            <Bookmark className="w-4 h-4 text-gray-400 group-hover/bookmark:text-purple-500 transition-colors" />
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatToSolarDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{ReadingTime(article.content)} دقیقه</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            <Link href={`/blog/${article.id}`}>{article.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {article.content}
          </p>

          {/* category */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
              {getCategoryName(categories, article.categoryId)}
            </span>
          </div>

          {/* Footer */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <Link
              href={`/blog/${article.id}`}
              className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-2 transition-all"
            >
              مطالعه مقاله
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="flex gap-2 ">
              <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group/like cursor-pointer">
                <Heart className="w-4 h-4 text-gray-400 group-hover/like:text-red-500 transition-colors" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group/share cursor-pointer">
                <Share2 className="w-4 h-4 text-gray-400 group-hover/share:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </article>
    )
  );
};

export default BlogCard;
