package com.mpp.cms.web.rest;

import com.mpp.cms.CmsApp;

import com.mpp.cms.domain.Reference;
import com.mpp.cms.repository.ReferenceRepository;
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

/**
 * Test class for the ReferenceResource REST controller.
 *
 * @see ReferenceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmsApp.class)
public class ReferenceResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ReferenceRepository referenceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReferenceMockMvc;

    private Reference reference;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ReferenceResource referenceResource = new ReferenceResource(referenceRepository);
        this.restReferenceMockMvc = MockMvcBuilders.standaloneSetup(referenceResource)
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
    public static Reference createEntity(EntityManager em) {
        Reference reference = new Reference()
            .url(DEFAULT_URL)
            .name(DEFAULT_NAME);
        return reference;
    }

    @Before
    public void initTest() {
        reference = createEntity(em);
    }

    @Test
    @Transactional
    public void createReference() throws Exception {
        int databaseSizeBeforeCreate = referenceRepository.findAll().size();

        // Create the Reference
        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reference)))
            .andExpect(status().isCreated());

        // Validate the Reference in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeCreate + 1);
        Reference testReference = referenceList.get(referenceList.size() - 1);
        assertThat(testReference.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testReference.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createReferenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = referenceRepository.findAll().size();

        // Create the Reference with an existing ID
        reference.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reference)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = referenceRepository.findAll().size();
        // set the field null
        reference.setUrl(null);

        // Create the Reference, which fails.

        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reference)))
            .andExpect(status().isBadRequest());

        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = referenceRepository.findAll().size();
        // set the field null
        reference.setName(null);

        // Create the Reference, which fails.

        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reference)))
            .andExpect(status().isBadRequest());

        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReferences() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);

        // Get all the referenceList
        restReferenceMockMvc.perform(get("/api/references?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reference.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getReference() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);

        // Get the reference
        restReferenceMockMvc.perform(get("/api/references/{id}", reference.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reference.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReference() throws Exception {
        // Get the reference
        restReferenceMockMvc.perform(get("/api/references/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReference() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);
        int databaseSizeBeforeUpdate = referenceRepository.findAll().size();

        // Update the reference
        Reference updatedReference = referenceRepository.findOne(reference.getId());
        updatedReference
            .url(UPDATED_URL)
            .name(UPDATED_NAME);

        restReferenceMockMvc.perform(put("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReference)))
            .andExpect(status().isOk());

        // Validate the Reference in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeUpdate);
        Reference testReference = referenceList.get(referenceList.size() - 1);
        assertThat(testReference.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testReference.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingReference() throws Exception {
        int databaseSizeBeforeUpdate = referenceRepository.findAll().size();

        // Create the Reference

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReferenceMockMvc.perform(put("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reference)))
            .andExpect(status().isCreated());

        // Validate the Reference in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReference() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);
        int databaseSizeBeforeDelete = referenceRepository.findAll().size();

        // Get the reference
        restReferenceMockMvc.perform(delete("/api/references/{id}", reference.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reference.class);
        Reference reference1 = new Reference();
        reference1.setId(1L);
        Reference reference2 = new Reference();
        reference2.setId(reference1.getId());
        assertThat(reference1).isEqualTo(reference2);
        reference2.setId(2L);
        assertThat(reference1).isNotEqualTo(reference2);
        reference1.setId(null);
        assertThat(reference1).isNotEqualTo(reference2);
    }
}
