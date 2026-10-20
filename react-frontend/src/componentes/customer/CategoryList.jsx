import React, { useState } from "react";

function CategoryList({ categories, searchByCategory, searchBySubCategory }) {
  const [listOpenId, setListOpenId] = useState(null);

  function handleCategoryListClick(id, name) {
    setListOpenId((currentId) => (currentId === id ? null : id));
    searchByCategory(name);
  }

  const handleSubCategoryListClick = (categoryName, subCategoryId) => {
    searchBySubCategory(categoryName, subCategoryId);
  };

  return (
    <div className="row">
      <ul className="list-group mb-3">
        <li className="list-group-item list-group-item-action list-group-item-light">
          <button
            className="btn btn-link text-dark text-decoration-none p-0 w-100 text-start"
            onClick={() => searchByCategory("") }
          >
            <h6 className="fw-bold">All Categories</h6>
          </button>
        </li>
        {categories.map((category) => (
          <li className="list-group-item" key={category.id}>
            <button
              type="button"
              className="btn btn-link text-dark text-decoration-none p-0 w-100 text-start"
              onClick={() =>
                handleCategoryListClick(category.id, category.name)
              }
            >
              {category.name}
              <span className="float-end">
                {listOpenId === category.id ? "−" : "+"}
              </span>
            </button>

            {listOpenId === category.id && (
              <ul className="list-group mt-2">
                {category.subCategory?.map((subCategory) => (
                  <li key={subCategory.id} className="list-group-item">
                    <button
                      className="btn btn-link text-dark text-decoration-none p-0 w-100 text-start"
                      onClick={() =>
                        handleSubCategoryListClick(
                          category.name,
                          subCategory.id,
                        )
                      }
                    >
                      {subCategory.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
        
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
