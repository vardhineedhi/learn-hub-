import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Button, Navbar } from "react-bootstrap";
import AllCourses from "./AllCourses";
import "../css/Home.css"; // We'll style separately for clean code

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h3 className="mb-0">
              📘 LearnHub: Your Center for Skill Enhancement
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto gap-3">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center text-center text-white">
        <Container>
          <h1 className="display-5 fw-bold">Small App, Big Dreams</h1>
          <p className="lead">
            Empowering you to elevate your education through accessible,
            impactful courses.
          </p>
          <Link to="/register">
            <Button variant="warning" size="lg" className="mt-3">
              Explore Courses
            </Button>
          </Link>
        </Container>
      </div>

      {/* Trending Courses Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">🔥 Trending Courses</h2>
        <AllCourses />
      </Container>
    </>
  );
};

export default Home;
