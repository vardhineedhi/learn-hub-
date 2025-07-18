import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import UserHome from "./UserHome";
import { Container } from "react-bootstrap";
import AddCourse from "../user/teacher/AddCourse";
import StudentHome from "../user/student/StudentHome";
import AdminHome from "../admin/AdminHome";
import { UserContext } from "../../App";
import EnrolledCourses from "../user/student/EnrolledCourses";
import CourseContent from "../user/student/CourseContent";
import AllCourses from "../admin/AllCourses";
import "../css/Dashboard.css"; // Updated styles for responsiveness

const Dashboard = () => {
  const user = useContext(UserContext);
  const [selectedComponent, setSelectedComponent] = useState("home");

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "home":
        return <UserHome />;
      case "addcourse":
        return <AddCourse />;
      case "enrolledcourese":
        return <EnrolledCourses />;
      case "cousreSection":
        return <CourseContent />;
      case "cousres":
        return <AllCourses />;
      default:
        return <UserHome />;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <NavBar setSelectedComponent={setSelectedComponent} dark />
      <Container className="py-4 px-3" style={{ color: "" }}>
        {renderSelectedComponent()}
      </Container>
    </div>
  );
};

export default Dashboard;
