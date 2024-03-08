import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./App.css"; // Import the CSS file for styling

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.coverimage,
    cell: (row) => <img src={row.coverimage} width={100} alt={row.name} />,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Detail",
    selector: (row) => row.detail,
    width: "750px",
  },
  {
    name: "Latitude",
    selector: (row) => row.latitude,
    width: "150px",
  },
  {
    name: "Longitude",
    selector: (row) => row.longitude,
    width: "150px",
  },
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [search, setSearch] = useState("");

  const API_BASE_URL = "http://localhost:5000/api/attractions";

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      var url = `${API_BASE_URL}?page=${page}&per_page=${perPage}`;
      if (search) {
        url += `&search=${search}`;
      }
      if (sortColumn) {
        url += `&sort_column=${sortColumn}&sort_direction=${sortDirection}`;
      }
      const response = await axios.get(url);
      setData(response.data.data);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, search, sortColumn, sortDirection]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(column.name);
    setSortDirection(sortDirection);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    // Trigger search immediately as the user types
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, page, perPage, sortColumn, sortDirection]);

  return (
    <div className="app-container">
      <form className="search-form">
        <label>
          Search:
          <input type="text" name="search" onChange={handleSearchChange} />
        </label>
      </form>
      <DataTable
        title="Attractions"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSort={handleSort}
      />
    </div>
  );
}

export default App;
