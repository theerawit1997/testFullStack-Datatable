import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    var url = `http://localhost:5000/api/attractions?page=${page}&per_page=${perPage}`;
    if (sortColumn) {
      url += `&sort_column=${sortColumn}&sort_direction=${sortDirection}`;
    }
    const response = await axios.get(url);
    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  }, [page, perPage, sortColumn, sortDirection]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    // console.log(column, sortDirection);
    setSortColumn(column.name);
    setSortDirection(sortDirection);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, page, perPage, sortColumn, sortDirection]);

  return (
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
  );
}

export default App;
