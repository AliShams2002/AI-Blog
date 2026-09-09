"use client";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import { getAuthCookies } from "@/app/(site)/login/_partials/action";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(isAuthenticated);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const moduleRef = useRef(null);

  const menuItems = [
    { lable: "خانه", href: "#" },
    { lable: "درباره ما", href: "#" },
    { lable: "تماس با ما", href: "#" },
  ];

  // Checking coockies for handle login
  useEffect(() => {
    const check = async () => {
      const coockies = await getAuthCookies();
      setIsLogin(coockies.token ? true : false);
    };
    check();
  }, [user, refreshTrigger]);

  // Checking screen size for handle menu
  useEffect(() => {
    const checkScreenSize = () => {
      const screenSize = window.innerWidth;
      if (screenSize > 640) closeMenu();
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Checking for clicks outside of the modal
  useEffect(() => {
    const handelClickOutside = (event) => {
      if (
        isModuleOpen &&
        moduleRef.current &&
        !moduleRef.current.contains(event.target)
      ) {
        toggleModule();
      }
    };

    document.addEventListener("mousedown", handelClickOutside);

    return () => {
      window.removeEventListener("mousedown", handelClickOutside);
    };
  }, [isModuleOpen]);

  const toggleModule = () => setIsModuleOpen(!isModuleOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <header
      key={refreshTrigger}
      className="sticky top-0 z-50 border-b border-gray-700/50 bg-black/10 backdrop-blur-lg font-iransans-edit"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="w-full flex items-center justify-between">
          {/* Mobile menu */}
          <MobileMenu
            menuItems={menuItems}
            isAuthenticated={isAuthenticated}
            user={user}
            logout={logout}
            isMenuOpen={isMenuOpen}
            closeMenu={closeMenu}
          />

          {/* Logo */}
          <div className="flex items-center gap-5">
            <MenuIcon
              className="w-4 h-4 sm:hidden cursor-pointer"
              onClick={openMenu}
            />
            <Link href="/">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 bg-clip-text text-transparent font-iransans-bold">
                وبلاگ من
              </h2>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-400 mt-1">
            {menuItems.map((i) => (
              <a
                key={Math.random()}
                href={i.href}
                className="hover:text-gray-200 duration-150"
              >
                {i.lable}
              </a>
            ))}
          </div>

          {/* Login btn & User btn */}
          {isLogin && user ? (
            <div>
              <div className="relative flex items-center gap-2" ref={moduleRef}>
                {/* User btn */}
                <span
                  className="py-1 px-2 font-bold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 cursor-pointer"
                  onClick={toggleModule}
                >
                  {user.username.charAt(0)}
                </span>

                {/* User modal */}
                {isModuleOpen && (
                  <div className="min-w-56 w-full absolute top-12 left-0 bg-gray-800 flex items-center flex-col gap-2 rounded-2xl p-2 font-semibold shadow-2xl">
                    <h3 className="w-full text-gray-400 p-2 border-b border-gray-700">
                      {user.username}
                    </h3>
                    {user?.role === "admin" && (
                      <Link className="w-full" href="/admin/dashboard">
                        <button className="w-full flex items-center gap-2 hover:bg-gray-900/50 hover:text-blue-500 text-gray-200 p-2 text-start transition-all duration-100 rounded-lg cursor-pointer">
                          <LayoutDashboard className="w-4 h-4" />
                          <span>داشبورد</span>
                        </button>
                      </Link>
                    )}
                    <button
                      className="w-full flex items-center gap-2 hover:bg-red-950/40 text-red-600 p-2 text-start transition-all duration-100 rounded-lg cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>خروج از حساب کاربری</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link href="/login">
              {/* Login btn */}
              <button className="px-4 py-2 rounded-3xl text-sm font-medium transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white cursor-pointer duration-150">
                ورود
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
