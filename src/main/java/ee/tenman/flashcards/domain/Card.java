package ee.tenman.flashcards.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Card.
 */
@Entity
@Table(name = "card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "front", length = 500, nullable = false)
    private String front;

    @NotNull
    @Lob
    @Column(name = "back", nullable = false)
    private String back;

    @Column(name = "known")
    private Boolean known;

    @Column(name = "enabled")
    private Boolean enabled;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFront() {
        return front;
    }

    public Card front(String front) {
        this.front = front;
        return this;
    }

    public void setFront(String front) {
        this.front = front;
    }

    public String getBack() {
        return back;
    }

    public Card back(String back) {
        this.back = back;
        return this;
    }

    public void setBack(String back) {
        this.back = back;
    }

    public Boolean isKnown() {
        return known;
    }

    public Card known(Boolean known) {
        this.known = known;
        return this;
    }

    public void setKnown(Boolean known) {
        this.known = known;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public Card enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public User getUser() {
        return user;
    }

    public Card user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Card card = (Card) o;
        if (card.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), card.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", front='" + getFront() + "'" +
            ", back='" + getBack() + "'" +
            ", known='" + isKnown() + "'" +
            ", enabled='" + isEnabled() + "'" +
            "}";
    }
}
