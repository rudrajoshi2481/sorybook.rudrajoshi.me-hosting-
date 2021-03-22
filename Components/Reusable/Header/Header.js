import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarEnable, EditorData } from "../../Context/SidebarEnable";
import axios from "axios";
function Header() {
  const [showSidebar, setShowSidebar] = React.useContext(SidebarEnable);
  const [userData, setUserData] = React.useContext(EditorData);
  const [showLogin, setShowLogin] = React.useState(false);

  // useEffect(() => {
  //   console.log("NONONO");
  //   // axios
  //   //   .post("http://192.168.0.103:9000/api/useraccount/login")
  //   //   .then((data) => {console.log("DONE",data);})
  //   //   .catch((err) => console.log(err));

  // }, []);

  if (showSidebar) {
    return (
      <div>
        <Sidebar />
      </div>
    );
  } else {
    return (
      <nav
        style={{
          paddingTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "3vw",
          marginLeft: "5vw",
          paddingRight: "3vw",
          marginRight: "5vw",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <button
            className="sidebar-button-header"
            onClick={(e) => setShowSidebar(!showSidebar)}
          >
            {" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2.75C1 2.55109 1.07902 2.36032 1.21967 2.21967C1.36032 2.07902 1.55109 2 1.75 2H14.25C14.3485 2 14.446 2.0194 14.537 2.05709C14.628 2.09478 14.7107 2.15003 14.7803 2.21967C14.85 2.28931 14.9052 2.37199 14.9429 2.46299C14.9806 2.55398 15 2.65151 15 2.75C15 2.84849 14.9806 2.94602 14.9429 3.03701C14.9052 3.12801 14.85 3.21069 14.7803 3.28033C14.7107 3.34997 14.628 3.40522 14.537 3.44291C14.446 3.4806 14.3485 3.5 14.25 3.5H1.75C1.55109 3.5 1.36032 3.42098 1.21967 3.28033C1.07902 3.13968 1 2.94891 1 2.75V2.75ZM1 7.75C1 7.55109 1.07902 7.36032 1.21967 7.21967C1.36032 7.07902 1.55109 7 1.75 7H14.25C14.4489 7 14.6397 7.07902 14.7803 7.21967C14.921 7.36032 15 7.55109 15 7.75C15 7.94891 14.921 8.13968 14.7803 8.28033C14.6397 8.42098 14.4489 8.5 14.25 8.5H1.75C1.55109 8.5 1.36032 8.42098 1.21967 8.28033C1.07902 8.13968 1 7.94891 1 7.75V7.75ZM1.75 12C1.55109 12 1.36032 12.079 1.21967 12.2197C1.07902 12.3603 1 12.5511 1 12.75C1 12.9489 1.07902 13.1397 1.21967 13.2803C1.36032 13.421 1.55109 13.5 1.75 13.5H14.25C14.4489 13.5 14.6397 13.421 14.7803 13.2803C14.921 13.1397 15 12.9489 15 12.75C15 12.5511 14.921 12.3603 14.7803 12.2197C14.6397 12.079 14.4489 12 14.25 12H1.75Z"
                fill="white"
              />
            </svg>
          </button>

          <h1
            className={"brandName"}
            style={{ paddingLeft: "3vw", marginLeft: "3vw", fontSize: "26px" }}
          >
           Rudra Joshi
          </h1>
        </div>
        {/* <div
          className="headerbar-name-hide"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "5px",
            margin: "5px",
          }}
        >
          <p style={{ paddingRight: "1vw" }}>
            @{userData.userName ? userData.userName : " Not Login"}
          </p>
          <button
            className="profile-button"
            onClick={(e) => setShowLogin(!showLogin)}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.3333 16.75C31.3333 18.9602 30.4553 21.0798 28.8925 22.6426C27.3297 24.2054 25.2101 25.0834 23 25.0834C20.7898 25.0834 18.6702 24.2054 17.1074 22.6426C15.5446 21.0798 14.6666 18.9602 14.6666 16.75C14.6666 14.5399 15.5446 12.4203 17.1074 10.8575C18.6702 9.29466 20.7898 8.41669 23 8.41669C25.2101 8.41669 27.3297 9.29466 28.8925 10.8575C30.4553 12.4203 31.3333 14.5399 31.3333 16.75V16.75ZM27.1666 16.75C27.1666 17.8551 26.7276 18.9149 25.9462 19.6963C25.1648 20.4777 24.105 20.9167 23 20.9167C21.8949 20.9167 20.8351 20.4777 20.0537 19.6963C19.2723 18.9149 18.8333 17.8551 18.8333 16.75C18.8333 15.645 19.2723 14.5851 20.0537 13.8037C20.8351 13.0223 21.8949 12.5834 23 12.5834C24.105 12.5834 25.1648 13.0223 25.9462 13.8037C26.7276 14.5851 27.1666 15.645 27.1666 16.75V16.75Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 0.0833435C10.3437 0.0833435 0.083313 10.3438 0.083313 23C0.083313 35.6563 10.3437 45.9167 23 45.9167C35.6562 45.9167 45.9166 35.6563 45.9166 23C45.9166 10.3438 35.6562 0.0833435 23 0.0833435ZM4.24998 23C4.24998 27.3542 5.7354 31.3625 8.22498 34.5458C9.97338 32.2498 12.2289 30.3891 14.8155 29.109C17.402 27.8289 20.2494 27.1642 23.1354 27.1667C25.984 27.164 28.7956 27.8115 31.3561 29.06C33.9165 30.3084 36.1582 32.1248 37.9104 34.3708C39.7155 32.0033 40.9309 29.24 41.456 26.3096C41.9811 23.3791 41.8009 20.3657 40.9302 17.5187C40.0595 14.6717 38.5234 12.073 36.4489 9.93759C34.3745 7.80215 31.8213 6.19138 29.0008 5.23857C26.1802 4.28576 23.1733 4.01828 20.2289 4.45829C17.2844 4.89829 14.487 6.03312 12.0682 7.76887C9.64945 9.50463 7.67875 11.7914 6.31921 14.44C4.95966 17.0886 4.25036 20.0229 4.24998 23V23ZM23 41.75C18.6957 41.7565 14.5214 40.2757 11.1833 37.5583C12.5269 35.6349 14.3153 34.0644 16.3962 32.9806C18.4772 31.8968 20.7891 31.3317 23.1354 31.3333C25.4524 31.3315 27.7364 31.8825 29.7977 32.9405C31.8591 33.9985 33.6382 35.533 34.9875 37.4167C31.6235 40.2223 27.3804 41.7562 23 41.75V41.75Z"
                fill="white"
              />
            </svg>
          </button> */}
          {/* {showLogin ? <LoginForm showLogin={setShowLogin} /> : null} */}
        {/* </div> */}
      </nav>
    );
  }
}

const LoginForm = ({ showLogin }) => {
  const [userName, setUserName] = React.useState("");
  const [userPassword, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [userData, setUserData] = React.useContext(EditorData);
  const loginUserFun = () => {
    console.log("Function worked");
    axios
      .post("http://api.storybook.rudrajoshi.me/api/useraccount/login", {
        data: { userName, userPassword },
      })
      .then((reply) => {
        if (reply.data.length === 0) {
          setError(reply.data);
          console.log(reply.data ," 1524");
        }
        setUserData(reply.data[0]);
        showLogin(false), console.log(reply);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login-div">
      {/* {JSON.stringify(userData)} */}
      <span>Login </span>
      <br />
      <label>User Name</label>
      <input
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        className="input-login-div-userName"
        type="text"
        placeholder="jhondoe"
      ></input>
      <br />
      <label>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={userPassword}
        className="input-login-div-userName"
        type="password"
        placeholder="password"
      ></input>
      <br />
      <button
        style={{ width: "30%", padding: ".5em" }}
        onClick={(e) => loginUserFun()}
      >
        Login
      </button>
    </div>
  );
};

export default Header;
