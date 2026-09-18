import { useState, useEffect, Fragment } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import ProductCard from '../componentes/customer/ProductCard'
import Filter from '../componentes/customer/Filter'
function Shop() {
  const [products, setProducts] = useState([]);
  // const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });
  
  const getProducts = async (page = 1, searchTerm = "") => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: searchTerm || "",
      });
      const res = await fetch(`/api/shop?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Response",res)
      const data = await res.json();
      setProducts(data.products || []);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts(1, "");
  }, []);

  
  
  

  return (
    <Fragment>
      <Filter count={products.length}/>
      <div className="row">         
        <ProductCard products={products} />               

        <div className="col-3">
          CART GOES HERE
        </div>
      </div>
    </Fragment>
  );
}

export default Shop;
