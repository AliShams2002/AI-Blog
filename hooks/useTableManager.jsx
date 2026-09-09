import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDebounce } from "./useDebound";
import { handelSearch } from "@/utils/searchLib";
import { formatToSolarDate } from "@/utils/FormatDate";
import Image from "next/image";
import { blogNameHelper } from "@/utils/blogNameHelper";
import { getCategoryName } from "@/utils/categoriesHelper";

export function useTableManager({
  data,
  itemsPerPage,
  blogs = [],
  categories = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const debouncedFilter = useDebounce(activeFilter, 300);
  // const { getCategoryName } = useCategories();
  // const { getBlogName } = useBlog();
  const isFirstRender = useRef(true);

  // Filter data based on search term and active filter
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (!debouncedSearch && debouncedFilter === "all") return data;
    return handelSearch(data, debouncedSearch, debouncedFilter);
  }, [data, debouncedSearch, debouncedFilter]);

  // Calculate total pages for pagination
  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage) || 1;
  }, [filteredData.length, itemsPerPage]);

  // Calculate starting index for current page
  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  // Get paginated data slice
  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, startIndex, itemsPerPage]);

  // Show loading state when filter or search changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedFilter, debouncedSearch]);

  // Reset current page when data changes (skip on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const maxPage = Math.ceil(data.length / itemsPerPage) || 1;
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [data.length, itemsPerPage, currentPage]);

  // Navigate to a specific page with bounds checking
  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages],
  );

  // Renders cell content based on column configuration
  const renderCell = useCallback((item, column) => {
    const value = item[column.key];

    // Use custom render function if provided
    if (column.render) {
      return column.render(value, item);
    }

    // Handle image column with Next.js Image component
    if (column.key === "image") {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${value}`}
          className="rounded-xl"
          width={50}
          height={50}
          quality={80}
          alt=""
        />
      );
    }

    // Format date column
    if (column.key === "createdAt") {
      return formatToSolarDate(value);
    }

    // Convert category ID to category name
    if (column.key === "categoryId") {
      return getCategoryName(categories, value);
    }

    // Convert article ID to article/blog name
    if (column.key === "articleId") {
      return blogNameHelper(blogs, value);
    }

    return value;
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    filteredData,
    paginatedData,
    totalPages,
    startIndex,
    goToPage,
    renderCell,
  };
}
