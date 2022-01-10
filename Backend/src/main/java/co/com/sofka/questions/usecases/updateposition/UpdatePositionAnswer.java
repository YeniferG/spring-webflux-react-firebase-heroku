package co.com.sofka.questions.usecases.updateposition;

import co.com.sofka.questions.model.AnswerPositionUserDTO;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@FunctionalInterface
public interface UpdatePositionAnswer {
    Mono<AnswerPositionUserDTO> apply(@Valid AnswerPositionUserDTO answerPositionUserDTO);
}
