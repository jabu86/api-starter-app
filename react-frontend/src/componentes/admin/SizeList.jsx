import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt, faEye,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import {Link} from "react-router-dom";
import sizes from "../../pages/admin/Sizes.jsx";
function CategorySize({sizes, handleEditSize , handleDeleteSize}) {
    return (
        <>
            {!sizes.length > 0 ?
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
        </>
    )
}

export default CategorySize;