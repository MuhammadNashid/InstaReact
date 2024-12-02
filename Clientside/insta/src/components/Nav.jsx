
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
const Nav = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getUser");
      const res = await response.json();
      // console.log(res)
      setData([...res]);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(data);

  return (
    <div>
      <nav>
        <Link to={'/Login'}>
          <button>login</button>
          </Link>
        {data.map((user,index)=>(
            <Link to={`${user._id}`}>
          <div key={index}>name:{user.name}</div>
              <div>
                  <button>▼</button>
                  <div>
                    <a>Profile</a>
                    <a>Logout</a>
                  </div>
              </div>
          </Link>     
        ))}
      </nav>
      <div className="">
        {data.map((item, index) => (
          <Link to={`${item._id}`}>
            <div key={index} className="card">
              <div>
                <img src={item.pic} alt="" />
              </div>
              <div>Name: {item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nav;