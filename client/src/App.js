import React, { lazy, Suspense } from "react";
import "./index.css";
import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";


const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminBookings = lazy(() => import("./pages/Admin/AdminBookings"));
const AdminFlights = lazy(() => import("./pages/Admin/AdminFlights"));
const AdminUsers = lazy(() => import("./pages/Admin/AdminUsers"));
const Home = lazy(() => import("./pages/Home"));
const BookNow = lazy(() => import("./pages/BookNow"));
const Bookings = lazy(() => import("./pages/Bookings"));


function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      {loading && <Loader />}
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Index />
                </PublicRoute>
              }
            />
       

            <Route
              path="/easy-booking"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/book-now/:id"
              element={
                <ProtectedRoute>
                  <BookNow />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/flights"
              element={
                <ProtectedRoute>
                  <AdminFlights />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
