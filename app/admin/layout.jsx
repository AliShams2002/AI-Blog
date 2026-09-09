import LayoutContent from "./LayoutContent";

export default async function AdminLayout({ children }) {
  return (
    <div className="font-iransans-edit" dir="rtl">
      {/* Protect all admin routes - redirect to login if not authenticated */}
      <LayoutContent>{children}</LayoutContent>
    </div>
  );
}
