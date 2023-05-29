import "./index.css";
import Logo from "./assets/logo.svg";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { async } from "q";

function App() {
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");

  const verifyStudent = async (studentId) => {
    try {
      const response = await fetch(`https://farewell.jayantkhanna.in/verifyStudent?student_id=${studentId}`);
      // if (response.ok) {
      //   console.log("Student verified successfully!");
      // } else if (response.status === 400) {
      //   console.log("Invalid student ID");
      // } else {
      //   console.error("Failed to verify student");
      // }
  
      const responseData = await response.json(); 
      console.log(responseData); 
      setData2(responseData);
    } catch (error) {
      console.error("Error occurred while verifying student", error);
    }
  };
  return (
    <div className="App">
      <div className="logo">
        <img src={Logo} className="App-logo" alt="logo" />
      </div>
      <div className="qr-wrap">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              verifyStudent(result?.text)
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%", heigth: "100%" }}
        />
      </div>
      <div className="output">
        <h1>{data}</h1>
        <p>{data2}</p>
      </div>
      {/* <p>{data}</p> */}

    </div>
  );
}

export default App;
