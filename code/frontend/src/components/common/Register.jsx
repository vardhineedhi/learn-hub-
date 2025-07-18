import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dropdown from "react-bootstrap/Dropdown";
import axiosInstance from "./AxiosInstance";

import "../css/Register.css"; // custom styles here

const Register = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Select User");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setData({ ...data, type: eventKey });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.type) {
      return alert("Please fill all fields");
    } else {
      axiosInstance
        .post("/api/user/register", data)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
            navigate("/login");
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  return (
    <div className="register-bg d-flex align-items-center justify-content-center">
      <Container component="main" maxWidth="xs">
        <Box
          className="register-box"
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
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
            <div className="form-group my-3">
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-light" className="w-100">
                  {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item onClick={() => handleSelect("Student")}>
                    Student
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("Teacher")}>
                    Teacher
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "blue", textDecoration: "underline" }}>
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
