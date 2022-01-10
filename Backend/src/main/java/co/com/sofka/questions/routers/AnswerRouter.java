package co.com.sofka.questions.routers;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.AnswerPositionUserDTO;
import co.com.sofka.questions.usecases.updateposition.UpdatePositionAnswerUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class AnswerRouter {

    @Bean
    public RouterFunction<ServerResponse> updatePositionAnswer(UpdatePositionAnswerUseCase updatePositionAnswerUseCase){
        return route(POST("/updatePosition").and(accept(MediaType.APPLICATION_JSON)),
                request -> request.bodyToMono(AnswerPositionUserDTO.class)
                        .flatMap(answerPositionUserDTO -> updatePositionAnswerUseCase.apply(answerPositionUserDTO)
                                .flatMap(result -> ServerResponse.ok()
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .bodyValue(result)))
        );
    }

}
