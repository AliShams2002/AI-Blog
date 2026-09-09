import RecentActivitycard from "@/components/admin/RecentActivitycard";
import { blogNameHelper } from "@/utils/blogNameHelper";
import { formatToSolarDate } from "@/utils/FormatDate";
import {
  FileText,
  FolderOpen,
  FolderTree,
  MessageSquare,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const RecentActivity = ({
  blogs,
  recentBlogs,
  comments,
  categories,
  users,
  getRoleColor,
  getRoleText,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Blogs Section */}
      <RecentActivitycard
        icon={<FileText className="w-4 h-4 text-purple-400" />}
        title="آخرین مقالات"
        href="/admin/blogs"
      >
        {/* Display last 3 blogs */}
        {recentBlogs.slice(0, 3).map((blog) => (
          <div
            key={blog.id}
            className="flex items-start gap-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${blog.image}`}
              className="rounded-lg object-cover line-clamp-1"
              width={50}
              height={50}
              quality={80}
              alt={blog.title}
            />
            <div className="flex-1">
              <p className="text-sm text-white font-medium line-clamp-1">
                {blog.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {blog.author} • {formatToSolarDate(blog.createdAt)}
              </p>
              <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                {blog.content.substring(0, 60)}...
              </p>
            </div>
          </div>
        ))}
      </RecentActivitycard>

      {/* Recent Comments Section */}
      <RecentActivitycard
        icon={<MessageSquare className="w-4 h-4 text-purple-400" />}
        title="آخرین نظرات"
        href="/admin/comments"
      >
        {/* Display last 3 comments */}
        {comments.slice(0, 3).map((comment) => (
          <div
            key={comment.id}
            className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-white">{comment.author}</p>
              <span className="text-xs text-gray-500">
                {formatToSolarDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-xs text-gray-400 line-clamp-1">
              {comment.content}
            </p>
            <p className="text-xs text-purple-400 mt-1 line-clamp-1">
              مقاله: {blogNameHelper(blogs, comment.articleId)}
            </p>
          </div>
        ))}
      </RecentActivitycard>

      {/* Recent Categories Section */}
      <RecentActivitycard
        icon={<FolderTree className="w-4 h-4 text-purple-400" />}
        title="آخرین دسته بندی‌ها"
        href="/admin/categories"
      >
        {/* Display last 3 categories */}
        {categories.slice(0, 3).map((category) => (
          <div
            key={category.id}
            className="p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FolderOpen className="w-3 h-3 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-white line-clamp-1">
                  {category.title}
                </p>
                <p className="text-xs text-gray-400 line-clamp-1">
                  {category.description.substring(0, 40)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </RecentActivitycard>

      {/* Recent Users Section */}
      <RecentActivitycard
        icon={<Users className="w-4 h-4 text-purple-400" />}
        title="آخرین کاربران"
        href="/admin/users"
      >
        {/* Display last 3 users */}
        {users.slice(0, 3).map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user.username}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(user.role)}`}
              >
                {getRoleText(user.role)}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {formatToSolarDate(user.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </RecentActivitycard>
    </div>
  );
};

export default RecentActivity;
