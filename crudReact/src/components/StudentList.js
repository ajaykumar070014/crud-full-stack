import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  Typography, // Import Typography
} from "@mui/material";

const StudentList = ({ students, onUpdate, onDelete }) => {
  const [error, setError] = useState(null);

  const handleUpdate = async (student) => {
    try {
      await onUpdate(student); // assuming onUpdate is an async function
    } catch (err) {
      setError("Failed to update student. Please try again.");
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await onDelete(studentId); // assuming onDelete is an async function
    } catch (err) {
      setError("Failed to delete student. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Students List
      </Typography>
      {students && students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.studentEmail}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(student)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(student.studentId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ mt: 3 }}
        >
          No students available.
        </Typography>
      )}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default StudentList;
