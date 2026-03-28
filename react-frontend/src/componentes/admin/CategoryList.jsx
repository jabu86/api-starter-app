import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt, faEye,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import {Link} from "react-router-dom";
function CategoryList({categories, handleEditCategory , handleDeleteCategory}) {
    return (
        <>
            {!categories.length > 0 ?
                <tr>
                    <td style={{ textAlign: "center", padding: "20px" }} colSpan={9}>
                        <img
                            src={admin_loader}
                            alt="Loading..."
                            width="60"
                        />
                    </td>
                </tr>
                : categories.map((category) => (
                <tr key={category.id}>
                    <td>{category.name}</td>
                    <td className="text-center">
                        <button className="btn btn-info" onClick={() => handleEditCategory(category)}><FontAwesomeIcon icon={faPencilAlt}/></button>
                        <button className="btn btn-danger" onClick={() =>handleDeleteCategory(category.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <Link to={`/admin/sub-categories/${category.slug}`} className="btn btn-link btn-primary"><FontAwesomeIcon icon={faEye} /></Link>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default CategoryList;