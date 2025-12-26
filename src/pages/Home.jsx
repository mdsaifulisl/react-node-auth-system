import { useAuth } from "../context/AuthContext";

function Home() {
  const { isLoggedIn, userEmail } = useAuth();

  return (
    <div
      className="container-fluid bg-dark text-white d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2>{isLoggedIn ? "You are logged in" : "You are not logged in"}</h2>
      <p>
        {isLoggedIn ? (
          <>
            Your Email is <span style={{ color: "red" }}>{userEmail}</span>
          </>
        ) : (
          ""
        )}
      </p>
    </div>
  );
}

export default Home;
