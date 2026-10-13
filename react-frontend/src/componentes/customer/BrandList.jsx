import React from "react";

function BrandList({ brands , searchByBrand}) {
  // console.log(brands);

  return (
    <div className="row">
      <ul className="list-group mb-3">
        <li className="list-group-item list-group-item-action list-group-item-light">
          <button
            className="btn btn-link text-dark text-decoration-none p-0 w-100 text-start"
            onClick={() => searchByBrand("")}
          >
            <h6 className="fw-bold">All Brands</h6>
          </button>
        </li>
        {!brands ? (
          <p>brands not found</p>
        ) : (
          brands.map((brand) => (
            <li className="list-group-item" key={brand.id}>
              <button
                type="button"
                className="btn btn-link text-dark text-decoration-none p-0 w-100 text-start"
                onClick={() => searchByBrand(brand.name)}
              >
                {brand.name}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BrandList;
