package com.crud.crud.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Students {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID StudentId;

    @NotBlank(message = "Name should not Blank")
    private String studentName;

    @Email(message = "Email is needed")
    @NotBlank(message = "Email should not Blank")
    private String studentEmail;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Automatically set createdAt before the entity is persisted
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Automatically set updatedAt before the entity is updated
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
