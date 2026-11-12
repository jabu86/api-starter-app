import { useState, useEffect, Fragment } from "react";
import ProductCard from "../componentes/customer/ProductCard";
import Filter from "../componentes/customer/Filter";
import GlobalSearchBar from "../componentes/customer/GlobalSearchBar";
import Cart from "../componentes/customer/Cart";
import { Link, useSearchParams } from "react-router-dom";
import CategoryList from "../componentes/customer/CategoryList.jsx";
import BrandList from "../componentes/customer/BrandList.jsx";
import { API_URL } from "../services/api";
import { useCart } from "../context/CartContext";

function Shop() {
  const { addToCart, cartItems, setCartItems } = useCart();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading , setIsLoading] =useState(true);

  const initialFilters = {
    search: "",
    size: "",
    sort: searchParams.get("sort") || "",
    category: searchParams.get("category") || "",
    subCategoryId: "",
    brand: searchParams.get("brand") || "",
  };
  const [filters, setFilters] = useState(initialFilters);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const getProducts = async (page = 1, selectedFilters = filters) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        search: selectedFilters.search || "",
        size: selectedFilters.size || "",
        sort: selectedFilters.sort || "",
        category: selectedFilters.category || "",
        subCategoryId: selectedFilters.subCategoryId || "",
        brand: selectedFilters.brand || "",
      });

      const res = await fetch(`${API_URL}/api/shop?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Response",res)
      const data = await res.json();
      if(data.success){

        setProducts(Array.isArray(data.products) ? data.products : []);
        setPagination(data.pagination);
      
      }
    } catch (err) {
      console.log(err);
      setProducts([])
    }finally{
      setIsLoading(false)
    }
  };

  const updateFilters = (changes) => {
    const nextFilters = {
      ...filters,
      ...changes,
    };
    setFilters(nextFilters);
    getProducts(1, nextFilters);
  };
  const getCategory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBrands = async () => {
    try {
      const res = await fetch(`${API_URL}/api/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        setBrands(data.brands);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    getProducts(page, filters);
  };

  const handleSearch = () => {
    getProducts(1, filters);
  };

  const filterProducts = (e) => {
    // const selectedSize = e.target.value;
    // setFilters((prevFilters) => ({ ...prevFilters, size: selectedSize }));
    // getProducts(1, { ...filters, size: selectedSize });
    updateFilters({ size: e.target.value });
  };

  const sortProducts = (e) => {
    const selectedSort = e.target.value;
    // setSort(selectedSort);
    updateFilters({ sort: selectedSort });
  };

  useEffect(() => {
    document.title = `Bhala| Shop`;
    // updateFilters(1, filters);
    getProducts(1, initialFilters);
    getCategory();
    getBrands();
  }, []);

  const handleRemoveCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const searchByCategory = (categoryName) => {
    updateFilters({ category: categoryName, subCategoryId: "" });
  };

  const searchBySubCategory = (categoryName, subCategoryId) => {
    updateFilters({ category: categoryName, subCategoryId: subCategoryId });
  };

  const searchByBrand = (brandName) => {
    updateFilters({ brand: brandName });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-4">
          <GlobalSearchBar
            search={filters.search}
            setSearch={(value) =>
              setFilters((prev) => ({ ...prev, search: value }))
            }
            handleSearch={handleSearch}
          />
        </div>
        <Filter
          count={products.length}
          size={filters.size}
          sort={filters.sort}
          filterProducts={filterProducts}
          sortProducts={sortProducts}
        />
      </div>
      <hr />
      <div className="row">
        <div className="col-md-2">
          Products{" "}
          <span className="badge rounded-pill text-bg-dark ms-2">
            {products.length}
          </span>
        </div>
        <div className="col-md-10">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/shop">shop</Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          {/* shop side */}
          <CategoryList
            categories={categories}
            searchByCategory={searchByCategory}
            searchBySubCategory={searchBySubCategory}
          />
          <BrandList brands={brands} searchByBrand={searchByBrand} />
        </div>

        {/* shop products */}
        <ProductCard
          products={products}
          addToCart={addToCart}
          pagination={pagination}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
        />

        {/* shop cart */}
        <Cart
          cartItems={cartItems}
          handleRemoveCartItem={handleRemoveCartItem}
        />
      </div>
    </Fragment>
  );
}

export default Shop;
