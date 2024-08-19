package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.BasketballCourtTestSamples.*;
import static com.mycompany.myapp.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class UserProfileTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProfile.class);
        UserProfile userProfile1 = getUserProfileSample1();
        UserProfile userProfile2 = new UserProfile();
        assertThat(userProfile1).isNotEqualTo(userProfile2);

        userProfile2.setId(userProfile1.getId());
        assertThat(userProfile1).isEqualTo(userProfile2);

        userProfile2 = getUserProfileSample2();
        assertThat(userProfile1).isNotEqualTo(userProfile2);
    }

    @Test
    void savedCourtsTest() {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        BasketballCourt basketballCourtBack = getBasketballCourtRandomSampleGenerator();

        userProfile.addSavedCourts(basketballCourtBack);
        assertThat(userProfile.getSavedCourts()).containsOnly(basketballCourtBack);

        userProfile.removeSavedCourts(basketballCourtBack);
        assertThat(userProfile.getSavedCourts()).doesNotContain(basketballCourtBack);

        userProfile.savedCourts(new HashSet<>(Set.of(basketballCourtBack)));
        assertThat(userProfile.getSavedCourts()).containsOnly(basketballCourtBack);

        userProfile.setSavedCourts(new HashSet<>());
        assertThat(userProfile.getSavedCourts()).doesNotContain(basketballCourtBack);
    }
}
