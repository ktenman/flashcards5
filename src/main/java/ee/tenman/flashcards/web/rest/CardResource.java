package ee.tenman.flashcards.web.rest;

import com.codahale.metrics.annotation.Timed;
import ee.tenman.flashcards.service.CardService;
import ee.tenman.flashcards.service.dto.CardDTO;
import ee.tenman.flashcards.web.rest.errors.BadRequestAlertException;
import ee.tenman.flashcards.web.rest.util.HeaderUtil;
import ee.tenman.flashcards.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import static ee.tenman.flashcards.web.rest.util.HeaderUtil.APPLICATION_NAME;
import static ee.tenman.flashcards.web.rest.util.HeaderUtil.createEntityUpdateAlert;

/**
 * REST controller for managing Card.
 */
@RestController
@RequestMapping("/api")
public class CardResource {

    private final Logger log = LoggerFactory.getLogger(CardResource.class);

    private static final String ENTITY_NAME = "card";

    private final CardService cardService;

    public CardResource(CardService cardService) {
        this.cardService = cardService;
    }

    /**
     * POST  /cards : Create a new card.
     *
     * @param cardDTO the cardDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardDTO, or with status 400 (Bad Request) if the card has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cards")
    @Timed
    public ResponseEntity<CardDTO> createCard(@Valid @RequestBody CardDTO cardDTO) throws URISyntaxException {
        log.debug("REST request to save Card : {}", cardDTO);
        if (cardDTO.getId() != null) {
            throw new BadRequestAlertException("A new card cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardDTO result = cardService.save(cardDTO);
        return ResponseEntity.created(new URI("/api/cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cards : Updates an existing card.
     *
     * @param cardDTO the cardDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardDTO,
     * or with status 400 (Bad Request) if the cardDTO is not valid,
     * or with status 500 (Internal Server Error) if the cardDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cards")
    @Timed
    public ResponseEntity<CardDTO> updateCard(@Valid @RequestBody CardDTO cardDTO) throws URISyntaxException {
        log.debug("REST request to update Card : {}", cardDTO);
        if (cardDTO.getId() == null) {
            return createCard(cardDTO);
        }
        CardDTO result = cardService.save(cardDTO);
        return ResponseEntity.ok()
            .headers(createEntityUpdateAlert(
                ENTITY_NAME,
                String.format("<strong>%s</strong>", shorten(cardDTO.getFront()))
            ))
            .body(result);
    }

    private String shorten(String input) {
        return input != null && !input.isEmpty() && input.length() > 20 ? input.substring(0, 20) + "..." : input;
    }

    /**
     * GET  /cards : get all the cards.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cards in body
     */
    @GetMapping("/cards")
    @Timed
    public ResponseEntity<List<CardDTO>> getAllCards(Pageable pageable) {
        log.debug("REST request to get a page of Cards");
        Page<CardDTO> page = cardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cards");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cards/:id : get the "id" card.
     *
     * @param id the id of the cardDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cards/{id}")
    @Timed
    public ResponseEntity<CardDTO> getCard(@PathVariable Long id) {
        log.debug("REST request to get Card : {}", id);
        CardDTO cardDTO = cardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cardDTO));
    }

    /**
     * DELETE  /cards/:id : delete the "id" card.
     *
     * @param id the id of the cardDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cards/{id}")
    @Timed
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        log.debug("REST request to delete Card : {}", id);
        cardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/get-random-card")
    public ResponseEntity<CardDTO> getRandomCard() {
        log.debug("REST request to get one random Card");
        List<CardDTO> cards = cardService.findAllEnabledAndUnknown();
        CardDTO cardDTO = null;
        if (cards != null && !cards.isEmpty()) {
            Random random = new Random();
            int index = random.nextInt(cards.size());
            cardDTO = cards.get(index);
        }
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cardDTO));
    }

    @GetMapping("/get-all-cards")
    public List<CardDTO> getAllCards() {
        log.debug("REST request to getOne all cards");
        List<CardDTO> cards = cardService.findAllEnabledAndUnknown();
        Collections.shuffle(cards);
        return cards;
    }

    @GetMapping("/mark-as-known/{id}")
    @Timed
    public ResponseEntity<CardDTO> markAsKnown(@PathVariable Long id) {
        log.debug("REST request to mark as known Card : {}", id);
        CardDTO one = cardService.findOne(id);
        one.setKnown(true);
        CardDTO result = cardService.save(one);
        return ResponseEntity.ok()
            .headers(createEntityUpdateAlert(ENTITY_NAME, one.getId().toString()))
            .body(result);
    }

    @GetMapping("/mark-all-unknown")
    @Timed
    public ResponseEntity<Void> markAllAsUnknown() {
        log.debug("REST request to mark all cards as unknown");
        cardService.markAllAsUnknown();
        return ResponseEntity.ok()
            .headers(HeaderUtil.createAlert(APPLICATION_NAME + ".randomCard.goodLuck", null)).build();
    }

}
