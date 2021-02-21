import React, { useContext } from "react";
import axios from "axios";
import Link from 'next/link'
import {EditorData} from '../Components/Context/SidebarEnable'
import router from 'next/router'
function admin() {

  const [userData,setUserData] = useContext(EditorData)

  const [email, setEmail] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [error, setError] = React.useState("no Error");
  const [showError, setShowError] = React.useState(false);

  const verifyAuth = (e) => {
    e.preventDefault();
    axios
      .post("http://65.1.132.27/api/useraccount/login", { data: { userEmail: email, userPassword: passwd } })
      .then((getData) => {
        console.log(getData.data.clientToken);
        console.log(getData.data.dataLogin);
        // setUserData(getData)
        let {userEmail} = getData.data.dataLogin
        let jwtToken = getData.data.clientToken;

        setUserData({userEmail:userEmail,jwtToken:jwtToken,isAdmin:true})

        // localStorage.setItem('adminDetails',[{userEmail:userEmail,jwtToken:jwtToken,isAdmin:true}])

        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <h1><Link href="/">Story Book</Link></h1>
    {/* {JSON.stringify(userData,' ',2)} */}
    
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* <h1>Admin Place</h1> */}

      {showError ? <p style={{ color: "red" }}>{error}</p> : null}

      <div>
        <form>
          {/* <label>user Name</label> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "5px", margin: "5px", fontSize: "22px" }}
            placeholder="jhonDoe@gmail.com"
            type="text"
          ></input>
          <br />
          {/* <label>user Name</label> */}
          <input
            onChange={(e) => setPasswd(e.target.value)}
            placeholder="password"
            style={{ padding: "5px", margin: "5px", fontSize: "22px" }}
            type="password"
          ></input>
          <br />
          <button
            onClick={(e) => {
              verifyAuth(e);
            }}
            type="submit"
            style={{ padding: "5px", margin: "5px", fontSize: "22px" }}
          >
            {" "}
            Login{" "}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default admin;
