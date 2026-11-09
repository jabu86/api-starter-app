import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import Pagination from "../../componentes/admin/Pagination";
import {Link} from "react-router-dom";

function OrderList({
  orders,
  pagination,
  handlePageChange
}) {
  return (
    <>
      {!orders  || !orders.length > 0 ? (
        <tr>
          <td style={{ textAlign: "center", padding: "20px" }} colSpan={6}>
            <img src={admin_loader} alt="Loading..." width="60" />
          </td>
        </tr>
      ) : (
        orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.user &&  order.user.name} {" "}{order.user &&  order.user.email}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>R {order.total}</td>
            <td>{order.is_paid ?  order.paid_at.substring(0,10) : (<p className="text-danger text-center">X</p>)}</td>
            <td>{order.is_delivered ?  order.paid_at.substring(0,10) : (<p className="text-danger text-center">X</p>)}</td>
              <td><Link to={`/order/${order.id}`}><button className="btn btn-link btn-info">Details</button></Link></td>
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

export default OrderList;
