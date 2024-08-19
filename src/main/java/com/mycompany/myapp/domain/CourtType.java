package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CourtType.
 */
@Entity
@Table(name = "court_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourtType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type_name")
    private String typeName;

    @Column(name = "ball_court_id")
    private Long ballCourtID;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "courtType")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "courtType", "userProfiles" }, allowSetters = true)
    private Set<BasketballCourt> ballCourts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CourtType id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeName() {
        return this.typeName;
    }

    public CourtType typeName(String typeName) {
        this.setTypeName(typeName);
        return this;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Long getBallCourtID() {
        return this.ballCourtID;
    }

    public CourtType ballCourtID(Long ballCourtID) {
        this.setBallCourtID(ballCourtID);
        return this;
    }

    public void setBallCourtID(Long ballCourtID) {
        this.ballCourtID = ballCourtID;
    }

    public Set<BasketballCourt> getBallCourts() {
        return this.ballCourts;
    }

    public void setBallCourts(Set<BasketballCourt> basketballCourts) {
        if (this.ballCourts != null) {
            this.ballCourts.forEach(i -> i.setCourtType(null));
        }
        if (basketballCourts != null) {
            basketballCourts.forEach(i -> i.setCourtType(this));
        }
        this.ballCourts = basketballCourts;
    }

    public CourtType ballCourts(Set<BasketballCourt> basketballCourts) {
        this.setBallCourts(basketballCourts);
        return this;
    }

    public CourtType addBallCourts(BasketballCourt basketballCourt) {
        this.ballCourts.add(basketballCourt);
        basketballCourt.setCourtType(this);
        return this;
    }

    public CourtType removeBallCourts(BasketballCourt basketballCourt) {
        this.ballCourts.remove(basketballCourt);
        basketballCourt.setCourtType(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourtType)) {
            return false;
        }
        return getId() != null && getId().equals(((CourtType) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourtType{" +
            "id=" + getId() +
            ", typeName='" + getTypeName() + "'" +
            ", ballCourtID=" + getBallCourtID() +
            "}";
    }
}
