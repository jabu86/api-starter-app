import {useEffect, useState} from 'react'
import SubCategoryList from "../../componentes/admin/SubCategoryList.jsx";
import CategoryForm from "../../componentes/admin/CategoryForm.jsx";
import Modal from "../../componentes/admin/Modal.jsx";
import {Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";


function SubCategories({show, openModal }) {
    const [subCategories, setSubCategories] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [initialData, setInitialData] = useState({});
    const {slug} = useParams();

    const getSubCategories = async () => {
        const res = await fetch(`/api/admin/categories/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setSubCategories(data.category);
    }

    useEffect(() => {
        getSubCategories();
    },[]);

    const handleAddSubCategory = () => {
        openModal(show);
        setIsEditing(false);
        setInitialData({})
        setErrors({});
    }
    const handleEditSubCategory = (category) => {
        openModal(show);
        setIsEditing(true);
        setInitialData(category);
    }
    const handleDeleteCategory = (id) =>{
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
            const res = await fetch(`/api/admin/sub-categories/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if(data.success){
                getSubCategories();
            }
            if (data.success) {
                Swal .fire({
                    title: "Deleted!",
                    text: data.message,
                    icon: "success"
                });
            }
        });
    }

    const handleSaveCategory = async (form) =>{
        setErrors({});
        let url = isEditing ? `/api/admin/sub-categories/${form.id}` : `/api/admin/sub-categories`;
        const payload = {
            id: form.id,
            category_id:subCategories.id,
            name: form.name,
            description: form.description,
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
                getSubCategories();
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

    return (
        <div className="row g-0 mt-1 p-3">
            <div className="col-12 mb-1">
                <button className="btn btn-primary float-end" type="button" onClick={() => handleAddSubCategory(show)}>Add Sub Category</button>
                <Link to={"/admin/categories"} className="btn btn-link float-end">Back</Link>
                <h2>{subCategories.name} Categories</h2>
                <table className="table table-responsive mt-4">
                    <caption>List of categories</caption>
                    <thead>
                    <tr>
                        <th>NAME</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    <SubCategoryList sub_categories={subCategories} handleEditCategory={handleEditSubCategory} show={show} handleDeleteSubCategory={handleDeleteCategory}/>
                    </tbody>
                </table>
            </div>
            {show && (
                <Modal openModal={openModal} show={show} title={isEditing? "Edit Sub Category" : "Add Sub Category"}  closeModal={() => openModal(false)}>
                    <CategoryForm errors={errors} onSubmit={handleSaveCategory} closeModal={() => openModal(false)}  initialData={initialData} />
                </Modal>
            )}
        </div>
    )
}

export default SubCategories;
