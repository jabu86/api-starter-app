import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
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

                    <td className="table-active text-center">
                        <button className="btn btn-info" onClick={() => handleEditCategory(category)}><FontAwesomeIcon icon={faPencilAlt}/></button>
                        <button className="btn btn-danger" onClick={() =>handleDeleteCategory(category.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default CategoryList;