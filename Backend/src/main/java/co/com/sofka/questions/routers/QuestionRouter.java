package co.com.sofka.questions.routers;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.FavoriteDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.usecases.answers.AddAnswerUseCase;
import co.com.sofka.questions.usecases.favorite.FavoritesUseCase;
import co.com.sofka.questions.usecases.questions.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.function.Function;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class QuestionRouter {

    @Bean
    public RouterFunction<ServerResponse> getAll(ListUseCase listUseCase) {
        return route(GET("/getAll"),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(listUseCase.get(), QuestionDTO.class))
                        .onErrorResume(throwable -> ServerResponse.badRequest().body(throwable.getMessage(), String.class))
        );
    }

    @Bean
    public RouterFunction<ServerResponse> getOwnerAll(OwnerListUseCase ownerListUseCase) {
        return route(
                GET("/getOwnerAll/{userId}"),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(
                                ownerListUseCase.apply(request.pathVariable("userId")),
                                QuestionDTO.class
                        ))
                        .onErrorResume(throwable -> ServerResponse.badRequest().body(throwable.getMessage(), String.class))
        );
    }

    @Bean
    public RouterFunction<ServerResponse> create(CreateUseCase createUseCase) {
        Function<QuestionDTO, Mono<ServerResponse>> executor = questionDTO ->  createUseCase.apply(questionDTO)
                .flatMap(result -> ServerResponse.ok()
                        .contentType(MediaType.TEXT_PLAIN)
                        .bodyValue(result))
                .onErrorResume(throwable -> ServerResponse.badRequest().body(throwable.getMessage(), String.class));

        return route(
                POST("/create").and(accept(MediaType.APPLICATION_JSON)),
                request -> request.bodyToMono(QuestionDTO.class).flatMap(executor)
                        .onErrorResume(throwable -> ServerResponse.badRequest().body(throwable.getMessage(), String.class))
        );
    }

    @Bean
    public RouterFunction<ServerResponse> getFavorites(FavoritesUseCase useCase) {
        return route(GET("/getFavorites/{id}").and(accept(MediaType.APPLICATION_JSON)),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(
                                useCase.apply(request.pathVariable("id")),
                                FavoriteDTO.class
                        ))
        );
    }

    @Bean
    public RouterFunction<ServerResponse> get(GetUseCase getUseCase) {
        return route(
                GET("/get/{id}/{userId}").and(accept(MediaType.APPLICATION_JSON)),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(getUseCase.apply(
                                        request.pathVariable("id"),
                                        request.pathVariable("userId")),
                                QuestionDTO.class
                        ))
        );
    }

    @Bean
    public RouterFunction<ServerResponse> delete(DeleteUseCase deleteUseCase) {
        return route(
                DELETE("/delete/{id}").and(accept(MediaType.APPLICATION_JSON)),
                request -> ServerResponse.accepted()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(deleteUseCase.apply(request.pathVariable("id")), Void.class))
                        .onErrorResume(throwable -> ServerResponse.badRequest().body(throwable.getMessage(), String.class))
        );
    }

    @Bean
    public RouterFunction<ServerResponse> update(UpdateUseCase updateUseCase) {
        Function<QuestionDTO, Mono<ServerResponse>> executor = questionDTO ->  updateUseCase.apply(questionDTO)
                .flatMap(result -> ServerResponse.ok()
                        .contentType(MediaType.TEXT_PLAIN)
                        .bodyValue(result));

        return route(
                PUT("/update").and(accept(MediaType.APPLICATION_JSON)),
                request -> request.bodyToMono(QuestionDTO.class).flatMap(executor)
                        .onErrorResume(throwable -> ServerResponse.badRequest().body(throwable.getMessage(), String.class))
        );
    }
}
