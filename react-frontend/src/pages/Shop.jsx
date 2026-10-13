import { useState, useEffect, Fragment } from "react";
import ProductCard from "../componentes/customer/ProductCard";
import Filter from "../componentes/customer/Filter";
import GlobalSearchBar from "../componentes/customer/GlobalSearchBar";
import Cart from "../componentes/customer/Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import CategoryList from "../componentes/customer/CategoryList.jsx";
import BrandList from "../componentes/customer/BrandList.jsx";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  const initialFilters = {
    search: "",
    size: "",
    sort: "",
    category: "",
    subCategoryId: "",
    brand: "",
  };
  const [filters, setFilters] = useState(initialFilters);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { user } = useAuth();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const getProducts = async (page = 1, selectedFilters = filters) => {
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

      const res = await fetch(`/api/shop?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Response",res)
      const data = await res.json();

      // console.log("FULL API RESPONSE:", data);
      // console.log("data.products:", data.products);
      // console.log("Is products an array:", Array.isArray(data.products));
      // console.log("Is array:", Array.isArray(data.products));

      setProducts(Array.isArray(data.products) ? data.products : []);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
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
      const res = await fetch(`/api/categories`, {
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
      const res = await fetch(`/api/brands`, {
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

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
    // console.log(cartItmes , 'shop comp')
  };

  useEffect(() => {
    // updateFilters(1, filters);
    getProducts(1, initialFilters);
    getCategory();
    getBrands();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
