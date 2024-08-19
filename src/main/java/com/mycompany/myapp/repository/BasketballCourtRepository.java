package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.BasketballCourt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BasketballCourt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BasketballCourtRepository extends JpaRepository<BasketballCourt, Long> {}
