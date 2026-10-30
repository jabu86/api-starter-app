import { useEffect, useState } from "react";
import SearchBar from "../../componentes/admin/SearchBar.jsx";
import UserList from "../../componentes/admin/UserList.jsx";
import Modal from "../../componentes/admin/Modal.jsx";
import  UserForm from "../../componentes/admin/UserForm.jsx";
import {useNavigate} from "react-router-dom";
import {
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../../componentes/admin/Breadcrumb.jsx";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
function Users({ openModal, show }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });
  const [initialData, setInitialData] = useState({});
  const [errors, setErrors] = useState({});

  const getUsers = async (page = 1, searchTerm = "") => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: searchTerm || "",
      });

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/users?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/users/roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRoles(data.userRoles);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUsers(1, "");
    getRoles()
  }, []);

  const handlePageChange = (page) => {
    // setCurrentPage(currentPage);
    getUsers(page, search);
  };
  const assignUserRole = async (user) => {
    openModal(show)
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/login");
    //   return;
    // }
    // try {
    //   const payload = {
    //     user_id: user.id,
    //     role_id: user.Roles?.[0]?.id,
    //   }
    //   const res = await fetch(`/api/admin/users/assign-role`, {
    //     method: "POST",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //
    // }catch (err) {
    //   console.log(err.response)
    //
    // }

   setInitialData(user);
  }

  const handleUpdateUserRole = (form) => {
    console.log(form);
  }
  return (
      <>
        <Breadcrumb route1={'/admin'} route2={'/admin/users'} parentPage={'Dashboard'} page={`Users`}  icon1={faDashboard} icon2={faUsers} />
    <div className="row p-2">
      <div className="col-12 mb-1">
        <SearchBar search={search} setSearch={setSearch} getData={getUsers} />
        <table className="table table-responsive mt-4">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">ASSIGN ROLE</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <UserList
              users={users}
              pagination={pagination}
              handlePageChange={handlePageChange}
              assignUserRole={assignUserRole}
              show={show}
            />
          </tbody>
        </table>
      </div>
      {show && (
          <Modal
              openModal={openModal}
              show={show}
              title="Assign User Role"
              closeModal={() => openModal(false)}
          >
            <UserForm
                errors={errors}
                onSubmit={handleUpdateUserRole}
                closeModal={openModal}
                initialData={initialData}
                roles={roles}
            />
          </Modal>
      )}
    </div>
        </>
  );
}

export default Users;
