import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import Pagination from "../../componentes/admin/Pagination";
export default function ProductList({
  products,
  pagination,
  handleUpdateProduct,
  handleDelete,
  handlePageChange,
}) {
  return (
    <>
    
      {!products || !products.length === 0 ? (
        <tr>
          <td style={{ textAlign: "center", padding: "20px" }} colSpan={9}>
            <img src={admin_loader} alt="Loading..." width="60" />
          </td>
        </tr>
      ) : (
        products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.category.name}</td>
            <td>{product.brand.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.images.length}</td>
            <td>
              {product.in_stock ? (
                <button className="badge text-bg-success">in stock</button>
              ) : (
                <span className="badge text-bg-warning">out of stock</span>
              )}
            </td>
            <td>
              {product.active ? (
                <span type="button" className="badge text-bg-success">
                  Active
                </span>
              ) : (
                <span  className="badge text-bg-danger">
                  In Active
                </span>
              )}
            </td>
            <td className="text-center">
              <button
                className="btn btn-info"
                onClick={() => handleUpdateProduct(product)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(product.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))
      )}

      {/* Pagination */}
      <Pagination pagination={pagination} handlePageChange={handlePageChange}/>
    
    </>
  );
}
