import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8081/students";

const fetchStudents = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const createStudent = async (newStudent) => {
  await axios.post(API_URL, newStudent);
};

const updateStudent = async (updatedStudent) => {
  await axios.put(`${API_URL}/${updatedStudent.studentId}`, updatedStudent);
};

const deleteStudent = async (studentId) => {
  await axios.delete(`${API_URL}/${studentId}`);
};

export const useStudents = () => {
  const queryClient = useQueryClient();

  const {
    data: students,
    isError: isQueryError,
    error: queryError,
    isLoading: isStudentsLoading,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    onError: (err) => {
      console.error(err.message || "Failed to fetch students.");
    },
  });

  const createMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
    },
    onError: (err) => {
      console.error(err.response?.data?.message || "Failed to create student.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
    },
    onError: (err) => {
      console.error(err.response?.data?.message || "Failed to update student.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
    },
    onError: (err) => {
      console.error(err.response?.data?.message || "Failed to delete student.");
    },
  });

  return {
    students,
    isQueryError,
    queryError,
    isStudentsLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
