package com.mpp.cms.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

import com.mpp.cms.domain.enumeration.Status;

/**
 * A GradeReport.
 */
@Entity
@Table(name = "grade_report")
public class GradeReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @ManyToOne(optional = false)
    @NotNull
    private Course course;

    @ManyToOne(optional = false)
    @NotNull
    private Student student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public GradeReport status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Course getCourse() {
        return course;
    }

    public GradeReport course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Student getStudent() {
        return student;
    }

    public GradeReport student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GradeReport gradeReport = (GradeReport) o;
        if (gradeReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gradeReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GradeReport{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
