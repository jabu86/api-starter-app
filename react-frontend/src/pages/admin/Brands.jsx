import {useEffect, useState} from 'react'
import BrandList from "../../componentes/admin/BrandList.jsx";
import Modal from "../../componentes/admin/Modal.jsx";
import BrandForm from "../../componentes/admin/BrandForm.jsx";
import Swal from 'sweetalert2'

function Brands({openModal, show}) {

    const [brands, setBrands] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const getBrands = async () =>{
        const res = await fetch(`/api/admin/brands`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setBrands(data.brands);
    }

    useEffect(() => {
        getBrands();
    },[]);

    const handleAddBrand = () => {
        setSelectedBrand(null);
        setIsEditing(false);
        setErrors({});
        openModal(show);
    };

    const handleEditBrand = (brand) => {
        setSelectedBrand(brand);
        setIsEditing(true);
        setErrors({});
        openModal(show);
    };

    const handleSaveBrand = async (form) => {
        setErrors({});
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("image", form.image);

        const res = await fetch(`/api/admin/brands`, {
            method: "POST",
            body: formData,
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
            getBrands();
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

    }

    const handleUpdateBrand = async (form) => {
        setErrors({});
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("image", form.image);
        formData.append("id", selectedBrand.id);

        const res = await fetch(`/api/admin/brands`, {
            method: "PUT",
            body: formData,
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
            getBrands();
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
    }

    const handleDeleteBrand = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            const res = await fetch(`/api/admin/brands/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if(data.success){
                getBrands();
            }
            if (data.success) Swal.fire({
                title: "Deleted!",
                text: data.message,
                icon: "success"
            });
        });
    }

    return (
        <div className="row g-0 mt-1 p-3" >
            <div className="col-12 mb-1">
                <button className="btn btn-danger float-end" type="button" onClick={() => handleAddBrand(show)}>Add Brand</button>
                <h2>Brands</h2>
                <table className="table table-responsive mt-4">
                    <caption>List of brands</caption>
                    <thead>
                    <tr>
                        <th>BRAND</th>
                        <th>IMAGE</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <BrandList brands={brands} handleEditBrand={handleEditBrand} show={show} handleDeleteBrand={handleDeleteBrand}/>
                    </tbody>
                </table>
            </div>
            {show && (
                <Modal openModal={openModal} show={show} title={isEditing? "Edit Brand" : "Add Brand"}  closeModal={() => openModal(false)}>
                   <BrandForm
                       initialData={selectedBrand}
                       onSubmit={isEditing ? handleUpdateBrand : handleSaveBrand }
                       show={show}
                       closeModal={() => openModal(false)}
                       errors={errors}
                   />
                </Modal>
            )}
        </div>
    )
}

export default Brands;
