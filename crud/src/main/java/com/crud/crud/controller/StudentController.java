package com.crud.crud.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.crud.crud.model.Students;
import com.crud.crud.service.StudentService;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}")
    public Students getStudentById(@PathVariable UUID id) {
        return studentService.getStudentById(id);
    }

    @GetMapping
    public List<Students> getAllStudent() {
        return studentService.getAllStudent();
    }

    @PostMapping
    public Students createStudent(@RequestBody Students student) {
        return studentService.create(student);
    }

    @PutMapping("/{id}")
    public Students putMethodName(@PathVariable UUID id, @RequestBody Students students) {
        return studentService.updateStudent(id, students);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable UUID id) {
        studentService.delete(id);
    }

}
