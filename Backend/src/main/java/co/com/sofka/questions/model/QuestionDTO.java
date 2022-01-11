package co.com.sofka.questions.model;


import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class QuestionDTO {
    private String id;
    @NotBlank
    private String userId;
    @NotBlank
    private String question;
    @NotBlank
    private String type;
    @NotBlank
    private String category;
    private List<AnswerDTO> answers;
    @NotBlank
    private String photoUrl;

    private Boolean favorite;


    public QuestionDTO() {

    }

    public QuestionDTO(String userId, String question, String type, String category) {
        this.userId = userId;
        this.question = question;
        this.type = type;
        this.category = category;
    }

    public QuestionDTO(String id, String userId, String question, String type, String category, String photoUrl, Boolean favorite) {
        this.id = id;
        this.userId = userId;
        this.question = question;
        this.type = type;
        this.category = category;
        this.photoUrl = photoUrl;
        this.favorite = favorite;
    }

    public QuestionDTO(String id, String userId, String question, String type, String category, String photo) {
        this.id = id;
        this.userId = userId;
        this.question = question;
        this.type = type;
        this.category = category;
        this.photoUrl = photo;
    }

    public List<AnswerDTO> getAnswers() {
        this.answers = Optional.ofNullable(answers).orElse(new ArrayList<>());
        return answers;
    }

    public void setAnswers(List<AnswerDTO> answers) {
        this.answers = answers;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionDTO that = (QuestionDTO) o;
        return Objects.equals(id, that.id) && Objects.equals(userId, that.userId) && Objects.equals(question, that.question) && Objects.equals(type, that.type) && Objects.equals(category, that.category) && Objects.equals(answers, that.answers) && Objects.equals(photoUrl, that.photoUrl) && Objects.equals(favorite, that.favorite);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, question, type, category, answers, photoUrl, favorite);
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", question='" + question + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", answers=" + answers +
                ", photoUrl='" + photoUrl + '\'' +
                ", favorite=" + favorite +
                '}';
    }
}
