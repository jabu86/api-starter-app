import {useCallback, useEffect, useState} from 'react'
import Modal from "../../componentes/admin/Modal.jsx";
import CategoryList from "../../componentes/admin/CategoryList.jsx";
import CategoryForm from "../../componentes/admin/CategoryForm.jsx";
import Swal from "sweetalert2";


function Categories({openModal, show}) {
    const [categories, setCategories] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [initialData, setInitialData] = useState({});
    const getCategories = async () => {
        const res = await fetch(`/api/admin/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setCategories(data.categories);
    }

    useEffect(() => {
        getCategories();
    },[])

    const handleAddCategory = () => {
        openModal(show);
        setIsEditing(false);
        setErrors({});
        setInitialData({})
    }
    const handleEditCategory = (categoy) => {
       openModal(show);
       setIsEditing(true);
       setErrors({});
       setInitialData(categoy);
    }

    const handleSaveCategory =  async  (form) => {
        setErrors({});
        let url = isEditing ? `/api/admin/categories/${form.id}` : `/api/admin/categories`;
        const payload = {
            name : form.name,
            description:form.description,
        }
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if(res.status === 400 && data.errors){
                const groupedErrors = data.errors.reduce((acc, err) =>{
                    if(!acc[err.path]){
                        acc[err.path] = [];
                    }
                    acc[err.path].push(err.msg);
                    return acc;
                },{})
                setErrors(groupedErrors || {});
                return;
            }

            if(data.success){
                setErrors({});
                openModal(show);
                getCategories();
                await Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire({
                    icon: "success",
                    title: data.message,
                });
            }

        }catch(error){
            console.log(error)
        }

    }

    const handleDeleteCategory = async (id) =>{
      try {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if(!result.isConfirmed) return;
            const res = await fetch(`/api/admin/categories/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if(data.success){
                getCategories();
            }
            if (data.success) {
                Swal .fire({
                    title: "Deleted!",
                    text: data.message,
                    icon: "success"
                });
            }
        });
      }catch(err){
          console.log(err)
      }
    }


    return (
        <div className="row g-0 mt-1 p-3" >
            <div className="col-12 mb-1">
                <button className="btn btn-primary float-end" type="button" onClick={() => handleAddCategory(show)}>Add Brand</button>
                <h2>Categories</h2>
                <table className="table table-responsive mt-4">
                    <caption>List of categories</caption>
                    <thead>
                    <tr>
                        <th>NAME</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    <CategoryList categories={categories} handleEditCategory={handleEditCategory} show={show} handleDeleteCategory={handleDeleteCategory}/>
                    </tbody>
                </table>
            </div>
            {show && (
                <Modal openModal={openModal} show={show} title={isEditing? "Edit Category" : "Add Category"}  closeModal={() => openModal(false)}>
                    <CategoryForm errors={errors} onSubmit={handleSaveCategory} closeModal={openModal} initialData={initialData} />
                </Modal>
            )}
        </div>
    )
}

export default Categories;
