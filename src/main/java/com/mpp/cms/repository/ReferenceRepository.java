package com.mpp.cms.repository;

import com.mpp.cms.domain.Reference;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Reference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReferenceRepository extends JpaRepository<Reference,Long> {

}
