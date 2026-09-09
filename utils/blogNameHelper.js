// Return blog name
export const blogNameHelper = (blogs, id) => {
  if (!id) return null;
  const { title } = blogs.find((c) => c.id == id);
  return title;
};
