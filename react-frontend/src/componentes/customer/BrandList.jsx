import React from "react";

function BrandList({brands}) {

    console.log(brands);
    
  return (
    <div className="row">
      <ul className="list-group mb-2">
        <li className="list-group-item">
          <h6 className="fw-bold">Brand list</h6>
        </li>
        {!brands ? (
          <p>brands not found</p>
        ) : (
          brands.map((brand) => (
            <li className="list-group-item" key={brand.id}>
              {brand.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BrandList;
