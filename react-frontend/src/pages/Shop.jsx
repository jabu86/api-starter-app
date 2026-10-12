import { useState, useEffect, Fragment } from "react";
import ProductCard from "../componentes/customer/ProductCard";
import Filter from "../componentes/customer/Filter";
import GlobalSearchBar from "../componentes/customer/GlobalSearchBar";
import Cart from "../componentes/customer/Cart";
import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import CategoryList from '../componentes/customer/CategoryList.jsx';
import BrandList from '../componentes/customer/BrandList.jsx';


function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState(() => {
     const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
   const { user,} = useAuth();
  

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const getProducts = async (
    page = 1,
    searchTerm = "",
    selectedSize = "",
    selectedSort = "",
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        search: searchTerm || "",
        size: selectedSize || "",
        sort: selectedSort || "",
      });
      // console.log(selectedSort, "sort");

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

  const getCategory = async () => {
    try { 
      const res = await fetch(`/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });      
      const data = await res.json();
      if(data.success){
        setCategories(data.categories)
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
      if(data.success){
        setBrands(data.brands)
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    getProducts(page, search, size, sort);
  };

  const handleSearch = () => {
    // alert()
    getProducts(1, search , size , sort);
  };

  const filterProducts = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    getProducts(1, search, selectedSize, sort);
  };

  const sortProducts = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    getProducts(1, search, size, selectedSort);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem  = prevItems.find((item) => item.id === product.id);
      if(existingItem ){
        return prevItems.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity:1
        }
      ]
    });
    // console.log(cartItmes , 'shop comp')    
  }

  useEffect(() => {
    getProducts(1, "");
    getCategory();
    getBrands();
    
  }, []);

  useEffect(() => {  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  // console.log(products);


  const handleRemoveCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));    
  }
  
  return (
    <Fragment>
      <div className="row">
        <GlobalSearchBar
          search={search}
          setSearch={setSearch}
          getData={getProducts}
          handleSearch={handleSearch}
        />        
      </div>
      <Filter
        count={products.length}
        size={size}
        sort={sort}
        filterProducts={filterProducts}
        sortProducts={sortProducts}
      />
      <div className="row">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/shop">shop</Link></li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-2">
          {/* shop side */}
          <CategoryList categories={categories}/>
          <BrandList brands={brands}/>
        </div>

        {/* shop products */}
        <ProductCard products={products} addToCart={addToCart} pagination={pagination} handlePageChange={handlePageChange}/>

        {/* shop cart */}
        <Cart cartItems={cartItems} handleRemoveCartItem={handleRemoveCartItem}/>
        
      </div>
      
    </Fragment>
  );
}

export default Shop;
