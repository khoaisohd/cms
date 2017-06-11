package com.mpp.cms.service;

import com.mpp.cms.domain.Course;
import com.mpp.cms.domain.GradeReport;
import com.mpp.cms.domain.Student;
import com.mpp.cms.domain.enumeration.Status;
import com.mpp.cms.repository.CourseRepository;
import com.mpp.cms.repository.GradeReportRepository;
import com.mpp.cms.repository.StudentRepository;
import com.mpp.cms.service.errors.CreateGradeReportException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GradeReportService {
    private final GradeReportRepository gradeReportRepository;

    private final StudentRepository studentRepository;

    private final CourseRepository courseRepository;

    public GradeReportService(GradeReportRepository gradeReportRepository, CourseRepository courseRepository, StudentRepository studentRepository) {
        this.gradeReportRepository = gradeReportRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    public GradeReport save(GradeReport gradeReport) {
        validateGradeReport(gradeReport);
        return gradeReportRepository.save(gradeReport);
    }

    public void validateGradeReport(GradeReport gradeReport) {
        Course course = gradeReport.getCourse();
        Student student = studentRepository.findOne(gradeReport.getStudent().getId());
        if (!validateDepartment(course, student)) {
            throw new CreateGradeReportException("You cannot register course which does not belong to your department");
        }

        if (!validateCoursePrerequisite(course, student)) {
            throw new CreateGradeReportException("You must complete course prerequisite before registration");
        }
    }

    private boolean validateDepartment(Course course, Student student) {
        if (course.getDepartment() == null || student.getDepartment() == null) return true;
        return course.getDepartment().getId().equals(student.getDepartment().getId());
    }

    private boolean validateCoursePrerequisite(Course course, Student student) {
        if (!course.hasPrerequisite()) return true;
        Course prerequisiteCourse = courseRepository.findOneByCode(course.getPrerequisite()).get();
        Optional<GradeReport> gradeReportOptional = gradeReportRepository.findOneByCourseIdAndStudentId(prerequisiteCourse.getId(), student.getId());
        return gradeReportOptional.isPresent() &&  gradeReportOptional.get().getStatus() == Status.PASSED;
    }

    public List<GradeReport> findAll() {
        return gradeReportRepository.findAll();
    }

    public GradeReport findOne(Long id) {
        return gradeReportRepository.findOne(id);
    }

    public void delete(Long id) {
        gradeReportRepository.delete(id);
    }
}
