import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import Pagination from '../../componentes/admin/Pagination.jsx';
function CategorySize({sizes, handleEditSize , handleDeleteSize, pagination,  handlePageChange}) {
    return (
        <>
            {!sizes || !sizes.length > 0 ?
                <tr>
                    <td style={{ textAlign: "center", padding: "20px" }} colSpan={9}>
                        <img
                            src={admin_loader}
                            alt="Loading..."
                            width="60"
                        />
                    </td>
                </tr>
                : sizes.map((size) => (
                <tr key={size.id}>
                    <td>{size.size}</td>
                    <td className="text-center">
                        <button className="btn btn-info" onClick={() => handleEditSize(size)}><FontAwesomeIcon icon={faPencilAlt}/></button>
                        <button className="btn btn-danger" onClick={() =>handleDeleteSize(size.id)}><FontAwesomeIcon icon={faTrash} /></button>

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

export default CategorySize;