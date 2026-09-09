import { getAllBlogs } from "@/services/BlogService";
import HomeClient from "./_partials/HomeClient";
import ErrorDisplay from "@/components/shared/ErrorDisplay";
import { getAllCategories } from "@/services/CategorieService";

export const metadata = {
  title: {
    default: "وبلاگ من | آموزش برنامه‌نویسی و تکنولوژی",
    template: "%s | وبلاگ من",
  },
  description:
    "جدیدترین مقالات آموزشی در حوزه برنامه‌نویسی، مدیریت، هوش مصنوعی و تکنولوژی.",
  keywords: [
    "برنامه‌نویسی",
    "طراحی وب",
    "هوش مصنوعی",
    "آموزش",
    "مقاله",
    "React",
    "Next.js",
    "Tailwind CSS",
    "JavaScript",
    "Python",
    "مدیریت پروژه",
    "تکنولوژی",
  ],
  authors: [
    { name: "وبلاگ من", url: "https://my-blog-ochre-sigma-12.vercel.app/" },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "وبلاگ من | آموزش برنامه‌نویسی و تکنولوژی",
    description:
      "به وبلاگ تخصصی برنامه‌نویسی خوش آمدید! جدیدترین مقالات آموزشی در حوزه React، Next.js، هوش مصنوعی و تکنولوژی‌های روز.",
    url: "https://my-blog-ochre-sigma-12.vercel.app/",
    siteName: "وبلاگ تخصصی برنامه‌نویسی",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "وبلاگ تخصصی برنامه‌نویسی",
      },
    ],
    locale: "fa_IR",
    type: "website",
    countryName: "ایران",
    emails: ["info@yourblog.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "وبلاگ من",
    description:
      "جدیدترین مقالات آموزشی در حوزه برنامه‌نویسی، مدیریت، هوش مصنوعی و تکنولوژی",
    images: ["/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://my-blog-ochre-sigma-12.vercel.app/",
  },
};

// Incremental static regeneration rendering (ISR)
export const revalidate = 30;

export default async function HomePage() {
  // Fetch data
  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
  ]);

  if (!blogs.success) return <ErrorDisplay error={blogs.error} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-iransans-edit pb-6">
      <HomeClient
        initialBlogs={blogs.data}
        initialCategories={categories.data}
      />
    </div>
  );
}
