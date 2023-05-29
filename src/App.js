import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

function App() {
  const [data, setData] = useState("No result");
  return (
    <div className="App">
      <div className="qr-wrap">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "300px", heigth: "140px" }}
        />
      </div>
      <p>{data}</p>
    </div>
  );
}

export default App;
