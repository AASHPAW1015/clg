import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to Hospital APIs</h1>

      <div>
        <button onClick={() => navigate("/login")}>LOGIN</button>
      </div>

      <br />

      <div>
        <button onClick={() => navigate("/register")}>REGISTER</button>
      </div>
    </>
  );
}
