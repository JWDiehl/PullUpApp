package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BasketballCourt.
 */
@Entity
@Table(name = "basketball_court")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BasketballCourt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "court_name")
    private String courtName;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_code")
    private Integer zipCode;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "latitude")
    private String latitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "ballCourts" }, allowSetters = true)
    private CourtType courtType;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "savedCourts")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "savedCourts" }, allowSetters = true)
    private Set<UserProfile> userProfiles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BasketballCourt id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourtName() {
        return this.courtName;
    }

    public BasketballCourt courtName(String courtName) {
        this.setCourtName(courtName);
        return this;
    }

    public void setCourtName(String courtName) {
        this.courtName = courtName;
    }

    public String getState() {
        return this.state;
    }

    public BasketballCourt state(String state) {
        this.setState(state);
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getZipCode() {
        return this.zipCode;
    }

    public BasketballCourt zipCode(Integer zipCode) {
        this.setZipCode(zipCode);
        return this;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreetAddress() {
        return this.streetAddress;
    }

    public BasketballCourt streetAddress(String streetAddress) {
        this.setStreetAddress(streetAddress);
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getLongitude() {
        return this.longitude;
    }

    public BasketballCourt longitude(String longitude) {
        this.setLongitude(longitude);
        return this;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return this.latitude;
    }

    public BasketballCourt latitude(String latitude) {
        this.setLatitude(latitude);
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public CourtType getCourtType() {
        return this.courtType;
    }

    public void setCourtType(CourtType courtType) {
        this.courtType = courtType;
    }

    public BasketballCourt courtType(CourtType courtType) {
        this.setCourtType(courtType);
        return this;
    }

    public Set<UserProfile> getUserProfiles() {
        return this.userProfiles;
    }

    public void setUserProfiles(Set<UserProfile> userProfiles) {
        if (this.userProfiles != null) {
            this.userProfiles.forEach(i -> i.removeSavedCourts(this));
        }
        if (userProfiles != null) {
            userProfiles.forEach(i -> i.addSavedCourts(this));
        }
        this.userProfiles = userProfiles;
    }

    public BasketballCourt userProfiles(Set<UserProfile> userProfiles) {
        this.setUserProfiles(userProfiles);
        return this;
    }

    public BasketballCourt addUserProfiles(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.getSavedCourts().add(this);
        return this;
    }

    public BasketballCourt removeUserProfiles(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.getSavedCourts().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BasketballCourt)) {
            return false;
        }
        return getId() != null && getId().equals(((BasketballCourt) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BasketballCourt{" +
            "id=" + getId() +
            ", courtName='" + getCourtName() + "'" +
            ", state='" + getState() + "'" +
            ", zipCode=" + getZipCode() +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", longitude='" + getLongitude() + "'" +
            ", latitude='" + getLatitude() + "'" +
            "}";
    }
}
