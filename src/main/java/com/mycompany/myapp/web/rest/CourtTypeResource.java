package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CourtType;
import com.mycompany.myapp.repository.CourtTypeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CourtType}.
 */
@RestController
@RequestMapping("/api/court-types")
@Transactional
public class CourtTypeResource {

    private static final Logger log = LoggerFactory.getLogger(CourtTypeResource.class);

    private static final String ENTITY_NAME = "courtType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CourtTypeRepository courtTypeRepository;

    public CourtTypeResource(CourtTypeRepository courtTypeRepository) {
        this.courtTypeRepository = courtTypeRepository;
    }

    /**
     * {@code POST  /court-types} : Create a new courtType.
     *
     * @param courtType the courtType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courtType, or with status {@code 400 (Bad Request)} if the courtType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CourtType> createCourtType(@RequestBody CourtType courtType) throws URISyntaxException {
        log.debug("REST request to save CourtType : {}", courtType);
        if (courtType.getId() != null) {
            throw new BadRequestAlertException("A new courtType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        courtType = courtTypeRepository.save(courtType);
        return ResponseEntity.created(new URI("/api/court-types/" + courtType.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, courtType.getId().toString()))
            .body(courtType);
    }

    /**
     * {@code PUT  /court-types/:id} : Updates an existing courtType.
     *
     * @param id the id of the courtType to save.
     * @param courtType the courtType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courtType,
     * or with status {@code 400 (Bad Request)} if the courtType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courtType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CourtType> updateCourtType(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CourtType courtType
    ) throws URISyntaxException {
        log.debug("REST request to update CourtType : {}, {}", id, courtType);
        if (courtType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courtType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courtTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        courtType = courtTypeRepository.save(courtType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courtType.getId().toString()))
            .body(courtType);
    }

    /**
     * {@code PATCH  /court-types/:id} : Partial updates given fields of an existing courtType, field will ignore if it is null
     *
     * @param id the id of the courtType to save.
     * @param courtType the courtType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courtType,
     * or with status {@code 400 (Bad Request)} if the courtType is not valid,
     * or with status {@code 404 (Not Found)} if the courtType is not found,
     * or with status {@code 500 (Internal Server Error)} if the courtType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CourtType> partialUpdateCourtType(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CourtType courtType
    ) throws URISyntaxException {
        log.debug("REST request to partial update CourtType partially : {}, {}", id, courtType);
        if (courtType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courtType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courtTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CourtType> result = courtTypeRepository
            .findById(courtType.getId())
            .map(existingCourtType -> {
                if (courtType.getTypeName() != null) {
                    existingCourtType.setTypeName(courtType.getTypeName());
                }
                if (courtType.getBallCourtID() != null) {
                    existingCourtType.setBallCourtID(courtType.getBallCourtID());
                }

                return existingCourtType;
            })
            .map(courtTypeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courtType.getId().toString())
        );
    }

    /**
     * {@code GET  /court-types} : get all the courtTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of courtTypes in body.
     */
    @GetMapping("")
    public List<CourtType> getAllCourtTypes() {
        log.debug("REST request to get all CourtTypes");
        return courtTypeRepository.findAll();
    }

    /**
     * {@code GET  /court-types/:id} : get the "id" courtType.
     *
     * @param id the id of the courtType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courtType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CourtType> getCourtType(@PathVariable("id") Long id) {
        log.debug("REST request to get CourtType : {}", id);
        Optional<CourtType> courtType = courtTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(courtType);
    }

    /**
     * {@code DELETE  /court-types/:id} : delete the "id" courtType.
     *
     * @param id the id of the courtType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourtType(@PathVariable("id") Long id) {
        log.debug("REST request to delete CourtType : {}", id);
        courtTypeRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
