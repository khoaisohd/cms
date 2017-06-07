package com.mpp.cms.repository;

import com.mpp.cms.domain.GradeReport;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GradeReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GradeReportRepository extends JpaRepository<GradeReport,Long> {

}
