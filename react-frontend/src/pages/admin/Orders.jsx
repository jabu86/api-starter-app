import { useEffect, useState } from "react";
import OrderList from "../../componentes/admin/OrderList.jsx";
import SearchBar from "../../componentes/admin/SearchBar.jsx";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const getOrders = async (page = 1, searchTerm = "") => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "5",
        search: searchTerm || "",
      });

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getOrders(1, "");
  }, []);

  const handlePageChange = (page) => {
    // setCurrentPage(currentPage);
    getOrders(page, search);
  };

  return (
    <div className="row g-0 mt-1 p-3">
      <div className="col-12 mb-1">
        <h2>Orders</h2>
        <SearchBar search={search} setSearch={setSearch} getData={getOrders} />
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
            <OrderList
              orders={orders}
              // pagination={pagination}
              // handlePageChange={handlePageChange}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
