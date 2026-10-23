import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import Pagination from "../../componentes/admin/Pagination";
function OrderList({
  orders,
 
}) {
  return (
    <>
      {!orders  || !orders.length > 0 ? (
        <tr>
          <td style={{ textAlign: "center", padding: "20px" }} colSpan={3}>
            <img src={admin_loader} alt="Loading..." width="60" />
          </td>
        </tr>
      ) : (
        orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
           
            <td className="text-center">
             
            </td>
          </tr>
        ))
      )}
      <tr>        
        {/* Pagination */}
        {/* <Pagination pagination={pagination} handlePageChange={handlePageChange} colSpan={3}/> */}
      </tr>

    </>
  );
}

export default OrderList;
