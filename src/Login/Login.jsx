/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";

// import { verifyUser } from "../Data/users";
import users from "../Data/users";

import Form from "react-bootstrap/Form";

import "./Login.css";
import AlertPass from "../Alert/AlertPass";

function Login({ setToken, setRole, setUsername, setName_surname }) {
  const userRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    // โหลดข้อมูลจาก LocalStorage
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const username = localStorage.getItem("username");
    const nameSurname = localStorage.getItem("nameSurname");

    if (token && role && username && nameSurname) {
      setToken(token);
      setRole(role);
      setUsername(username);
      setName_surname(nameSurname);
    }
  }, [setToken, setRole, setUsername, setName_surname]);

  const [isAlert, setIsAlert] = useState(false);

  return (
    <div className="login-container-background">
      <div className="login-container login-background">
        <img src="./img/MasterLogo.png" alt="logo" className="logo1" />
        <div className="username-input-container">
          <Form.Control
            type="text"
            id="username"
            placeholder="USERNAME"
            style={{
              textAlign: "center",
              border: "transparent",
              width: "300px",
              height: "55px",
              borderRadius: "28px",
              fontSize: "20px",
              fontFamily: "Unbounded",
              backgroundColor: "#d9d9d9",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            ref={userRef}
            className="username-input"
          />
        </div>
        <Form.Control
          type="password"
          id="password"
          placeholder="PASSWORD"
          style={{
            textAlign: "center",
            border: "transparent",
            width: "300px",
            height: "55px",
            borderRadius: "28px",
            fontSize: "20px",
            fontFamily: "Unbounded",
            backgroundColor: "#d9d9d9",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          ref={passRef}
          className="password-input"
        />
        <button
          className="btn mt-2 login-button"
          onClick={() => {
            const user = userRef.current.value.trim();
            const pass = passRef.current.value.trim();

            userRef.current.value = "";
            passRef.current.value = "";

            const storedData = localStorage.getItem("userData");
            const parsedStoredData = storedData ? JSON.parse(storedData) : [];

            const combinedUsers = [...users, ...parsedStoredData];

            const userInfo = combinedUsers.find(
              (u) => u.username === user && u.password === pass
            );

            if (userInfo) {
              // หากพบผู้ใช้
              setToken(userInfo.token);
              setRole(userInfo.role);
              setUsername(userInfo.username);
              setName_surname(userInfo.name_surname);
            } else {
              // หากไม่พบผู้ใช้

              setIsAlert(true);
              setTimeout(() => {
                setIsAlert(false);
              }, 1500);
              userRef.current.focus();
            }
          }}
        >
          Login
        </button>
        {isAlert && <AlertPass />}
        <button
          className="guestButton"
          onClick={() => {
            setToken("123");
            setRole("PublicGuest");
            setUsername("Guest");
            setName_surname("Guest User");
          }}
        >
          Report
        </button>
      </div>
      <div className="creditsContainer">
        <h3>Developed by :</h3>
        <div className="credits1">
          <div className="credit">
            <img src="./img/1.png" className="creditsImg" />
            <div>66012968 สิราวรรณ จันแดง</div>
          </div>
        </div>
        <div className="credits2">
          <div className="credit">
            <img src="./img/2.png" className="creditsImg" />
            <div>66048395 อารยา โฆษิตไกร</div>
          </div>
        </div>
        <div className="credits3">
          <div className="credit">
            <img src="./img/3.png" className="creditsImg" />
            <div>66085170 ศิรินทร์ จันทร์ทนต์</div>
          </div>
        </div>
        <div className="credits4">
          <div className="credit">
            <img src="./img/4.png" className="creditsImg" />
            <div>66080904 กันต์ณิษา อินตรา</div>
          </div>
        </div>
        <div className="credits5">
          <div className="credit">
            <img src="./img/5.png" className="creditsImg" />
            <div>66092117 ณัฐดนัย รอดมุ้ย</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
