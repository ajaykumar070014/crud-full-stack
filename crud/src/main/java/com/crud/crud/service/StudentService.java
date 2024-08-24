package com.crud.crud.service;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.crud.crud.model.Students;
import com.crud.crud.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Students> getAllStudent() {
        List<Students> student = studentRepository.findAll();
        return student;
    }

    public Students getStudentById(UUID id) {
        Students student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException(id + "not found"));
        return student;
    }

    public Students create(Students student) {
        studentRepository.save(student);
        return student;
    }

    public Students updateStudent(UUID id, Students updatedStudent) {
        Students existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        existingStudent.setStudentName(updatedStudent.getStudentName());
        existingStudent.setStudentEmail(updatedStudent.getStudentEmail());
        return studentRepository.save(existingStudent);
    }

    public void delete(UUID id) {
        studentRepository.deleteById(id);
    }
}
