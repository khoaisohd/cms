package com.mpp.cms.repository;

import com.mpp.cms.domain.Course;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    Optional<Course> findOneByCode(String code);
}
