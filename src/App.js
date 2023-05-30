import "./index.css";
import Logo from "./assets/logo.svg";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

function App() {
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const [scanning, setScanning] = useState(true);

  const verifyStudent = async (studentId) => {
    try {
      const response = await fetch(
        `https://farewell.jayantkhanna.in/verifyStudent?student_id=${studentId}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setData2(responseData);
    } catch (error) {
      console.error("Error occurred while verifying student", error);
    }
  };
  const handleResult = (result, error) => {
    if (!!result && scanning) {
      setScanning(false);
      setData(result?.text);
      verifyStudent(result?.text);
    }

    if (!!error) {
      console.info(error);
    }
  };
  const handleScanAgain = () => {
    setScanning(true);
    setData("");
    setData2("");
  };
  return (
    <div className="App">
      <div className="logo">
        <img src={Logo} className="App-logo" alt="logo" />
      </div>
      <div className="qr-wrap">
        {scanning && (
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={handleResult}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      {!scanning && (
        <div 
          onClick={handleScanAgain}
        className="output | output-btn">
          <h1>Scan Again</h1>
        </div>
      )}
      <div className="output">
        <h1>{data}</h1>
        <p>{data2}</p>
      </div>
      {/* <p>{data}</p> */}
    </div>
  );
}

export default App;
