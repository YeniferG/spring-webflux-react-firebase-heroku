package co.com.sofka.questions.usecases.favorite;

import co.com.sofka.questions.model.FavoriteDTO;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

public interface AddFavorite {

    Mono<FavoriteDTO> apply(@Valid FavoriteDTO favoriteDTO);

}
