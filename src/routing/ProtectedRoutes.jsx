import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useGetUserProfileQuery } from "../app/services/authService";

const ProtectedRoute = () => {
  const { data: userInfo } = useGetUserProfileQuery();

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div style={{marginLeft:"40%"}} className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span style={{marginLeft:"35px"}}>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
