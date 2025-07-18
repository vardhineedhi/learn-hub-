import React, { useEffect, useState } from "react";
import axiosInstance from "../../common/AxiosInstance";
import { Link } from "react-router-dom";
import {
  Button,
  styled,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  Typography,
  Box,
  CircularProgress,
  tableCellClasses,
} from "@mui/material";
import "../../css/EnrolledCourses.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get("api/user/getallcoursesuser", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data.success) setCourses(data.data.filter(Boolean)); // drop nulls
      else alert(data.message);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ---------- UI ---------- */
  if (loading)
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box className="enrolled-container">
      <Typography variant="h5" className="enrolled-heading" gutterBottom>
        Enrolled Courses
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="enrolled courses">
          <TableHead>
            <TableRow>
              <StyledTableCell>Course ID</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Educator</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.length === 0 ? (
              /* ✅ correct empty-state placement */
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  You haven’t enrolled in any courses yet.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              courses.map((course) => (
                <StyledTableRow key={course._id}>
                  <StyledTableCell>{course._id}</StyledTableCell>
                  <StyledTableCell>
                    {course.C_title || "Untitled"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {course.C_educator || "Unknown"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {course.C_categories || "—"}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/courseSection/${encodeURIComponent(
                        course._id
                      )}/${encodeURIComponent(course.C_title)}`}>
                      <Button size="small" variant="contained" color="success">
                        Go to
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
