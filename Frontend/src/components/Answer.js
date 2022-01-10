import React from 'react'
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { connect } from 'react-redux';
import { postUpdatePositionAnswer, deleteAnswer } from '../actions/answerActions';
import swal from "sweetalert"

const Answer = ({ answer, dispatch, userId }) => {

  const handleClick = (action) => {
    const data = {
      userId,
      answerId: answer.answerId,
      questionId: answer.questionId,
      action
    }
    dispatch(postUpdatePositionAnswer(data))
  }

  const handleDelete = (AnswerId, questionId) => {
    swal({
      title: "Estas seguro de eliminar?",
      text: "Una vez eliminada no podras recuperar esta pregunta",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteAnswer(AnswerId, questionId))
          swal("Tu respuesta ha sido eliminada exitosamente", {
            icon: "success",
          });
        }
      });
  }

  return (
    <div className="container-md shadow p-4 mb-3 rounded form-group mx-10">
      <div class="noticia">
        <img class="izquierda" src={answer.photoUrl ? answer.photoUrl : "https://i.ibb.co/1rkvVY3/foto-anonimus-profile.png"} />
        <aside className="answer">
          {userId === answer.userId &&
            <button onClick={() => handleDelete(answer.answerId, answer.questionId)} className="button right btn-w">Delete</button>}
          <p><div dangerouslySetInnerHTML={{ __html: answer.answer }} /></p>
          {userId &&
            <div className='score-button'>
              <ArrowDropUpTwoToneIcon className='keyboard' onClick={() => handleClick("sum")} />
              <span>{answer.position}</span>
              <ArrowDropDownTwoToneIcon className='keyboard' onClick={() => handleClick("rest")} />
            </div>}
        </aside>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userId: state.auth.uid
})

export default connect(mapStateToProps)(Answer)