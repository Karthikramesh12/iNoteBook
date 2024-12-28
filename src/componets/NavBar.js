import React ,{useEffect}from 'react';
import {
    Link,
    useLocation,
    useNavigate
  } from "react-router-dom";
const NavBar = (props) => {
  let location = useLocation();
  let navigate  = useNavigate();
  useEffect(()=>{
    console.log(location.pathname)
  },[location]);
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={props.myStyle}>
  <div className="container-fluid">
    <Link className={`navbar-brand text-${props.mode}`} to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"? "active": ""} text-${props.mode}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"?"active": ""} text-${props.mode}`}  to="/about">About</Link>
        </li>
      </ul>
      <button type="button" onClick={props.toggle} className={`btn btn-${props.mode} mx-2`} data-bs-toggle="button" aria-pressed="true">{props.btntext}</button>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className={`btn btn-${props.mode} mx-1`} to="/login" role="button">Login</Link>
        <Link className={`btn btn-${props.mode}`} to="/signup" role="button">Sign Up</Link>
      </form>: <Link className={`btn btn-${props.mode} mx-1`} to="/login" role="button" onClick={handleLogout}>Log out</Link>}
    </div>
  </div>
</nav>
    </>
  );
}

export default NavBar;
