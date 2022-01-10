package co.com.sofka.questions.usecases.user;

import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.reposioties.UserRepository;
import co.com.sofka.questions.usecases.MapperUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;


@Service
@Validated
public class FindUserByIdUseCase {

    private final UserRepository userRepository;
    private final MapperUtils mapperUtils;

    public FindUserByIdUseCase(UserRepository userRepository, MapperUtils mapperUtils) {
        this.userRepository = userRepository;
        this.mapperUtils = mapperUtils;
    }

    public Mono<UserDTO> findUserById(String id){
        return userRepository.findById(id)
                .map(user -> mapperUtils.mapEntityToUser().apply(user));
    }

}
