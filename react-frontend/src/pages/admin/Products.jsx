import { useEffect, useState } from "react";
import ProductList from "../../componentes/admin/ProductList.jsx";
import Modal from "../../componentes/admin/Modal.jsx";
import ProductForm from "../../componentes/admin/ProductForm.jsx";
import SearchBar from "../../componentes/admin/SearchBar.jsx";
import Swal from "sweetalert2";
import Breadcrumb from '../../componentes/admin/Breadcrumb.jsx'
import {
  faDashboard, faHome, faStore,


} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function Products({ openModal, show }) {
  // const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const getProducts = async (page = 1, searchTerm = "") => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: searchTerm || "",
      });
      const res = await fetch(`/api/admin/products?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response",res)
      const data = await res.json();
      if(res.status === 401){
        toast.error(data.message);
      }
      setProducts(data.products || []);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err)
      console.log(err.response);
      if(err.response.status === 401 && err.response){
        toast.error(err.response.data.message);
      }
      if(err.response.status === 500 && err.response){
        toast.error(err.response.data.message);
      }
    }
  };

//   const handleSearch = () => {
//     setCurrentPage(currentPage);
//     getProducts(1, search);
//   };

  const handlePageChange = (page) => {
    // setCurrentPage(currentPage);
    getProducts(page, search);
  };
  const getBrands = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/products/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBrands(data.brands);
    } catch (err) {
      console.log(err);
      if(err.response.status === 401 && err.response){
        toast.error(err.response.data.message);
      }
      if(err.response.status === 500 && err.response){
        toast.error(err.response.data.message);
      }
    }
  };
  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/products/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response",res)
      const data = await res.json();
      // console.log("API RESPONSE:", data.products);
      setCategories(data.categories);
    } catch (err) {
      console.log(err);
      if(err.response.status === 401 && err.response){
        toast.error(err.response.data.message);
      }
      if(err.response.status === 500 && err.response){
        toast.error(err.response.data.message);
      }
    }
  };
  const getSubCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/sub-categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response",res)
      const data = await res.json();
      // console.log("API RESPONSE:", data.products);
      setSubCategories(data.subCategory);
    } catch (err) {
      console.log(err);
      if(err.response.status === 401 && err.response){
        toast.error(err.response.data.message);
      }
      if(err.response.status === 500 && err.response){
        toast.error(err.response.data.message);
      }
    }
  };
  const getSize = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/products/sizes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response",res)
      const data = await res.json();
      // console.log("API RESPONSE:", data.products);
      setSizes(data.sizes);
    } catch (err) {
      console.log(err);
      if(err.response.status === 401 && err.response){
        toast.error(err.response.data.message);
      }
      if(err.response.status === 500 && err.response){
        toast.error(err.response.data.message);
      }
    }
  };
  const getColors = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/products/colors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response",res)
      const data = await res.json();
      // console.log("API RESPONSE:", data.products);
      setColors(data.colors);
    } catch (err) {
      console.log(err);
      if(err.response.status === 401 && err.response){
        toast.error(err.response.data.message);
      }
      if(err.response.status === 500 && err.response){
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    getBrands();
    getCategories();
    getSubCategories();
    getSize();
    getColors();
    getProducts(1, "");
    if (selectedProducts) {
      setImages(selectedProducts.images);
    }
  }, [selectedProducts]);

  const handleAddProduct = async (e) => {
    setErrors({});
    openModal(show);
    setIsEditing(false);
    setSelectedProducts(null);
  };
  const handleUpdateProduct = async (product) => {
    setErrors({});
    openModal(show);
    setIsEditing(true);
    setSelectedProducts(product);
  };

  const handleSaveProducts = async (form) => {

    setErrors({});
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("brand_id", form.brand);
    formData.append("category_id", form.categoryId);
    formData.append("sub_category_id", form.subCategoryId);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("in_stock", form.in_stock);
    formData.append("active", form.active);
    formData.append("colors", form.colors);
    formData.append("size", form.sizes);
    form.newImages.forEach((file) => {
      formData.append("images", file); // ✅ correct
    });
    form.existingImages.forEach((file) => {
      formData.append("images[]", file); // ✅ correct
    });

    formData.append("active_image_index", JSON.stringify(form.activeImage));
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      let url = isEditing
        ? `/api/admin/products/${form.id}`
        : `/api/admin/products`;
      let payload = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,

      };

      const res = await fetch(url, payload);
      const data = await res.json();
      if(res.status === 401){
        toast.error(res.statusText)
      }
      if (res.status === 400 && data.errors) {
        const groupedErrors = data.errors.reduce((acc, err) => {
          if (!acc[err.path]) {
            acc[err.path] = [];
          }
          acc[err.path].push(err.msg);
          return acc;
        }, {});
        setErrors(groupedErrors || {});
        return;
      }
      if (data.success) {
        setErrors({});
        openModal(show);
        getProducts();
        await Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        }).fire({
          icon: "success",
          title: data.message,
        });
      }
    } catch (err) {

      console.log(err)
      toast.error(err.response.message);

    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`/api/admin/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          getProducts();
        }
        if (data.success)
          Swal.fire({
            title: "Deleted!",
            text: data.message,
            icon: "success",
          });
      });
    }catch (err) {
      console.log(err);
      if(err.response.status === 500) {
        toast.error(err.response.data.message);
      }
    }

  };

  const handleDeleteImage = async (id, onSuccess) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      const res = await fetch(`/api/admin/products/${id}/image`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.image.id);
        getProducts();
      }
      Swal.fire({
        title: "Deleted!",
        text: data.message,
        icon: "success",
      });
    });
  };
  return (
      <>
        <Breadcrumb route1={'/admin'} route2={'/admin/products'} parentPage={'Dashboard'} page={'Products'} icon1={faDashboard} icon2={faStore} />
        <div className="row p-2">
          <div className="col-md-8">
            <SearchBar
                search={search}
                setSearch={setSearch}
                getData={getProducts}
            />
          </div>
          <div className="col-md-4">
            <button
                className="btn btn-primary float-end"
                onClick={() => handleAddProduct()}
              >
              Add Product
            </button>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-md-12">
            <table className="table table-responsive">
              <caption>List of products</caption>
              <thead>
              <tr>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>IMAGES</th>
                <th>IN STOCK</th>
                <th>ACTIVE</th>
                <th className="text-center">ACTION</th>
              </tr>
              </thead>
              <tbody className="table-group-divider">
              <ProductList
                  products={products}
                  pagination={pagination}
                  handleUpdateProduct={handleUpdateProduct}
                  handleDelete={handleDelete}
                  handlePageChange={handlePageChange}
              />
              </tbody>
            </table>
            {show && (
                <Modal
                    openModal={openModal}
                    show={show}
                    title={isEditing ? "Edit Product" : "Add Product"}
                    closeModal={() => openModal(show)}
                    onSave={handleSaveProducts}
                >
                  <ProductForm
                      initialData={selectedProducts}
                      onSubmit={handleSaveProducts}
                      show={show}
                      closeModal={() => openModal(show)}
                      errors={errors}
                      categories={categories}
                      subCategories={subCategories}
                      brands={brands}
                      sizes={sizes}
                      colors={colors}
                      handleDeleteImage={handleDeleteImage}
                  />
                </Modal>
            )}
          </div>
        </div>
      </>

  );
}

export default Products;
