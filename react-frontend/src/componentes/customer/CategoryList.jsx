import React from "react";

function CategoryList({ categories }) {
  return (
    <div className="row">
      <ul className="list-group mb-2">
        <li className="list-group-item list-group-item-action list-group-item-light">
          <h6 className="fw-bold">Category list</h6>
        </li>
        {!categories ? (
          <p>Category not found</p>
        ) : (
          categories.map((category) => (
            <li className="list-group-item" key={category.id}>
              {category.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CategoryList;
