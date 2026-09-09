// Returns the most recent 3 items sorted by creation date
export const recentData = (data) => {
  if (!data || data.length === 0) return [];

  // Copy, sort by createdAt descending, and take first 3 items
  return [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
};
