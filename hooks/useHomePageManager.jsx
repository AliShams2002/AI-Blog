"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useDebounce } from "./useDebound";

export function useHomePageManager(initialBlogs) {
  const [modalState, setmodalState] = useState({
    featuredBlog: initialBlogs.at(-1),
    searchTerm: "",
    activeFilter: "all",
    BlogsPerPage: 3,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(modalState.searchTerm, 1000);
  const debouncedFilter = useDebounce(modalState.activeFilter, 800);

  // Simulate loading state when search, filter, or sort changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    currentPage,
    debouncedSearch,
    debouncedFilter,
    modalState.searchTerm,
    modalState.activeFilter,
    sortBy,
  ]);

  // Filter and sort blog posts based on active filter, search term, and sort option
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...initialBlogs];

    // Filter by category
    if (modalState.activeFilter !== "all") {
      filtered = filtered.filter(
        (p) =>
          modalState.activeFilter === "all" ||
          (p.categoryId && p.categoryId === modalState.activeFilter) ||
          (p.role && p.role === modalState.activeFilter),
      );
    }

    // Filter by search term (title or content)
    if (debouncedSearch) {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          p.content?.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    // Sort posts
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [initialBlogs, modalState.activeFilter, debouncedSearch, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedPosts.length / modalState.BlogsPerPage,
  );
  const paginatedBlogs = filteredAndSortedPosts.slice(
    (currentPage - 1) * modalState.BlogsPerPage,
    currentPage * modalState.BlogsPerPage,
  );

  // Update featured blog when search and filter are cleared
  useEffect(() => {
    if (modalState.searchTerm === "" && modalState.activeFilter === "all") {
      setmodalState((prev) => ({
        ...prev,
        featuredBlog: initialBlogs.at(-1),
      }));
    }
  }, [debouncedSearch, debouncedFilter, initialBlogs]);

  // Reset to page 1 when filter, search, or sort changes
  useEffect(() => {
    setmodalState((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [modalState.activeFilter, debouncedSearch, sortBy]);

  const handleSearchFilter = useCallback((value) => {
    setmodalState((prev) => ({
      ...prev,
      searchTerm: value,
    }));
  }, []);

  const resetFilter = useCallback(() => {
    setmodalState((prev) => ({
      ...prev,
      searchTerm: "",
      activeFilter: "all",
    }));
    setSortBy("newest");
  }, []);

  const handleActiveFilter = useCallback((value) => {
    setmodalState((prev) => ({
      ...prev,
      activeFilter: value,
    }));
  }, []);

  return {
    handleSearchFilter,
    handleActiveFilter,
    filteredAndSortedPosts,
    setCurrentPage,
    currentPage,
    setSortBy,
    sortBy,
    modalState,
    totalPages,
    paginatedBlogs,
    resetFilter,
    isLoading,
  };
}
