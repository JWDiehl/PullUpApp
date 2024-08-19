package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.BasketballCourtTestSamples.*;
import static com.mycompany.myapp.domain.CourtTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CourtTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourtType.class);
        CourtType courtType1 = getCourtTypeSample1();
        CourtType courtType2 = new CourtType();
        assertThat(courtType1).isNotEqualTo(courtType2);

        courtType2.setId(courtType1.getId());
        assertThat(courtType1).isEqualTo(courtType2);

        courtType2 = getCourtTypeSample2();
        assertThat(courtType1).isNotEqualTo(courtType2);
    }

    @Test
    void ballCourtsTest() {
        CourtType courtType = getCourtTypeRandomSampleGenerator();
        BasketballCourt basketballCourtBack = getBasketballCourtRandomSampleGenerator();

        courtType.addBallCourts(basketballCourtBack);
        assertThat(courtType.getBallCourts()).containsOnly(basketballCourtBack);
        assertThat(basketballCourtBack.getCourtType()).isEqualTo(courtType);

        courtType.removeBallCourts(basketballCourtBack);
        assertThat(courtType.getBallCourts()).doesNotContain(basketballCourtBack);
        assertThat(basketballCourtBack.getCourtType()).isNull();

        courtType.ballCourts(new HashSet<>(Set.of(basketballCourtBack)));
        assertThat(courtType.getBallCourts()).containsOnly(basketballCourtBack);
        assertThat(basketballCourtBack.getCourtType()).isEqualTo(courtType);

        courtType.setBallCourts(new HashSet<>());
        assertThat(courtType.getBallCourts()).doesNotContain(basketballCourtBack);
        assertThat(basketballCourtBack.getCourtType()).isNull();
    }
}
