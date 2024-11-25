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
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Card,
    CardContent,
    TextField,
    Box,
} from "@mui/material";
import * as yup from "yup";

// Validation schema for the form
const validationSchema = yup.object().shape({
    studentName: yup.string().required("Name is required"),
    studentEmail: yup
        .string()
        .email("Invalid email format")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        )
        .required("Email is required"),
});

const StudentList = ({ students, onUpdate, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // state for the delete confirmation dialog
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [errors, setErrors] = useState({});

    // Handle student update
    const handleUpdate = async (student) => {
        try {
            // Validate before updating
            await validationSchema.validate(student, { abortEarly: false });
            await onUpdate(student); // assuming onUpdate is an async function
            handleClose();
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    };

    // Open the confirmation dialog before deleting
    const handleDeleteConfirmation = (student) => {
        setSelectedStudent(student);
        setDeleteDialogOpen(true);
    };

    // Confirm delete action
    const handleDelete = async () => {
        try {
            await onDelete(selectedStudent.studentId); // assuming onDelete is an async function
            setDeleteDialogOpen(false);
        } catch (err) {
            console.error("Failed to delete student. Please try again.");
        }
    };

    // Open dialog to edit student
    const handleClickOpen = (student) => {
        setSelectedStudent(student);
        setOpen(true);
    };

    // Close the dialog
    const handleClose = () => {
        setOpen(false);
        setSelectedStudent(null);
        setErrors({});
    };

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedStudent((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // Prevent the form from submitting (if inside a form)
            e.preventDefault();
            // Trigger the update when Enter is pressed
            handleUpdate(selectedStudent);
        }
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
                                            onClick={() => handleClickOpen(student)}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteConfirmation(student)}
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
                <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 3 }}>
                    No students available.
                </Typography>
            )}

            {/* Update Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Update Student"}</DialogTitle>
                <DialogContent>
                    <Card>
                        <CardContent>
                            <Box
                                component="form"
                                sx={{
                                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                                }}
                                noValidate
                                autoComplete="off"
                                onKeyDown={handleKeyDown} // Add keydown listener here
                            >
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    name="studentName"
                                    value={selectedStudent?.studentName || ""}
                                    onChange={handleChange}
                                    error={!!errors.studentName}
                                    helperText={errors.studentName}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    name="studentEmail"
                                    value={selectedStudent?.studentEmail || ""}
                                    onChange={handleChange}
                                    error={!!errors.studentEmail}
                                    helperText={errors.studentEmail}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleUpdate(selectedStudent)}
                        color="primary"
                        variant="contained"
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">{"Delete Student"}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this student?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="success">
                        No
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StudentList;
