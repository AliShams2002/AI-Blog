"use client";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import SpinnerLoading from "@/components/shared/SpinnerLoading";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  FolderTree,
  LayoutDashboard,
  MessageCircle,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const LayoutContent = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const pathName = usePathname();

  // Sidebar menu items
  const menuItems = [
    {
      id: "dashboard",
      href: "dashboard",
      label: "داشبورد",
      icon: LayoutDashboard,
    },
    { id: "blogs", href: "blogs", label: "مقالات", icon: FileText },
    {
      id: "comments",
      href: "comments",
      label: "نظرات",
      icon: MessageCircle,
    },
    {
      id: "categories",
      href: "categories",
      label: "دسته بندی‌ها",
      icon: FolderTree,
    },
    { id: "users", href: "users", label: "کاربران", icon: Users },
  ];

  // Update active tab based on current pathname
  const activeTab = useMemo(() => {
    if (!pathName) return;

    const currentPath = pathName.split("/").pop() || "dashboard";

    const foundItem = menuItems.find((item) => item.href === currentPath);
    return foundItem ? foundItem.id : "dashboard";
  }, [pathName, menuItems]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <SpinnerLoading width="v-6" height="h-6" />
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-scroll hide-scrollbar">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          menuItems={menuItems}
          activeTab={activeTab}
          logout={logout}
        />

        {/* Main Content */}
        <Header
          user={user}
          sidebarCollapsed={sidebarCollapsed}
          menuItems={menuItems}
          activeTab={activeTab}
          logout={logout}
        >
          {children}
        </Header>
      </div>
    </div>
  );
};

export default LayoutContent;
