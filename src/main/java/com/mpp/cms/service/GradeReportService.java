package com.mpp.cms.service;

import com.mpp.cms.domain.Course;
import com.mpp.cms.domain.GradeReport;
import com.mpp.cms.domain.Student;
import com.mpp.cms.domain.enumeration.Status;
import com.mpp.cms.repository.CourseRepository;
import com.mpp.cms.repository.GradeReportRepository;
import com.mpp.cms.service.errors.UnsatisfiedPrerequisiteException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class GradeReportService {
    private final GradeReportRepository gradeReportRepository;

    private final CourseRepository courseRepository;

    public GradeReportService(GradeReportRepository gradeReportRepository, CourseRepository courseRepository) {
        this.gradeReportRepository = gradeReportRepository;
        this.courseRepository = courseRepository;
    }

    public GradeReport save(GradeReport gradeReport) {
        if (!satisfyCoursePrerequisite(gradeReport.getCourse(), gradeReport.getStudent())) {
            throw new UnsatisfiedPrerequisiteException();
        }
        return gradeReportRepository.save(gradeReport);
    }

    private boolean satisfyCoursePrerequisite(Course course, Student student) {
        if (course.getPrerequisite().isEmpty()) return true;
        Course prerequisiteCourse = courseRepository.findOneByCode(course.getPrerequisite()).get();
        Optional<GradeReport> gradeReportOptional = gradeReportRepository.findOneByCourseIdAndStudentId(prerequisiteCourse.getId(), student.getId());
        return gradeReportOptional.isPresent() &&  gradeReportOptional.get().getStatus() == Status.PASSED;
    }
}
