import "./styles.css";
import React, { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import card from "./images/x.png";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [scan, setScan] = useState(false);
  const [details, setDetails] = useState({});
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const sendTransaction = async () => {
    setLoading(true);
    try {
      let res = await fetch("https://tedx-geu.herokuapp.com/verify-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId: transactionId }),
      });
      res = await res.json();
      console.log(res);
      if (res!='error') {
        setDetails(res);
        setOpen(true);
      } else {
        alert("Invalid Entry!");
      }
      setLoading(false);
    } catch (e) {
      alert("Error!");
      setLoading(false);
    }
  };

  const handleScan = async (scanData) => {
    if (scanData != null) {
      setLoading(true);
      // setOpen(true);
      console.log(`loaded data data`, scanData);
      try {
        let res = await fetch("https://tedx-geu.herokuapp.com/verify-qr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionId: scanData }),
        });
        res = await res.json();
        console.log(res);
        if (res!='error') {
          setDetails(res);
          setOpen(true);
        } else {
          alert("Invalid QR Code!");
        }
        setLoading(false);
      } catch (e) {
        alert("Error!");
        setLoading(false);
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="App">
      <h1>Scan your QR </h1>
      {loading?(
        <div className="loader-holder">
          <CircularProgress color="secondary" size={80} />
        </div>
      ):(<>
        <div className="qr-wrap">
          <QrReader
            // facingMode={selected}
            // delay={500}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px", heigth: "140px" }}
          />
        </div>
        <p>or</p>
        <h1>Transaction-Id</h1>
        <div className="trasaction-code">
          <input
            type="text"
            placeholder="Transaction Id"
            onChange={(e) => setTransactionId(e.target.value)}
          />
          <button
            onClick={() => {
              sendTransaction();
            }}
          >
            Submit
          </button>
        </div>
      </>)}
      {/* )} */}
      <div className="modal-wrap" >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div className="modal-img">
            <div className="card-details">

            <h3>{details?.name}</h3>
            <p>@{details?.email?.split("@")[0]}</p>
            <p>{details?.verified?"Already Verified":"Welcome"}</p>
            </div>
            <img src={card} alt="" />
            {/* <img src={card} alt="" /> */}
            <button onClick={()=>{setOpen(false);setLoading(false);}}>Scan again</button>
          </div>
          </Box>
          {/* <button>Scan again</button> */}
        </Modal>
      </div>
    </div>
  );
};

export default App;
