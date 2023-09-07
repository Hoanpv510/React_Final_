import { useNavigate } from "react-router-dom";
HomePage.propTypes = {};

function HomePage() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `login`;
    navigate(path);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "red" }}>Đây Là Trang Chủ Tạm Thời</h1>

      <button onClick={routeChange} className="btn btn-danger me-5 fs-3 mt-5">
        Login
      </button>
    </div>
  );
}

export default HomePage;
