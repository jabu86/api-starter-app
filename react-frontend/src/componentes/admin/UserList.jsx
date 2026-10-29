import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";
import Pagination from "../../componentes/admin/Pagination";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
function UserList({
  users,
  pagination,
  handlePageChange,
  assignUserRole
}) {
  return (
    <>
      {!users  || !users.length > 0 ? (
        <tr>
          <td style={{ textAlign: "center", padding: "20px" }} colSpan={4}>
            <img src={admin_loader} alt="Loading..." width="60" />
          </td>
        </tr>
      ) : (
        users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user?.Roles.map((role ) => (role.name))}</td>
            <td className="text-center">
              <button
                className="btn btn-info"
                onClick={() => assignUserRole(user)}
              >
                <FontAwesomeIcon icon={faUsers} />
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

export default UserList;
