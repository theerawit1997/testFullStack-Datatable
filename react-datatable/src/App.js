import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Image",
    selector: (row) => row.coverimage,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Detail",
    selector: (row) => row.detail,
  },
  {
    name: "Latitude",
    selector: (row) => row.latitude,
  },
  {
    name: "Longitude",
    selector: (row) => row.longitude,
  },
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchData = async (page) => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/attractions?page=${page}&per_page=${perPage}`
    );
    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/attractions?page=${page}&per_page=${newPerPage}`
    );
    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataTable
      title="Users"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
}

export default App;
