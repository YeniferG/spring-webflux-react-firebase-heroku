package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.AnswerPositionUser;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.AnswerPositionUserDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.UserDTO;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.function.Function;

@Component
public class MapperUtils {

    public Function<AnswerDTO, Answer> mapperToAnswer() {
        return updateAnswer -> {
            var answer = new Answer();
            answer.setUserId(updateAnswer.getUserId());
            answer.setQuestionId(updateAnswer.getQuestionId());
            answer.setAnswer(updateAnswer.getAnswer());
            answer.setPosition(updateAnswer.getPosition());
            answer.setPhotoUrl(updateAnswer.getPhotoUrl());
            return answer;
        };
    }

    public Function<QuestionDTO, Question> mapperToQuestion(String id) {
        return updateQuestion -> {
            var question = new Question();
            question.setId(id);
            question.setUserId(updateQuestion.getUserId());
            question.setCategory(updateQuestion.getCategory());
            question.setQuestion(updateQuestion.getQuestion());
            question.setType(updateQuestion.getType());
            question.setPhotoUrl(updateQuestion.getPhotoUrl());
            return question;
        };
    }

    public Function<Question, QuestionDTO> mapEntityToQuestion() {
        return entity -> new QuestionDTO(
                entity.getId(),
                entity.getUserId(),
                entity.getQuestion(),
                entity.getType(),
                entity.getCategory(),
                entity.getPhotoUrl()
        );
    }

    public Function<Answer, AnswerDTO> mapEntityToAnswer() {
        return entity -> new AnswerDTO(
                entity.getQuestionId(),
                entity.getId(),
                entity.getUserId(),
                entity.getAnswer(),
                entity.getPosition(),
                entity.getPhotoUrl()
        );
    }

    public Function<User, UserDTO> mapEntityToUser() {
        return entity -> new UserDTO(
                entity.getId(),
                entity.getDisplayName(),
                entity.getEmail()
        );
    }

    public Function<UserDTO, User> mapperToUser(String id) {
        return updateUser -> new User(
                id,
                updateUser.getName(),
                updateUser.getEmail()
        );
    }

    public Function<AnswerPositionUserDTO, AnswerPositionUser> mapAnswerPositionUserDTOToEntity(String id) {
        return answerPositionUserDTO -> {
            var answerPosition = new AnswerPositionUser();
            answerPosition.setId(id);
            answerPosition.setQuestionId(answerPositionUserDTO.getQuestionId());
            answerPosition.setUserId(answerPositionUserDTO.getUserId());
            answerPosition.setAnswerId(answerPositionUserDTO.getAnswerId());
            answerPosition.setAction(answerPositionUserDTO.getAction());
            answerPosition.setAnswerPositionDate(LocalDateTime.now());
            return answerPosition;
        };
    }

    public Function<AnswerPositionUser, AnswerPositionUserDTO> mapEntityToAnswerPositionUserDTO() {
        return entity -> new AnswerPositionUserDTO(
                entity.getAnswerId(),
                entity.getAction(),
                entity.getQuestionId(),
                entity.getUserId()
        );
    }
}
