package com.crud.crud.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.crud.crud.model.Students;

@Repository
public interface StudentRepository extends JpaRepository<Students, UUID> {
}