import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axiosInstance from "./AxiosInstance";

import "../css/Login.css"; // We'll add a custom style file

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return alert("Please fill all fields");
    }

    axiosInstance
      .post("/api/user/login", data)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message); // You can use toast here later
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userData));
          navigate("/dashboard");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("User doesn't exist");
        }
        navigate("/login");
      });
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center">
      <Container component="main" maxWidth="xs">
        <Box
          className="login-box"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "white",
          }}>
          <Avatar sx={{ bgcolor: "#00d1ff", mb: 1 }} />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box mt={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>
            <Grid container justifyContent="center">
              <Grid item>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "#00d1ff  ", textDecoration: "underline" }}>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
