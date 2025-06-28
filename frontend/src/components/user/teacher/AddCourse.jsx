import React, { useState, useContext } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import { UserContext } from "../../../App";
import axiosInstance from "../../common/AxiosInstance";
import "../../css/AddCourse.css";

const AddCourse = () => {
  const { userData } = useContext(UserContext);
  const [addCourse, setAddCourse] = useState({
    userId: userData._id,
    C_educator: "",
    C_title: "",
    C_categories: "",
    C_price: "",
    C_description: "",
    sections: [],
  });

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseTypeChange = (e) =>
    setAddCourse((prev) => ({ ...prev, C_categories: e.target.value }));

  const addInputGroup = () =>
    setAddCourse((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { S_title: "", S_description: "", S_content: null },
      ],
    }));

  const handleChangeSection = (index, e) => {
    const updatedSections = [...addCourse.sections];
    const field = e.target.name.replace(/\[\d+\]\./, "");
    updatedSections[index][field] =
      field === "S_content" ? e.target.files[0] : e.target.value;
    setAddCourse((prev) => ({ ...prev, sections: updatedSections }));
  };

  const removeInputGroup = (index) =>
    setAddCourse((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(addCourse).forEach(([key, value]) => {
      if (key === "sections") {
        value.forEach((sec) => {
          formData.append("S_title", sec.S_title);
          formData.append("S_description", sec.S_description);
          if (sec.S_content) formData.append("S_content", sec.S_content);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const { data, status } = await axiosInstance.post(
        "/api/user/addcourse",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      status === 201 && data.success
        ? alert(data.message)
        : alert("Failed to create course");
    } catch (err) {
      console.error(err);
      alert("Upload failed (video must be .mp4)");
    }
  };

  /* ---------- render ---------- */
  return (
    <Card className="add-course-form">
      <Card.Body>
        <h3 className="mb-4 text-center">Create a New Course</h3>

        <Form onSubmit={handleSubmit}>
          {/* === Course Meta === */}
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="courseType">
                <Form.Label>Course Category</Form.Label>
                <Form.Select
                  value={addCourse.C_categories}
                  onChange={handleCourseTypeChange}
                  required>
                  <option value="">Select category</option>
                  <option>IT &amp; Software</option>
                  <option>Finance &amp; Accounting</option>
                  <option>Personal Development</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="courseTitle">
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  name="C_title"
                  value={addCourse.C_title}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Basics"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="educator">
                <Form.Label>Educator</Form.Label>
                <Form.Control
                  name="C_educator"
                  value={addCourse.C_educator}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price (Rs.)</Form.Label>
                <Form.Control
                  name="C_price"
                  value={addCourse.C_price}
                  onChange={handleChange}
                  placeholder="0 for free"
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="C_description"
                  value={addCourse.C_description}
                  onChange={handleChange}
                  placeholder="Brief course overview"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <hr className="my-4" />

          {/* === Sections === */}
          {addCourse.sections.map((sec, idx) => (
            <div key={idx} className="section-box">
              <Button
                variant="link"
                className="remove-section-btn"
                onClick={() => removeInputGroup(idx)}>
                ❌
              </Button>

              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Topic Title</Form.Label>
                    <Form.Control
                      name="S_title"
                      value={sec.S_title}
                      onChange={(e) => handleChangeSection(idx, e)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Content (video)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="video/mp4,image/*"
                      name="S_content"
                      onChange={(e) => handleChangeSection(idx, e)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Topic Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="S_description"
                      value={sec.S_description}
                      onChange={(e) => handleChangeSection(idx, e)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ))}

          {/* === Add Section / Submit === */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="outline-secondary"
              className="add-section-btn"
              onClick={addInputGroup}>
              ➕ Add Topic
            </Button>

            <Button type="submit">Submit Course</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddCourse;
