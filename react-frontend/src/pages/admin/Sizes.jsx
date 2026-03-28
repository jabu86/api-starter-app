import {useEffect, useState} from 'react'
import SizeList from "../../componentes/admin/SizeList.jsx";
import Modal from "../../componentes/admin/Modal.jsx";
import SizesForm from "../../componentes/admin/SizesForm.jsx";
import Swal from "sweetalert2";
function Sizes({openModal, show}) {
    const [sizes, setSizes] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [initialData, setInitialData] = useState({});
    const getSizes = async () => {
        const res = await fetch(`/api/admin/size`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setSizes(data.sizes);
    }

    useEffect(() => {
        getSizes();
    },[])
    const handleAddSize = () => {
        openModal(show)
        setIsEditing(false);
        setErrors({});
        setInitialData({})
    }
    const handleEditSize = (size) => {
        openModal(show)
        setIsEditing(true);
        setErrors({});
        setInitialData(size)
    }
    const handleSaveSize = async (form) => {
        setErrors({});
        let url = isEditing ? `/api/admin/size/${form.id}` : `/api/admin/size`;
        const payload = {
            size : form.size,
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
                getSizes();
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

    const handleDeleteSize = (id) => {
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
               const res = await fetch(`/api/admin/size/${id}`, {
                   method: "DELETE",
               });
               const data = await res.json();
               if(data.success){
                   getSizes();
               }
               if (data.success) {
                   Swal .fire({
                       title: "Deleted!",
                       text: data.message,
                       icon: "success"
                   });
               }
           });
       }catch(error){
           console.log(error)
       }
    }
    return (
        <div className="row g-0 mt-1 p-3" >
            <div className="col-12 mb-1">
                <button className="btn btn-primary float-end" type="button" onClick={() => handleAddSize()}>Add Size</button>
                <h2>Sizes</h2>
                <table className="table table-responsive mt-4">
                    <caption>List of sizes</caption>
                    <thead>
                    <tr>
                        <th>SIZES</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    <SizeList sizes={sizes} handleEditSize={handleEditSize} show={show} handleDeleteSize={handleDeleteSize}/>
                    </tbody>
                </table>
            </div>
            {show && (
                <Modal openModal={openModal} show={show} title={isEditing? "Edit Size" : "Add Size"}  closeModal={() => openModal(false)}>
                    <SizesForm errors={errors} onSubmit={handleSaveSize} closeModal={openModal} initialData={initialData} />
                </Modal>
            )}
        </div>
    )
}

export default Sizes;
