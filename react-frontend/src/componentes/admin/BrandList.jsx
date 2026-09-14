import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import Pagination from "../../componentes/admin/Pagination";
function BrandList({
  brands,
  handleEditBrand,
  handleDeleteBrand,
  pagination,
  handlePageChange,
}) {
  return (
    <>
      {!brands  || !brands.length > 0 ? (
        <tr>
          <td style={{ textAlign: "center", padding: "20px" }} colSpan={3}>
            <img src={admin_loader} alt="Loading..." width="60" />
          </td>
        </tr>
      ) : (
        brands.map((brand) => (
          <tr key={brand.id}>
            <td>{brand.name}</td>
            <td>
              <img
                src={`http://localhost:8000/images${brand.image}`}
                width={100}
                alt={brand.name}
              />{" "}
            </td>
            <td className="text-center">
              <button
                className="btn btn-info"
                onClick={() => handleEditBrand(brand)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteBrand(brand.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))
      )}
      <tr>        
        {/* Pagination */}
        <Pagination pagination={pagination} handlePageChange={handlePageChange} colSpan={3}/>
      </tr>

    </>
  );
}

export default BrandList;
