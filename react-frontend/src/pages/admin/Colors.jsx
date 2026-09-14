import { useEffect, useState } from "react";
import ColorList from "../../componentes/admin/ColorsList.jsx";
import Modal from "../../componentes/admin/Modal.jsx";
import ColorsForm from "../../componentes/admin/ColorsForm.jsx";
import SearchBar from "../../componentes/admin/SearchBar.jsx";
import Swal from "sweetalert2";

function Colors({ openModal, show }) {
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

      const res = await fetch(`/api/admin/colors?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
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
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

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
        const res = await fetch(`/api/admin/colors/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
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
    <div className="row g-0 mt-1 p-3">
      <div className="col-12 mb-1">
        <button
          className="btn btn-primary float-end"
          type="button"
          onClick={() => handleAddColor()}
        >
          Add Color
        </button>
        <h2>Colors</h2>
        <SearchBar search={search} setSearch={setSearch} getData={getColors} />
        <table className="table table-responsive mt-4">
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
  );
}

export default Colors;
