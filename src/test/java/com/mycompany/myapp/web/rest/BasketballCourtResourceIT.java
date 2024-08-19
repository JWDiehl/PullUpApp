package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.BasketballCourtAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.BasketballCourt;
import com.mycompany.myapp.repository.BasketballCourtRepository;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BasketballCourtResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BasketballCourtResourceIT {

    private static final String DEFAULT_COURT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COURT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ZIP_CODE = 1;
    private static final Integer UPDATED_ZIP_CODE = 2;

    private static final String DEFAULT_STREET_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LATITUDE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/basketball-courts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BasketballCourtRepository basketballCourtRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBasketballCourtMockMvc;

    private BasketballCourt basketballCourt;

    private BasketballCourt insertedBasketballCourt;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BasketballCourt createEntity(EntityManager em) {
        BasketballCourt basketballCourt = new BasketballCourt()
            .courtName(DEFAULT_COURT_NAME)
            .state(DEFAULT_STATE)
            .zipCode(DEFAULT_ZIP_CODE)
            .streetAddress(DEFAULT_STREET_ADDRESS)
            .longitude(DEFAULT_LONGITUDE)
            .latitude(DEFAULT_LATITUDE);
        return basketballCourt;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BasketballCourt createUpdatedEntity(EntityManager em) {
        BasketballCourt basketballCourt = new BasketballCourt()
            .courtName(UPDATED_COURT_NAME)
            .state(UPDATED_STATE)
            .zipCode(UPDATED_ZIP_CODE)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .longitude(UPDATED_LONGITUDE)
            .latitude(UPDATED_LATITUDE);
        return basketballCourt;
    }

    @BeforeEach
    public void initTest() {
        basketballCourt = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedBasketballCourt != null) {
            basketballCourtRepository.delete(insertedBasketballCourt);
            insertedBasketballCourt = null;
        }
    }

    @Test
    @Transactional
    void createBasketballCourt() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the BasketballCourt
        var returnedBasketballCourt = om.readValue(
            restBasketballCourtMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(basketballCourt)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BasketballCourt.class
        );

        // Validate the BasketballCourt in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertBasketballCourtUpdatableFieldsEquals(returnedBasketballCourt, getPersistedBasketballCourt(returnedBasketballCourt));

        insertedBasketballCourt = returnedBasketballCourt;
    }

    @Test
    @Transactional
    void createBasketballCourtWithExistingId() throws Exception {
        // Create the BasketballCourt with an existing ID
        basketballCourt.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBasketballCourtMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(basketballCourt)))
            .andExpect(status().isBadRequest());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBasketballCourts() throws Exception {
        // Initialize the database
        insertedBasketballCourt = basketballCourtRepository.saveAndFlush(basketballCourt);

        // Get all the basketballCourtList
        restBasketballCourtMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basketballCourt.getId().intValue())))
            .andExpect(jsonPath("$.[*].courtName").value(hasItem(DEFAULT_COURT_NAME)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].zipCode").value(hasItem(DEFAULT_ZIP_CODE)))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE)))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE)));
    }

    @Test
    @Transactional
    void getBasketballCourt() throws Exception {
        // Initialize the database
        insertedBasketballCourt = basketballCourtRepository.saveAndFlush(basketballCourt);

        // Get the basketballCourt
        restBasketballCourtMockMvc
            .perform(get(ENTITY_API_URL_ID, basketballCourt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(basketballCourt.getId().intValue()))
            .andExpect(jsonPath("$.courtName").value(DEFAULT_COURT_NAME))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.zipCode").value(DEFAULT_ZIP_CODE))
            .andExpect(jsonPath("$.streetAddress").value(DEFAULT_STREET_ADDRESS))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE));
    }

    @Test
    @Transactional
    void getNonExistingBasketballCourt() throws Exception {
        // Get the basketballCourt
        restBasketballCourtMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBasketballCourt() throws Exception {
        // Initialize the database
        insertedBasketballCourt = basketballCourtRepository.saveAndFlush(basketballCourt);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the basketballCourt
        BasketballCourt updatedBasketballCourt = basketballCourtRepository.findById(basketballCourt.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedBasketballCourt are not directly saved in db
        em.detach(updatedBasketballCourt);
        updatedBasketballCourt
            .courtName(UPDATED_COURT_NAME)
            .state(UPDATED_STATE)
            .zipCode(UPDATED_ZIP_CODE)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .longitude(UPDATED_LONGITUDE)
            .latitude(UPDATED_LATITUDE);

        restBasketballCourtMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBasketballCourt.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedBasketballCourt))
            )
            .andExpect(status().isOk());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBasketballCourtToMatchAllProperties(updatedBasketballCourt);
    }

    @Test
    @Transactional
    void putNonExistingBasketballCourt() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        basketballCourt.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBasketballCourtMockMvc
            .perform(
                put(ENTITY_API_URL_ID, basketballCourt.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(basketballCourt))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBasketballCourt() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        basketballCourt.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasketballCourtMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(basketballCourt))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBasketballCourt() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        basketballCourt.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasketballCourtMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(basketballCourt)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBasketballCourtWithPatch() throws Exception {
        // Initialize the database
        insertedBasketballCourt = basketballCourtRepository.saveAndFlush(basketballCourt);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the basketballCourt using partial update
        BasketballCourt partialUpdatedBasketballCourt = new BasketballCourt();
        partialUpdatedBasketballCourt.setId(basketballCourt.getId());

        partialUpdatedBasketballCourt
            .state(UPDATED_STATE)
            .zipCode(UPDATED_ZIP_CODE)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .latitude(UPDATED_LATITUDE);

        restBasketballCourtMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBasketballCourt.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBasketballCourt))
            )
            .andExpect(status().isOk());

        // Validate the BasketballCourt in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBasketballCourtUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedBasketballCourt, basketballCourt),
            getPersistedBasketballCourt(basketballCourt)
        );
    }

    @Test
    @Transactional
    void fullUpdateBasketballCourtWithPatch() throws Exception {
        // Initialize the database
        insertedBasketballCourt = basketballCourtRepository.saveAndFlush(basketballCourt);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the basketballCourt using partial update
        BasketballCourt partialUpdatedBasketballCourt = new BasketballCourt();
        partialUpdatedBasketballCourt.setId(basketballCourt.getId());

        partialUpdatedBasketballCourt
            .courtName(UPDATED_COURT_NAME)
            .state(UPDATED_STATE)
            .zipCode(UPDATED_ZIP_CODE)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .longitude(UPDATED_LONGITUDE)
            .latitude(UPDATED_LATITUDE);

        restBasketballCourtMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBasketballCourt.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBasketballCourt))
            )
            .andExpect(status().isOk());

        // Validate the BasketballCourt in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBasketballCourtUpdatableFieldsEquals(
            partialUpdatedBasketballCourt,
            getPersistedBasketballCourt(partialUpdatedBasketballCourt)
        );
    }

    @Test
    @Transactional
    void patchNonExistingBasketballCourt() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        basketballCourt.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBasketballCourtMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, basketballCourt.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(basketballCourt))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBasketballCourt() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        basketballCourt.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasketballCourtMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(basketballCourt))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBasketballCourt() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        basketballCourt.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasketballCourtMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(basketballCourt)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BasketballCourt in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBasketballCourt() throws Exception {
        // Initialize the database
        insertedBasketballCourt = basketballCourtRepository.saveAndFlush(basketballCourt);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the basketballCourt
        restBasketballCourtMockMvc
            .perform(delete(ENTITY_API_URL_ID, basketballCourt.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return basketballCourtRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected BasketballCourt getPersistedBasketballCourt(BasketballCourt basketballCourt) {
        return basketballCourtRepository.findById(basketballCourt.getId()).orElseThrow();
    }

    protected void assertPersistedBasketballCourtToMatchAllProperties(BasketballCourt expectedBasketballCourt) {
        assertBasketballCourtAllPropertiesEquals(expectedBasketballCourt, getPersistedBasketballCourt(expectedBasketballCourt));
    }

    protected void assertPersistedBasketballCourtToMatchUpdatableProperties(BasketballCourt expectedBasketballCourt) {
        assertBasketballCourtAllUpdatablePropertiesEquals(expectedBasketballCourt, getPersistedBasketballCourt(expectedBasketballCourt));
    }
}
