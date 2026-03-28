import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
function BrandList({brands, handleEditBrand , handleDeleteBrand}) {
    return (
        <>
            {!brands.length > 0 ?
                <tr>
                    <td style={{ textAlign: "center", padding: "20px" }} colSpan={9}>
                        <img
                            src={admin_loader}
                            alt="Loading..."
                            width="60"
                        />
                    </td>
                </tr>
                : brands.map((brand) => (
                <tr key={brand.id}>
                    <td>{brand.name}</td>
                    <td><img src={`http://localhost:8000/images${brand.image}`} width={100} alt={brand.name}/> </td>
                    <td className="text-center">
                        <button className="btn btn-info" onClick={() => handleEditBrand(brand)}><FontAwesomeIcon icon={faPencilAlt}/></button>
                        <button className="btn btn-danger" onClick={() =>handleDeleteBrand(brand.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default BrandList;