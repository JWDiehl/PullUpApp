package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.BasketballCourtTestSamples.*;
import static com.mycompany.myapp.domain.CourtTypeTestSamples.*;
import static com.mycompany.myapp.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BasketballCourtTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BasketballCourt.class);
        BasketballCourt basketballCourt1 = getBasketballCourtSample1();
        BasketballCourt basketballCourt2 = new BasketballCourt();
        assertThat(basketballCourt1).isNotEqualTo(basketballCourt2);

        basketballCourt2.setId(basketballCourt1.getId());
        assertThat(basketballCourt1).isEqualTo(basketballCourt2);

        basketballCourt2 = getBasketballCourtSample2();
        assertThat(basketballCourt1).isNotEqualTo(basketballCourt2);
    }

    @Test
    void courtTypeTest() {
        BasketballCourt basketballCourt = getBasketballCourtRandomSampleGenerator();
        CourtType courtTypeBack = getCourtTypeRandomSampleGenerator();

        basketballCourt.setCourtType(courtTypeBack);
        assertThat(basketballCourt.getCourtType()).isEqualTo(courtTypeBack);

        basketballCourt.courtType(null);
        assertThat(basketballCourt.getCourtType()).isNull();
    }

    @Test
    void userProfilesTest() {
        BasketballCourt basketballCourt = getBasketballCourtRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        basketballCourt.addUserProfiles(userProfileBack);
        assertThat(basketballCourt.getUserProfiles()).containsOnly(userProfileBack);
        assertThat(userProfileBack.getSavedCourts()).containsOnly(basketballCourt);

        basketballCourt.removeUserProfiles(userProfileBack);
        assertThat(basketballCourt.getUserProfiles()).doesNotContain(userProfileBack);
        assertThat(userProfileBack.getSavedCourts()).doesNotContain(basketballCourt);

        basketballCourt.userProfiles(new HashSet<>(Set.of(userProfileBack)));
        assertThat(basketballCourt.getUserProfiles()).containsOnly(userProfileBack);
        assertThat(userProfileBack.getSavedCourts()).containsOnly(basketballCourt);

        basketballCourt.setUserProfiles(new HashSet<>());
        assertThat(basketballCourt.getUserProfiles()).doesNotContain(userProfileBack);
        assertThat(userProfileBack.getSavedCourts()).doesNotContain(basketballCourt);
    }
}
