package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.BasketballCourt;
import com.mycompany.myapp.repository.BasketballCourtRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.BasketballCourt}.
 */
@RestController
@RequestMapping("/api/basketball-courts")
@Transactional
public class BasketballCourtResource {

    private static final Logger log = LoggerFactory.getLogger(BasketballCourtResource.class);

    private static final String ENTITY_NAME = "basketballCourt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BasketballCourtRepository basketballCourtRepository;

    public BasketballCourtResource(BasketballCourtRepository basketballCourtRepository) {
        this.basketballCourtRepository = basketballCourtRepository;
    }

    /**
     * {@code POST  /basketball-courts} : Create a new basketballCourt.
     *
     * @param basketballCourt the basketballCourt to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new basketballCourt, or with status {@code 400 (Bad Request)} if the basketballCourt has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BasketballCourt> createBasketballCourt(@RequestBody BasketballCourt basketballCourt) throws URISyntaxException {
        log.debug("REST request to save BasketballCourt : {}", basketballCourt);
        if (basketballCourt.getId() != null) {
            throw new BadRequestAlertException("A new basketballCourt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        basketballCourt = basketballCourtRepository.save(basketballCourt);
        return ResponseEntity.created(new URI("/api/basketball-courts/" + basketballCourt.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, basketballCourt.getId().toString()))
            .body(basketballCourt);
    }

    /**
     * {@code PUT  /basketball-courts/:id} : Updates an existing basketballCourt.
     *
     * @param id the id of the basketballCourt to save.
     * @param basketballCourt the basketballCourt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated basketballCourt,
     * or with status {@code 400 (Bad Request)} if the basketballCourt is not valid,
     * or with status {@code 500 (Internal Server Error)} if the basketballCourt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BasketballCourt> updateBasketballCourt(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BasketballCourt basketballCourt
    ) throws URISyntaxException {
        log.debug("REST request to update BasketballCourt : {}, {}", id, basketballCourt);
        if (basketballCourt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, basketballCourt.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!basketballCourtRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        basketballCourt = basketballCourtRepository.save(basketballCourt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, basketballCourt.getId().toString()))
            .body(basketballCourt);
    }

    /**
     * {@code PATCH  /basketball-courts/:id} : Partial updates given fields of an existing basketballCourt, field will ignore if it is null
     *
     * @param id the id of the basketballCourt to save.
     * @param basketballCourt the basketballCourt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated basketballCourt,
     * or with status {@code 400 (Bad Request)} if the basketballCourt is not valid,
     * or with status {@code 404 (Not Found)} if the basketballCourt is not found,
     * or with status {@code 500 (Internal Server Error)} if the basketballCourt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BasketballCourt> partialUpdateBasketballCourt(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BasketballCourt basketballCourt
    ) throws URISyntaxException {
        log.debug("REST request to partial update BasketballCourt partially : {}, {}", id, basketballCourt);
        if (basketballCourt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, basketballCourt.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!basketballCourtRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BasketballCourt> result = basketballCourtRepository
            .findById(basketballCourt.getId())
            .map(existingBasketballCourt -> {
                if (basketballCourt.getCourtName() != null) {
                    existingBasketballCourt.setCourtName(basketballCourt.getCourtName());
                }
                if (basketballCourt.getState() != null) {
                    existingBasketballCourt.setState(basketballCourt.getState());
                }
                if (basketballCourt.getZipCode() != null) {
                    existingBasketballCourt.setZipCode(basketballCourt.getZipCode());
                }
                if (basketballCourt.getStreetAddress() != null) {
                    existingBasketballCourt.setStreetAddress(basketballCourt.getStreetAddress());
                }
                if (basketballCourt.getLongitude() != null) {
                    existingBasketballCourt.setLongitude(basketballCourt.getLongitude());
                }
                if (basketballCourt.getLatitude() != null) {
                    existingBasketballCourt.setLatitude(basketballCourt.getLatitude());
                }

                return existingBasketballCourt;
            })
            .map(basketballCourtRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, basketballCourt.getId().toString())
        );
    }

    /**
     * {@code GET  /basketball-courts} : get all the basketballCourts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of basketballCourts in body.
     */
    @GetMapping("")
    public List<BasketballCourt> getAllBasketballCourts() {
        log.debug("REST request to get all BasketballCourts");
        return basketballCourtRepository.findAll();
    }

    /**
     * {@code GET  /basketball-courts/:id} : get the "id" basketballCourt.
     *
     * @param id the id of the basketballCourt to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the basketballCourt, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BasketballCourt> getBasketballCourt(@PathVariable("id") Long id) {
        log.debug("REST request to get BasketballCourt : {}", id);
        Optional<BasketballCourt> basketballCourt = basketballCourtRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(basketballCourt);
    }

    /**
     * {@code DELETE  /basketball-courts/:id} : delete the "id" basketballCourt.
     *
     * @param id the id of the basketballCourt to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBasketballCourt(@PathVariable("id") Long id) {
        log.debug("REST request to delete BasketballCourt : {}", id);
        basketballCourtRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
