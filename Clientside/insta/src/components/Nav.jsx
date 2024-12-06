import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Nav.css"

const Nav = ({user}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = (event) => {
    event.stopPropagation()
    setIsDropdownVisible((prevState) => !prevState)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownVisible(false)
      }
    }

    window.addEventListener("click", handleOutsideClick)
    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    navigate("/login")
  }
  return (
    <nav className="navbar">
      <div>
        <img src="insta.webp" alt="" />
      </div>
      <div className="right">
        <span className="username">{user}</span>
        <div onClick={toggleDropdown} style={{height:"30px",width:"30px",backgroundColor:"white",borderRadius:"50%"}}>
        <div className="dropdown">
        {isDropdownVisible && (
            <div className="dropcontent">
              <a>Profile</a><br/>
              <a className="logout" href="/Login" onClick={handleLogout} style={{ cursor: "pointer", textDecoration:"none"}}>
                Logout
              </a>
            </div>
          )}
        </div></div>
          {/* <button onClick={toggleDropdown} className="dropbtn1">▼</button> */}
          {/* <button className="login">
          <a href="/Login">
            Login
          </a>
        </button> */}
       
      </div> 
      </nav>
    
  )
}
export default Nav;