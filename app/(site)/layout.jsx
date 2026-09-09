import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default async function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
