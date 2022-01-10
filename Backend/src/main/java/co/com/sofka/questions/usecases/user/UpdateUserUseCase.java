package co.com.sofka.questions.usecases.user;


import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.reposioties.UserRepository;
import co.com.sofka.questions.usecases.MapperUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class UpdateUserUseCase{

    private final UserRepository userRepository;
    private final MapperUtils mapperUtils;

    public UpdateUserUseCase(UserRepository userRepository, MapperUtils mapperUtils) {
        this.userRepository = userRepository;
        this.mapperUtils = mapperUtils;
    }

    public Mono<UserDTO> apply (UserDTO userDTO){
        return  userRepository.save(mapperUtils.mapperToUser(userDTO.getId()).apply(userDTO))
                .map(user -> mapperUtils.mapEntityToUser().apply(user));
    }
}
