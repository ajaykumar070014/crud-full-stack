import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";

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

const StudentForm = ({ onCreate }) => {
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        const newStudent = { studentName, studentEmail };
        validationSchema
            .validate(newStudent, { abortEarly: false })
            .then(() => {
                onCreate(newStudent);
                setStudentName("");
                setStudentEmail("");
                setErrors({});
            })
            .catch((err) => {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onKeyPress={handleKeyPress}
        >
            <h2>Create Student</h2>
            <TextField
                label="Name"
                variant="outlined"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                error={!!errors.studentName}
                helperText={errors.studentName}
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                error={!!errors.studentEmail}
                helperText={errors.studentEmail}
            />
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create Student
                </Button>
            </Box>
        </Box>
    );
};

export default StudentForm;
