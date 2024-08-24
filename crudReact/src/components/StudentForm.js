import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StudentForm = ({ onCreate }) => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const handleSubmit = () => {
    if (studentName && studentEmail) {
      onCreate({ studentName, studentEmail });
      setStudentName("");
      setStudentEmail("");
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
    >
      <h2>Create Student</h2>
      <TextField
        label="Name"
        variant="outlined"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={studentEmail}
        onChange={(e) => setStudentEmail(e.target.value)}
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
