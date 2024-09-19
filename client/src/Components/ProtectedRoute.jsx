import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated = true, // Default to true if not provided
  children,
  adminOnly = false, // Default to false if not provided
  admin = false, // Default to false if not provided
  confirmUser = true, // Default to true if not provided
  redirect = "/",
}) {
  if (typeof isAuthenticated !== "undefined" && !isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (adminOnly && !admin) return <Navigate to={redirect} />;

  if (!confirmUser) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
}
