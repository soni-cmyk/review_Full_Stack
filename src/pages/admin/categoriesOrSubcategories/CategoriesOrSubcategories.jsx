import React, { useState } from "react";
import Categories from "./categories/Categories";
import SubCategories from "./subcategories/SubCategories";

export default function CategoriesOrSubcategories({
  categories,
  onEditCategories,
  refresh,
  subcategories,
  onEditSubCategories,
  refreshSubCategories
}) {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="px-6 pb-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <div className="p-1 bg-slate-200 rounded-md flex gap-1">
          <button
            className={`rounded-md px-3 py-1 ${activeTab === "categories" ? "bg-gray-100 " : "text-gray-500"}`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
          <button
            className={`rounded-md px-3 py-1 ${activeTab === "subcategories" ? "bg-gray-100 " : "text-gray-500"}`}
            onClick={() => setActiveTab("subcategories")}
          >
            Subcategories
          </button>
        </div>
      </div>
      {activeTab === "categories" ? (
        <Categories
          categories={categories}
          onEditCategories={onEditCategories}
          refresh={refresh}
        />
      ) : (
        <SubCategories 
        subcategories={subcategories}
        onEditSubCategories={onEditSubCategories}
        refreshSubCategories={refreshSubCategories}
        />
      )}
    </div>
  );
}
