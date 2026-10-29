import { useEffect, useState } from "react";
import ColorList from "../../componentes/admin/ColorsList.jsx";
import Modal from "../../componentes/admin/Modal.jsx";
import ColorsForm from "../../componentes/admin/ColorsForm.jsx";
import SearchBar from "../../componentes/admin/SearchBar.jsx";
import Swal from "sweetalert2";

import {
  faDashboard, faLayerGroup, faPaintbrush,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../../componentes/admin/Breadcrumb.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
function Colors({ openModal, show }) {
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [initialData, setInitialData] = useState({});

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });
  const getColors = async (page = 1, searchTerm = "") => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: searchTerm || "",
      });
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(`/api/admin/colors?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if(res.status === 401){
        toast.error(data.message);
      }
      setColors(data.colors || []);
      setPagination(data.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColors(1, "");
  }, []);

  const handlePageChange = (page) => {
    // setCurrentPage(currentPage);
    getColors(page, search);
  };
  const handleAddColor = () => {
    openModal(show);
    setIsEditing(false);
    setErrors({});
    setInitialData({});
  };
  const handleEditColor = (color) => {
    openModal(show);
    setIsEditing(true);
    setErrors({});
    setInitialData(color);
  };

  const handleSaveColor = async (form) => {
    setErrors({});
    let url = isEditing ? `/api/admin/colors/${form.id}` : `/api/admin/colors`;
    const payload = {
      name: form.name,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if(res.status === 401){
        toast.error(data.message);
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
        getColors();
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
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteColor = (id) => {
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
        if (!result.isConfirmed) return;
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await fetch(`/api/admin/colors/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if(res.status === 401){
          toast.error(data.message);
        }
        if (data.success) {
          getColors();
        }
        if (data.success) {
          Swal.fire({
            title: "Deleted!",
            text: data.message,
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <>
        <Breadcrumb route1={'/admin'} route2={'/admin/colors'} parentPage={'Dashboard'} page={`Colors`}  icon1={faDashboard} icon2={faPaintbrush} />
        <div className="row">
          <div className="col-md-8">
            <SearchBar search={search} setSearch={setSearch} getData={getColors} />
          </div>
          <div className="col-md-4">
            <button
                className="btn btn-primary float-end"
                type="button"
                onClick={() => handleAddColor()}
            >
              Add Color
            </button>
          </div>
        </div>
        <div className="row p-2">
      <div className="col-12 mb-1">
        <table className="table table-responsive">
          <caption>List of colors</caption>
          <thead>
            <tr>
              <th>COLOR</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <ColorList
              colors={colors}
              handleEditColor={handleEditColor}
              show={show}
              handleDeleteColor={handleDeleteColor}
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          </tbody>
        </table>
      </div>
      {show && (
        <Modal
          openModal={openModal}
          show={show}
          title={isEditing ? "Edit Color" : "Add Color"}
          closeModal={() => openModal(false)}
        >
          <ColorsForm
            errors={errors}
            onSubmit={handleSaveColor}
            closeModal={openModal}
            initialData={initialData}
          />
        </Modal>
      )}
    </div>

        </>
  );
}

export default Colors;
