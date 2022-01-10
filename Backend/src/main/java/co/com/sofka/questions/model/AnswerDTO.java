package co.com.sofka.questions.model;


import javax.validation.constraints.NotBlank;
import java.util.Objects;
import java.util.Optional;

public class AnswerDTO {

    private String id;
    @NotBlank
    private String userId;
    @NotBlank
    private String questionId;
    @NotBlank
    private String answer;
    private String answerId;
    private Integer position;
    @NotBlank
    private String photoUrl;


    public AnswerDTO() {

    }

    public AnswerDTO(@NotBlank String questionId,String answerId, @NotBlank String userId, @NotBlank String answer,Integer position, String photoUrl) {
        this.questionId = questionId;
        this.answerId = answerId;
        this.userId = userId;
        this.answer = answer;
        this.position = position;
        this.photoUrl = photoUrl;
    }

    public AnswerDTO( @NotBlank String id, @NotBlank String userId, @NotBlank String questionId, @NotBlank String answer) {
        this.id = id;
        this.userId = userId;
        this.questionId = questionId;
        this.answer = answer;
    }

    public AnswerDTO(String id, String userId, String questionId, String answer, String photoUrl) {
        this.id = id;
        this.userId = userId;
        this.questionId = questionId;
        this.answer = answer;
        this.photoUrl = photoUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getPosition() {
        return Optional.ofNullable(position).orElse(1);
    }

    public void setPosition(Integer position) {
        this.position = position;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getAnswer() {
        return answer;
    }

    public String getAnswerId() {
        return answerId;
    }

    public void setAnswerId(String answerId) {
        this.answerId = answerId;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnswerDTO answerDTO = (AnswerDTO) o;
        return Objects.equals(id, answerDTO.id) && Objects.equals(userId, answerDTO.userId) && Objects.equals(questionId, answerDTO.questionId) && Objects.equals(answer, answerDTO.answer) && Objects.equals(position, answerDTO.position) && Objects.equals(photoUrl, answerDTO.photoUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, questionId, answer, position, photoUrl);
    }

    @Override
    public String toString() {
        return "AnswerDTO{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", questionId='" + questionId + '\'' +
                ", answer='" + answer + '\'' +
                ", position=" + position +
                ", photoUrl='" + photoUrl + '\'' +
                '}';
    }
}
