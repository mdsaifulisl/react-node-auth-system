// Home.jsx
import { useState } from "react";
import InterOtp from "../components/InterOtp";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [message, setMessage] = useState("");
  const [otpModal, setOtpModal] = useState(false); 

  // Modal close
  const handleClose = () => {
    setOtpModal(false);
    setMessage("");
    setName("");
    setEmail("");
    setPassword(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Submitting...");
    setMessage("");

    const user = { name, email, password };

    try {
      const res = await axios.post("http://localhost:3000/api/register", user);
      setMessage(res.data.message);
      setOtpModal(true); 
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitBtn("Submit");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>

              {message && (
                <div className="alert alert-danger text-center">{message}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {submitBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={otpModal ? "otp-section active" : "otp-section close"}>
      <InterOtp handleClose={handleClose} email={email} password={password} />
      </div>

        

    </div>
  );
}

export default Register;
