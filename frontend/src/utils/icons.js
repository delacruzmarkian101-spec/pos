export const getCategoryIcon = (category) => {
  const map = {
    Bakery: "cookie",
    "Fast Food": "pizza",
    Healthy: "salad",
    Drinks: "coffee",
    Desserts: "cake",
    Protein: "beef",
    Others: "package",
  };
  return map[category] || "package";
};
