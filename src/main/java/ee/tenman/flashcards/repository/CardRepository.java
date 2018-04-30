package ee.tenman.flashcards.repository;

import ee.tenman.flashcards.domain.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Card entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Query("select card from Card card where card.enabled = true and card.known = false and card.user.login = ?#{principal.username}")
    List<Card> findByUserIsCurrentUser();

    @Query("select card from Card card where card.user.login = ?#{principal.username}")
    List<Card> findAll();

    @Query("select card from Card card where card.user.login = ?#{principal.username}")
    Page<Card> findByUserIsCurrentUser(Pageable pageable);

}
