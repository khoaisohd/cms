package com.mpp.cms.web.rest;

import com.mpp.cms.CmsApp;

import com.mpp.cms.domain.GradeReport;
import com.mpp.cms.domain.Course;
import com.mpp.cms.domain.Student;
import com.mpp.cms.repository.GradeReportRepository;
import com.mpp.cms.service.GradeReportService;
import com.mpp.cms.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mpp.cms.domain.enumeration.Status;
/**
 * Test class for the GradeReportResource REST controller.
 *
 * @see GradeReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmsApp.class)
public class GradeReportResourceIntTest {

    private static final Status DEFAULT_STATUS = Status.FAILED;
    private static final Status UPDATED_STATUS = Status.IN_PROGRESS;

    @Autowired
    private GradeReportRepository gradeReportRepository;

    @Autowired
    private GradeReportService gradeReportService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGradeReportMockMvc;

    private GradeReport gradeReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        GradeReportResource gradeReportResource = new GradeReportResource(gradeReportRepository, gradeReportService);
        this.restGradeReportMockMvc = MockMvcBuilders.standaloneSetup(gradeReportResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GradeReport createEntity(EntityManager em) {
        GradeReport gradeReport = new GradeReport()
            .status(DEFAULT_STATUS);
        // Add required entity
        Course course = CourseResourceIntTest.createEntity(em);
        em.persist(course);
        em.flush();
        gradeReport.setCourse(course);
        // Add required entity
        Student student = StudentResourceIntTest.createEntity(em);
        em.persist(student);
        em.flush();
        gradeReport.setStudent(student);
        return gradeReport;
    }

    @Before
    public void initTest() {
        gradeReport = createEntity(em);
    }

    @Test
    @Transactional
    public void createGradeReport() throws Exception {
        int databaseSizeBeforeCreate = gradeReportRepository.findAll().size();

        // Create the GradeReport
        restGradeReportMockMvc.perform(post("/api/grade-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gradeReport)))
            .andExpect(status().isCreated());

        // Validate the GradeReport in the database
        List<GradeReport> gradeReportList = gradeReportRepository.findAll();
        assertThat(gradeReportList).hasSize(databaseSizeBeforeCreate + 1);
        GradeReport testGradeReport = gradeReportList.get(gradeReportList.size() - 1);
        assertThat(testGradeReport.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createGradeReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gradeReportRepository.findAll().size();

        // Create the GradeReport with an existing ID
        gradeReport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGradeReportMockMvc.perform(post("/api/grade-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gradeReport)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<GradeReport> gradeReportList = gradeReportRepository.findAll();
        assertThat(gradeReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = gradeReportRepository.findAll().size();
        // set the field null
        gradeReport.setStatus(null);

        // Create the GradeReport, which fails.

        restGradeReportMockMvc.perform(post("/api/grade-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gradeReport)))
            .andExpect(status().isBadRequest());

        List<GradeReport> gradeReportList = gradeReportRepository.findAll();
        assertThat(gradeReportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGradeReports() throws Exception {
        // Initialize the database
        gradeReportRepository.saveAndFlush(gradeReport);

        // Get all the gradeReportList
        restGradeReportMockMvc.perform(get("/api/grade-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gradeReport.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getGradeReport() throws Exception {
        // Initialize the database
        gradeReportRepository.saveAndFlush(gradeReport);

        // Get the gradeReport
        restGradeReportMockMvc.perform(get("/api/grade-reports/{id}", gradeReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gradeReport.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGradeReport() throws Exception {
        // Get the gradeReport
        restGradeReportMockMvc.perform(get("/api/grade-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGradeReport() throws Exception {
        // Initialize the database
        gradeReportRepository.saveAndFlush(gradeReport);
        int databaseSizeBeforeUpdate = gradeReportRepository.findAll().size();

        // Update the gradeReport
        GradeReport updatedGradeReport = gradeReportRepository.findOne(gradeReport.getId());
        updatedGradeReport
            .status(UPDATED_STATUS);

        restGradeReportMockMvc.perform(put("/api/grade-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGradeReport)))
            .andExpect(status().isOk());

        // Validate the GradeReport in the database
        List<GradeReport> gradeReportList = gradeReportRepository.findAll();
        assertThat(gradeReportList).hasSize(databaseSizeBeforeUpdate);
        GradeReport testGradeReport = gradeReportList.get(gradeReportList.size() - 1);
        assertThat(testGradeReport.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingGradeReport() throws Exception {
        int databaseSizeBeforeUpdate = gradeReportRepository.findAll().size();

        // Create the GradeReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGradeReportMockMvc.perform(put("/api/grade-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gradeReport)))
            .andExpect(status().isCreated());

        // Validate the GradeReport in the database
        List<GradeReport> gradeReportList = gradeReportRepository.findAll();
        assertThat(gradeReportList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGradeReport() throws Exception {
        // Initialize the database
        gradeReportRepository.saveAndFlush(gradeReport);
        int databaseSizeBeforeDelete = gradeReportRepository.findAll().size();

        // Get the gradeReport
        restGradeReportMockMvc.perform(delete("/api/grade-reports/{id}", gradeReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GradeReport> gradeReportList = gradeReportRepository.findAll();
        assertThat(gradeReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GradeReport.class);
        GradeReport gradeReport1 = new GradeReport();
        gradeReport1.setId(1L);
        GradeReport gradeReport2 = new GradeReport();
        gradeReport2.setId(gradeReport1.getId());
        assertThat(gradeReport1).isEqualTo(gradeReport2);
        gradeReport2.setId(2L);
        assertThat(gradeReport1).isNotEqualTo(gradeReport2);
        gradeReport1.setId(null);
        assertThat(gradeReport1).isNotEqualTo(gradeReport2);
    }
}
