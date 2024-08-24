import React from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import { useStudents } from "../hooks/useStudents";

const AppContent = () => {
  const {
    students,
    isQueryError,
    queryError,
    isStudentsLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useStudents();

  const handleCreate = (newStudent) => {
    createMutation.mutate(newStudent);
  };

  const handleUpdate = (student) => {
    const newName = prompt("Enter new name:", student.studentName);
    const newEmail = prompt("Enter new email:", student.studentEmail);

    if (newName !== null && newEmail !== null) {
      const updatedStudent = {
        ...student,
        studentName: newName,
        studentEmail: newEmail,
      };
      updateMutation.mutate(updatedStudent);
    }
  };

  const handleDelete = (studentId) => {
    deleteMutation.mutate(studentId);
  };

  return (
    <div>
      {createMutation.error && (
        <div className="error">{createMutation.error.message}</div>
      )}
      {updateMutation.error && (
        <div className="error">{updateMutation.error.message}</div>
      )}
      {deleteMutation.error && (
        <div className="error">{deleteMutation.error.message}</div>
      )}

      {isStudentsLoading ? (
        <div className="loading">Loading students...</div>
      ) : (
        <>
          <StudentForm onCreate={handleCreate} />
          <StudentList
            students={students}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </>
      )}

      {isQueryError && (
        <div className="error">
          Failed to load students: {queryError.message}
        </div>
      )}
    </div>
  );
};

export default AppContent;
