package com.mpp.cms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "prerequisite")
    private String prerequisite;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private Set<Reference> references = new HashSet<>();

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private Set<Document> documents = new HashSet<>();

    @ManyToOne
    private Department department;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Course code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Course description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrerequisite() {
        return prerequisite;
    }

    public Course prerequisite(String prerequisite) {
        this.prerequisite = prerequisite;
        return this;
    }

    public void setPrerequisite(String prerequisite) {
        this.prerequisite = prerequisite;
    }

    public Set<Reference> getReferences() {
        return references;
    }

    public Course references(Set<Reference> references) {
        this.references = references;
        return this;
    }

    public Course addReference(Reference reference) {
        this.references.add(reference);
        reference.setCourse(this);
        return this;
    }

    public Course removeReference(Reference reference) {
        this.references.remove(reference);
        reference.setCourse(null);
        return this;
    }

    public void setReferences(Set<Reference> references) {
        this.references = references;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Course documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Course addDocument(Document document) {
        this.documents.add(document);
        document.setCourse(this);
        return this;
    }

    public Course removeDocument(Document document) {
        this.documents.remove(document);
        document.setCourse(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Department getDepartment() {
        return department;
    }

    public Course department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Course course = (Course) o;
        if (course.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), course.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", prerequisite='" + getPrerequisite() + "'" +
            "}";
    }
}
