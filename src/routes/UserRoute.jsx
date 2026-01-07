import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 
  if (!token || role !== "user") {
    return <Navigate to="/" />;
  }
  return children;
}
