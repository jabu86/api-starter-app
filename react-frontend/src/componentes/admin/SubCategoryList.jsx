import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import Pagination from "../../componentes/admin/Pagination";
function SubCategoryList({sub_categories, handleEditCategory , handleDeleteSubCategory, pagination, handlePageChange}) {

    return (
        <>
            {!sub_categories.subCategory?.length > 0 ?
                <tr>
                    <td style={{ textAlign: "center", padding: "20px" }} colSpan={9}>
                        <img
                            src={admin_loader}
                            alt="Loading..."
                            width="60"
                        />
                    </td>
                </tr>
                : sub_categories.subCategory?.map((category ,index) => (
                <tr key={index}>
                    <td>{category.name}</td>
                    <td className="text-center">
                        <button className="btn btn-info" onClick={() => handleEditCategory(category)}><FontAwesomeIcon icon={faPencilAlt}/></button>
                        <button className="btn btn-danger" onClick={() =>handleDeleteSubCategory(category.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                </tr>
            ))}
            <tr>
                
                {/* Pagination */}
                <Pagination pagination={pagination} handlePageChange={handlePageChange} colSpan={2}/>
            </tr>
        </>
    )
}

export default SubCategoryList;