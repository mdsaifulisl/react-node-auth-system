import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();

  // STEP 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email required");
      return;
    }
    const response = await axios.post("http://localhost:3000/api/forgot-otp", { email });
    setMessage(response.data.message);
    setStep(2); // go to OTP step
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setMessage("OTP required");
      return;
    }

    const response = await axios.post("http://localhost:3000/api/forgot-verify-otp", { email, otp });
    setMessage(response.data.message);
    setStep(3); // go to password step
  };

  // STEP 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password) {
      setMessage("Password required");
      return;
    }
    const response = await axios.post("http://localhost:3000/api/set-new-password", { email, password });
    setMessage(response.data.message);
    
    setMessage(response.data.message);
    navigate("/");
    setStep(1);
    setEmail("")
    setOtp("")
    setPassword("")
  };
 
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">

        {/* STEP 1: Email */}
        {step === 1 && (
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="text-center mb-3">Enter your email</h4>
                {message && <p className="text-danger text-center">{message}</p>}

                <form onSubmit={handleSendOtp}>
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="btn btn-primary w-100">Send OTP</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="text-center mb-3">Verify OTP</h4>
                <p className="text-center">Enter the OTP sent to your email</p>
                {email && <p className="text-center">Email: {email}</p>}

                <form onSubmit={handleVerifyOtp}>
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button className="btn btn-primary w-100">Verify OTP</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Password */}
        {step === 3 && (
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="text-center mb-3">Reset Password</h4>
                {message && <p className="text-success text-center">{message}</p>}

                <form onSubmit={handleResetPassword}>
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn btn-success w-100">
                     Set New Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;
