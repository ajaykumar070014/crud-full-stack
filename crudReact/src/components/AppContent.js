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
    updateMutation.mutate(student);
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
                  onUpdate={handleUpdate} // Pass the updated `handleUpdate` to StudentList
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
