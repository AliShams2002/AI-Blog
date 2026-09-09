// Return all categories and add an "All" category
export const getCategoriesWithAll = (data) => {
  const allCategoryOption = { id: "all", title: "همه" };
  return [allCategoryOption, ...data];
};

// Return data about an category by ID
export const getCategoryName = (data, id) => {
  if (!data || !id) return;
  const { title } = data.find((c) => c.id == id);
  return title;
};
