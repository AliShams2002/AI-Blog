"use client";

import React from "react";
import Categories from "./Categories";
import { useHomePageManager } from "@/hooks/useHomePageManager";
import Blogs from "./Blogs";
import { getCategoriesWithAll } from "@/utils/categoriesHelper";

const HomeClient = ({ initialBlogs, initialCategories }) => {
  const {
    handleSearchFilter,
    handleActiveFilter,
    filteredAndSortedPosts,
    setCurrentPage,
    currentPage,
    setSortBy,
    sortBy,
    modalState,
    getCategoryName,
    totalPages,
    paginatedBlogs,
    resetFilter,
    setIsLoading,
    isLoading,
  } = useHomePageManager(initialBlogs);

  return (
    <>
      {/* Advanced section */}
      <Categories
        initialCategories={getCategoriesWithAll(initialCategories)}
        filteredBlogs={filteredAndSortedPosts}
        setActiveFilter={handleActiveFilter}
        activeFilter={modalState.activeFilter}
        setSearchTerm={handleSearchFilter}
        searchTerm={modalState.searchTerm}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      {/* Blogs grid */}
      <Blogs
        initialCategories={initialCategories}
        getCatById={getCategoryName}
        featuredBlog={modalState.featuredBlog}
        activeFilter={modalState.activeFilter}
        filteredBlogs={filteredAndSortedPosts}
        searchTerm={modalState.searchTerm}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        paginatedBlogs={paginatedBlogs}
        resetFilter={resetFilter}
      />
    </>
  );
};

export default HomeClient;
