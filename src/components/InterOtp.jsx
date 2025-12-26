import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function InterOtp({ handleClose, email, password }) {
  console.log("email", email); 
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/verify-otp", {
        email,
        password,
        otp,
      });
      setMessage(res.data.message);
      if (res.data.message === "OTP verified successfully");
      handleClose();
      navigate("/");
      alert("OTP verified successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleModalClose = () => {
    handleClose();
    setMessage("");
  };

  return (
    <div>
      <div className="container">
        <button onClick={handleModalClose} className="btn btn-danger close-btns">
          Close
        </button>
        <h3 className="text-center">Verify Your Email</h3>
        <p className="text-center">
          We have sent a verification code to your email
        </p>
        {message && <p className="text-center text-danger">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group otp">
            <label htmlFor="otp">Please enter the code</label>
            <input
              type="number"
              id="otp"
              placeholder="Code"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Verify OTP
          </button>
        </form>
      </div>

      {/* <div className="password">
        <h4 className="text-center"> Set Password</h4>
        <form action="">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" className="form-control" />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Set Password
          </button> 
        </form>
      </div> */}
    </div>
  );
}

export default InterOtp;
