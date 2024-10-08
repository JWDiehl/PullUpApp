package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CourtType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CourtType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourtTypeRepository extends JpaRepository<CourtType, Long> {}
