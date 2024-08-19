package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class BasketballCourtTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static BasketballCourt getBasketballCourtSample1() {
        return new BasketballCourt()
            .id(1L)
            .courtName("courtName1")
            .state("state1")
            .zipCode(1)
            .streetAddress("streetAddress1")
            .longitude("longitude1")
            .latitude("latitude1");
    }

    public static BasketballCourt getBasketballCourtSample2() {
        return new BasketballCourt()
            .id(2L)
            .courtName("courtName2")
            .state("state2")
            .zipCode(2)
            .streetAddress("streetAddress2")
            .longitude("longitude2")
            .latitude("latitude2");
    }

    public static BasketballCourt getBasketballCourtRandomSampleGenerator() {
        return new BasketballCourt()
            .id(longCount.incrementAndGet())
            .courtName(UUID.randomUUID().toString())
            .state(UUID.randomUUID().toString())
            .zipCode(intCount.incrementAndGet())
            .streetAddress(UUID.randomUUID().toString())
            .longitude(UUID.randomUUID().toString())
            .latitude(UUID.randomUUID().toString());
    }
}
