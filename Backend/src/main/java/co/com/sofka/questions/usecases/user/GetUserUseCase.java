package co.com.sofka.questions.usecases.user;

import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.repositories.UserRepository;
import co.com.sofka.questions.usecases.MapperUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.function.Function;

@Service
@Validated
public class GetUserUseCase implements Function<String, Mono<UserDTO>> {

    private final UserRepository userRepository;
    private final MapperUtils mapperUtils;

    public GetUserUseCase(UserRepository userRepository, MapperUtils mapperUtils) {
        this.userRepository = userRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<UserDTO> apply(String id) {
        Objects.requireNonNull(id, "Id is required");
        return userRepository.findById(id)
                .map(mapperUtils.mapEntityToUser());
    }
}
