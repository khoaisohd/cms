package com.mpp.cms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpp.cms.domain.Document;

import com.mpp.cms.repository.DocumentRepository;
import com.mpp.cms.web.rest.util.HeaderUtil;
import com.mpp.cms.service.dto.DocumentDTO;
import com.mpp.cms.service.mapper.DocumentMapper;
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
 * REST controller for managing Document.
 */
@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger log = LoggerFactory.getLogger(DocumentResource.class);

    private static final String ENTITY_NAME = "document";

    private final DocumentRepository documentRepository;

    private final DocumentMapper documentMapper;

    public DocumentResource(DocumentRepository documentRepository, DocumentMapper documentMapper) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
    }

    /**
     * POST  /documents : Create a new document.
     *
     * @param documentDTO the documentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentDTO, or with status 400 (Bad Request) if the document has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documents")
    @Timed
    public ResponseEntity<DocumentDTO> createDocument(@Valid @RequestBody DocumentDTO documentDTO) throws URISyntaxException {
        log.debug("REST request to save Document : {}", documentDTO);
        if (documentDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new document cannot already have an ID")).body(null);
        }
        Document document = documentMapper.toEntity(documentDTO);
        document = documentRepository.save(document);
        DocumentDTO result = documentMapper.toDto(document);
        return ResponseEntity.created(new URI("/api/documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documents : Updates an existing document.
     *
     * @param documentDTO the documentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentDTO,
     * or with status 400 (Bad Request) if the documentDTO is not valid,
     * or with status 500 (Internal Server Error) if the documentDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documents")
    @Timed
    public ResponseEntity<DocumentDTO> updateDocument(@Valid @RequestBody DocumentDTO documentDTO) throws URISyntaxException {
        log.debug("REST request to update Document : {}", documentDTO);
        if (documentDTO.getId() == null) {
            return createDocument(documentDTO);
        }
        Document document = documentMapper.toEntity(documentDTO);
        document = documentRepository.save(document);
        DocumentDTO result = documentMapper.toDto(document);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documents : get all the documents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documents in body
     */
    @GetMapping("/documents")
    @Timed
    public List<DocumentDTO> getAllDocuments() {
        log.debug("REST request to get all Documents");
        List<Document> documents = documentRepository.findAll();
        return documentMapper.toDto(documents);
    }

    /**
     * GET  /documents/:id : get the "id" document.
     *
     * @param id the id of the documentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/documents/{id}")
    @Timed
    public ResponseEntity<DocumentDTO> getDocument(@PathVariable Long id) {
        log.debug("REST request to get Document : {}", id);
        Document document = documentRepository.findOne(id);
        DocumentDTO documentDTO = documentMapper.toDto(document);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentDTO));
    }

    /**
     * DELETE  /documents/:id : delete the "id" document.
     *
     * @param id the id of the documentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documents/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        log.debug("REST request to delete Document : {}", id);
        documentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
