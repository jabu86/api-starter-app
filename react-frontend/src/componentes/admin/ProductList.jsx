import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
export default function ProductList({products, handleUpdateProduct ,handleDelete}) {
    return (
        <>
            {!products.length > 0 ?
                <tr>
                    <td style={{ textAlign: "center", padding: "20px" }} colSpan={9} >
                        <img
                            src={admin_loader}
                            alt="Loading..."
                            width="60"
                        />
                    </td>
                </tr>
                : products.map((product) => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category.name}</td>
                    <td>{product.brand.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.images.length}</td>
                    <td>{product.in_stock ? <button className="badge text-bg-success">in stock</button> : <span className="badge text-bg-warning">out of stock</span>}</td>
                    <td>{product.active ? <button type="button" className="btn btn-success">Active</button> : <button type="button" className="btn btn-danger">In Active</button>}</td>
                    <td className="table-active text-center">
                        <button className="btn btn-info" onClick={() => handleUpdateProduct(product)}><FontAwesomeIcon icon={faPencilAlt}/></button>
                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}><FontAwesomeIcon icon={faTrash}/></button>
                    </td>
                </tr>
            ))}
        </>
    )
}