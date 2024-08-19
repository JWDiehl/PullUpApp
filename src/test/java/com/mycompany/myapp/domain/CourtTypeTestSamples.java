package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CourtTypeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CourtType getCourtTypeSample1() {
        return new CourtType().id(1L).typeName("typeName1").ballCourtID(1L);
    }

    public static CourtType getCourtTypeSample2() {
        return new CourtType().id(2L).typeName("typeName2").ballCourtID(2L);
    }

    public static CourtType getCourtTypeRandomSampleGenerator() {
        return new CourtType()
            .id(longCount.incrementAndGet())
            .typeName(UUID.randomUUID().toString())
            .ballCourtID(longCount.incrementAndGet());
    }
}
