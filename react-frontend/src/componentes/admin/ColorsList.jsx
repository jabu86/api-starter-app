import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt, faEye,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import {Link} from "react-router-dom";
function ColorsList({colors, handleEditColor , handleDeleteColor}) {
    return (
        <>
            {!colors.length > 0 ?
                <tr>
                    <td style={{ textAlign: "center", padding: "20px" }} colSpan={9}>
                        <img
                            src={admin_loader}
                            alt="Loading..."
                            width="60"
                        />
                    </td>
                </tr>
                : colors.map((color) => (
                <tr key={color.id}>
                    <td>{color.name}</td>
                    <td className="text-center">
                        <button className="btn btn-info" onClick={() => handleEditColor(color)}><FontAwesomeIcon icon={faPencilAlt}/></button>
                        <button className="btn btn-danger" onClick={() =>handleDeleteColor(color.id)}><FontAwesomeIcon icon={faTrash} /></button>

                    </td>
                </tr>
            ))}
        </>
    )
}

export default ColorsList;