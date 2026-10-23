import { useEffect, useState } from "react";
import OrderList from "../../componentes/admin/OrderList.jsx";
import SearchBar from "../../componentes/admin/SearchBar.jsx";
import axios from 'axios'

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const getUsers = async (page = 1, searchTerm = "") => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "5",
        search: searchTerm || "",
      });
      
      
      // const data = await res.json();
      // setOrders(data.brands || []);
      // setPagination(data.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(1, "");
  }, []);

  const handlePageChange = (page) => {
    // setCurrentPage(currentPage);
    getUsers(page, search);
  };

  return (
    <div className="row g-0 mt-1 p-3">
      <div className="col-12 mb-1">
        <h2>Users</h2>
        <SearchBar search={search} setSearch={setSearch} getData={getUsers} />
        <table className="table table-responsive mt-4">
          <caption>List of brands</caption>
          <thead>
            <tr>
              <th>BRAND</th>
              <th>IMAGE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {/* <OrderList
              brands={orders}
              pagination={pagination}
              handlePageChange={handlePageChange}
            /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
