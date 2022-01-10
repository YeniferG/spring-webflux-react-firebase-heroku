import React from 'react'
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { connect } from 'react-redux';
import { postUpdatePositionAnswer } from '../actions/answerActions';

const Answer = ({ answer, dispatch, userId }) => {
  
  const handleClick = (action) => {
    const data = {
      userId,
      answerId : answer.answerId,
      questionId: answer.questionId,
      action
    }
    dispatch(postUpdatePositionAnswer(data))
  }

return (
  <div className="container-md shadow p-4 mb-3 rounded form-group mx-10">
    <div class="noticia">
      <img class="izquierda" src={answer.photoUrl ? answer.photoUrl : "https://i.ibb.co/1rkvVY3/foto-anonimus-profile.png"} />
      <aside className="answer">
        <p><div dangerouslySetInnerHTML={{ __html: answer.answer }} /></p>
        {userId &&
        <div className='score-button'>
          <ArrowDropUpTwoToneIcon className='keyboard' onClick={() => handleClick("sum")}/>
          <span>{answer.position}</span>
          <ArrowDropDownTwoToneIcon className='keyboard' onClick={() => handleClick("rest")}/>
        </div>}
      </aside>
    </div>
  </div>
)}

const mapStateToProps = state => ({
  userId: state.auth.uid
})

export default connect(mapStateToProps)(Answer)