package ee.tenman.flashcards.service.mapper;

import ee.tenman.flashcards.domain.*;
import ee.tenman.flashcards.service.dto.CardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Card and its DTO CardDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CardMapper extends EntityMapper<CardDTO, Card> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    CardDTO toDto(Card card);

    @Mapping(source = "userId", target = "user")
    Card toEntity(CardDTO cardDTO);

    default Card fromId(Long id) {
        if (id == null) {
            return null;
        }
        Card card = new Card();
        card.setId(id);
        return card;
    }
}
