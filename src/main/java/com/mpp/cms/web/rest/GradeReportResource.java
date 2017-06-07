package com.mpp.cms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpp.cms.domain.GradeReport;

import com.mpp.cms.repository.GradeReportRepository;
import com.mpp.cms.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GradeReport.
 */
@RestController
@RequestMapping("/api")
public class GradeReportResource {

    private final Logger log = LoggerFactory.getLogger(GradeReportResource.class);

    private static final String ENTITY_NAME = "gradeReport";

    private final GradeReportRepository gradeReportRepository;

    public GradeReportResource(GradeReportRepository gradeReportRepository) {
        this.gradeReportRepository = gradeReportRepository;
    }

    /**
     * POST  /grade-reports : Create a new gradeReport.
     *
     * @param gradeReport the gradeReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gradeReport, or with status 400 (Bad Request) if the gradeReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/grade-reports")
    @Timed
    public ResponseEntity<GradeReport> createGradeReport(@Valid @RequestBody GradeReport gradeReport) throws URISyntaxException {
        log.debug("REST request to save GradeReport : {}", gradeReport);
        if (gradeReport.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new gradeReport cannot already have an ID")).body(null);
        }
        GradeReport result = gradeReportRepository.save(gradeReport);
        return ResponseEntity.created(new URI("/api/grade-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /grade-reports : Updates an existing gradeReport.
     *
     * @param gradeReport the gradeReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gradeReport,
     * or with status 400 (Bad Request) if the gradeReport is not valid,
     * or with status 500 (Internal Server Error) if the gradeReport couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/grade-reports")
    @Timed
    public ResponseEntity<GradeReport> updateGradeReport(@Valid @RequestBody GradeReport gradeReport) throws URISyntaxException {
        log.debug("REST request to update GradeReport : {}", gradeReport);
        if (gradeReport.getId() == null) {
            return createGradeReport(gradeReport);
        }
        GradeReport result = gradeReportRepository.save(gradeReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gradeReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /grade-reports : get all the gradeReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gradeReports in body
     */
    @GetMapping("/grade-reports")
    @Timed
    public List<GradeReport> getAllGradeReports() {
        log.debug("REST request to get all GradeReports");
        return gradeReportRepository.findAll();
    }

    /**
     * GET  /grade-reports/:id : get the "id" gradeReport.
     *
     * @param id the id of the gradeReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gradeReport, or with status 404 (Not Found)
     */
    @GetMapping("/grade-reports/{id}")
    @Timed
    public ResponseEntity<GradeReport> getGradeReport(@PathVariable Long id) {
        log.debug("REST request to get GradeReport : {}", id);
        GradeReport gradeReport = gradeReportRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gradeReport));
    }

    /**
     * DELETE  /grade-reports/:id : delete the "id" gradeReport.
     *
     * @param id the id of the gradeReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/grade-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteGradeReport(@PathVariable Long id) {
        log.debug("REST request to delete GradeReport : {}", id);
        gradeReportRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
