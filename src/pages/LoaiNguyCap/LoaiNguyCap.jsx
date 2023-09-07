import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { FaBackward, FaForward, FaPlus, FaSearch } from "react-icons/fa";
import { GiSheep } from "react-icons/gi";
import { PiWarningDuotone } from "react-icons/pi";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Loai.css";

function Loai() {
  const [listAnimals, setListAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage, setItemsPerPage] = useState(10); // Số mục trên mỗi trang
  const itemsPerPageOptions = [5, 10, 20, 50]; // Các tùy chọn số mục trên mỗi trang
  const [pagination, setPagination] = useState({
    page: 1,
    perpage: 10,
  });

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `./them-moi`;
    navigate(path);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    // Gọi API tại đây hoặc sử dụng useEffect để tự động gọi lại API
    const newFilters = { ...filters };
    newFilters.search = e.target.value;
    setFilters(newFilters);
  };
  const [filters, setFilters] = useState({
    perpage: 10,
    page: 1,
  });
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    axios
      .get(
        `https://wlp.howizbiz.com/api/species?paginate=true&${paramsString}&with=roles,createdBy&search=${searchQuery}&inactive=-1`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            ten: searchQuery,
            perpage: itemsPerPage, // Sử dụng trường "Tên" cho tìm kiếm
          },
        }
      )
      .then((response) => {
        const dataArray = response.data; // Trích xuất mảng từ thuộc tính "data"
        setListAnimals(dataArray.list);
        setPagination(dataArray.pagination); // Gán mảng vào trạng thái data
        // setMyUser(response.data);

        setCurrentPage(pagination.page);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [
    filters,
    access_token,
    searchQuery,
    itemsPerPage,
    pagination.total,
    pagination.page,
  ]);

  const pageCount = Math.ceil(pagination.total / pagination.itemsPerPage);

  const handlePageClick = (event) => {
    setFilters({
      ...filters,
      page: +event.selected + 1,
    });
  };
  const handleUpdateClick = (id) => {
    navigate(`./update/${id}`);
  };
  return (
    <>
      <div>
        <div className="animal__content ">
          <div className="title__loainguycap">
            <GiSheep className="title__icon" />
            <h4>Loài nguy cấp quý hiếm</h4>
          </div>
          <div className="form_search d-flex justify-content-between">
            <div className="input_seacrh-user">
              <FaSearch className="icon_seacrh" />
              <input
                className="input__search border-0"
                type="seacrh"
                placeholder="Tìm kiếm theo tên hoặc số điện thoại"
                size="100"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={routeChange}
              className="btn btn-danger btn__formsearch nowrap"
            >
              <FaPlus /> Thêm mới
            </button>
          </div>
          <div className="animal__board">
            <Table striped bordered hover className="list__animal">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Tên khoa học</th>
                  <th>Giới</th>
                  <th>Ngành</th>
                  <th>Lớp</th>
                  <th>Bộ</th>
                  <th>Họ</th>
                  <th>Chi</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {listAnimals &&
                  listAnimals.length > 0 &&
                  listAnimals.map((item, index) => (
                    <tr key={`users- ${index}`}>
                      <td>
                        <img
                          className="avatar me-2"
                          src={
                            "http://wlp.howizbiz.com/" +
                            item?.attachments[0]?.path
                          }
                          alt=""
                        />
                        {item.ten}
                      </td>
                      <td>{item.ten_khoa_hoc}</td>
                      <td>{item.kingdom.ten}</td>
                      <td>{item.phylumn.ten}</td>
                      <td>{item.class.ten}</td>
                      <td>{item.order.ten}</td>
                      <td>{item.family.ten_khoa_hoc}</td>
                      <td>{item.genus.ten_khoa_hoc}</td>
                      <td className="action">
                        <div className="action__icongroup">
                          <div
                            onClick={() => handleUpdateClick(item.id)}
                            className="action__icongroup--update"
                          >
                            <BsPencilFill className="icon__action" />
                          </div>
                          <div onClick={() => handleDelete(item.id)}>
                            <BsTrash className="icon__action" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="pagination-info">
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, pagination.itemsPerPage)}/
              {pagination.total}
            </div>
            <ReactPaginate
              breakLabel="..."
              previousLabel={<FaBackward />}
              nextLabel={<FaForward />}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              renderOnZeroPageCount={null}
            />

            <div className="items-per-page">
              <select
                className="select__perpage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} / trang
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        z-index={999999}
      />
      <div className="toast__notetify d-none">
        <div className="">
          <PiWarningDuotone className="toast__notetify--icon" />
        </div>
        <h3>Do you want to Delete ? </h3>
        <div className="btn__deletegroup">
          <button className="btn btn-success">YES</button>
          <button className="btn btn-secondary">NO</button>
        </div>
      </div>
      ;
    </>
  );

  function handleDelete(id) {
    const conf = window.confirm("Bạn có muốn xóa loài này không ??? ");
    if (conf) {
      axios
        .delete("https://wlp.howizbiz.com/api/species/" + id, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          alert("Loài bạn chọn đã được xóa");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }
}
export default Loai;
