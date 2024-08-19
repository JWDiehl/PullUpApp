package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.CourtTypeAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.CourtType;
import com.mycompany.myapp.repository.CourtTypeRepository;
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
 * Integration tests for the {@link CourtTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CourtTypeResourceIT {

    private static final String DEFAULT_TYPE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_BALL_COURT_ID = 1L;
    private static final Long UPDATED_BALL_COURT_ID = 2L;

    private static final String ENTITY_API_URL = "/api/court-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CourtTypeRepository courtTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCourtTypeMockMvc;

    private CourtType courtType;

    private CourtType insertedCourtType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourtType createEntity(EntityManager em) {
        CourtType courtType = new CourtType().typeName(DEFAULT_TYPE_NAME).ballCourtID(DEFAULT_BALL_COURT_ID);
        return courtType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourtType createUpdatedEntity(EntityManager em) {
        CourtType courtType = new CourtType().typeName(UPDATED_TYPE_NAME).ballCourtID(UPDATED_BALL_COURT_ID);
        return courtType;
    }

    @BeforeEach
    public void initTest() {
        courtType = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedCourtType != null) {
            courtTypeRepository.delete(insertedCourtType);
            insertedCourtType = null;
        }
    }

    @Test
    @Transactional
    void createCourtType() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CourtType
        var returnedCourtType = om.readValue(
            restCourtTypeMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courtType)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CourtType.class
        );

        // Validate the CourtType in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCourtTypeUpdatableFieldsEquals(returnedCourtType, getPersistedCourtType(returnedCourtType));

        insertedCourtType = returnedCourtType;
    }

    @Test
    @Transactional
    void createCourtTypeWithExistingId() throws Exception {
        // Create the CourtType with an existing ID
        courtType.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourtTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courtType)))
            .andExpect(status().isBadRequest());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCourtTypes() throws Exception {
        // Initialize the database
        insertedCourtType = courtTypeRepository.saveAndFlush(courtType);

        // Get all the courtTypeList
        restCourtTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courtType.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeName").value(hasItem(DEFAULT_TYPE_NAME)))
            .andExpect(jsonPath("$.[*].ballCourtID").value(hasItem(DEFAULT_BALL_COURT_ID.intValue())));
    }

    @Test
    @Transactional
    void getCourtType() throws Exception {
        // Initialize the database
        insertedCourtType = courtTypeRepository.saveAndFlush(courtType);

        // Get the courtType
        restCourtTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, courtType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(courtType.getId().intValue()))
            .andExpect(jsonPath("$.typeName").value(DEFAULT_TYPE_NAME))
            .andExpect(jsonPath("$.ballCourtID").value(DEFAULT_BALL_COURT_ID.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCourtType() throws Exception {
        // Get the courtType
        restCourtTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCourtType() throws Exception {
        // Initialize the database
        insertedCourtType = courtTypeRepository.saveAndFlush(courtType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courtType
        CourtType updatedCourtType = courtTypeRepository.findById(courtType.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCourtType are not directly saved in db
        em.detach(updatedCourtType);
        updatedCourtType.typeName(UPDATED_TYPE_NAME).ballCourtID(UPDATED_BALL_COURT_ID);

        restCourtTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCourtType.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCourtType))
            )
            .andExpect(status().isOk());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCourtTypeToMatchAllProperties(updatedCourtType);
    }

    @Test
    @Transactional
    void putNonExistingCourtType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courtType.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourtTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courtType.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courtType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCourtType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courtType.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourtTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courtType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCourtType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courtType.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourtTypeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courtType)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCourtTypeWithPatch() throws Exception {
        // Initialize the database
        insertedCourtType = courtTypeRepository.saveAndFlush(courtType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courtType using partial update
        CourtType partialUpdatedCourtType = new CourtType();
        partialUpdatedCourtType.setId(courtType.getId());

        partialUpdatedCourtType.typeName(UPDATED_TYPE_NAME).ballCourtID(UPDATED_BALL_COURT_ID);

        restCourtTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourtType.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourtType))
            )
            .andExpect(status().isOk());

        // Validate the CourtType in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourtTypeUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCourtType, courtType),
            getPersistedCourtType(courtType)
        );
    }

    @Test
    @Transactional
    void fullUpdateCourtTypeWithPatch() throws Exception {
        // Initialize the database
        insertedCourtType = courtTypeRepository.saveAndFlush(courtType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courtType using partial update
        CourtType partialUpdatedCourtType = new CourtType();
        partialUpdatedCourtType.setId(courtType.getId());

        partialUpdatedCourtType.typeName(UPDATED_TYPE_NAME).ballCourtID(UPDATED_BALL_COURT_ID);

        restCourtTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourtType.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourtType))
            )
            .andExpect(status().isOk());

        // Validate the CourtType in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourtTypeUpdatableFieldsEquals(partialUpdatedCourtType, getPersistedCourtType(partialUpdatedCourtType));
    }

    @Test
    @Transactional
    void patchNonExistingCourtType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courtType.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourtTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, courtType.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courtType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCourtType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courtType.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourtTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courtType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCourtType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courtType.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourtTypeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(courtType)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourtType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCourtType() throws Exception {
        // Initialize the database
        insertedCourtType = courtTypeRepository.saveAndFlush(courtType);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the courtType
        restCourtTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, courtType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return courtTypeRepository.count();
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

    protected CourtType getPersistedCourtType(CourtType courtType) {
        return courtTypeRepository.findById(courtType.getId()).orElseThrow();
    }

    protected void assertPersistedCourtTypeToMatchAllProperties(CourtType expectedCourtType) {
        assertCourtTypeAllPropertiesEquals(expectedCourtType, getPersistedCourtType(expectedCourtType));
    }

    protected void assertPersistedCourtTypeToMatchUpdatableProperties(CourtType expectedCourtType) {
        assertCourtTypeAllUpdatablePropertiesEquals(expectedCourtType, getPersistedCourtType(expectedCourtType));
    }
}
