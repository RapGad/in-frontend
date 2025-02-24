import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { sidebarLinks } from "../components/sidebar-data";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";


const Dashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user,loading,error} = useSelector((state) => state.auth);


  const handleLogout = async() => {
    dispatch(logoutUser());
  };

  if(error){
    return <p>Error: {error}</p>
  }

  return (
    <div className="db-container">
      <div className="dashboard-container">
        {/* Menu Button for Mobile */}
        <button
          className="menu-btn d-lg-none"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          {/* Close Button */}
          <button
            className="close-btn d-lg-none"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>

          <div className="account text-center">
            <p className="text-light text-center">{user.username}</p>
          </div>
          <nav className="nav flex-column mt-4 ">
          {sidebarLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="nav-link" 
                onClick={() => setSidebarOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button className="logout-btn" onClick={handleLogout}>{loading ? 'Logging out...' : 'Logout'}</button>
        </aside>

        {/* Main Content */}
        <main className="content flex-grow-1 p-4">

        <Outlet />
          
        </main>
      </div>
    </div>
  );
};


export default Dashboard;
