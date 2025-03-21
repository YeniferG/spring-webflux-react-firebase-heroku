import React from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { connect } from 'react-redux';
import { addFavorite } from '../actions/questionActions';

const Question = ({ dispatch, question, excerpt, onDelete,showFavorite,userId }) => {
  const handleClick = () => {
    const data = {
      questionId: question.id,
      question : question.question,
      userId
    }
    dispatch(addFavorite(data))
  }

  return (
    <article className={excerpt ? 'question-excerpt' : 'question'}>
      <div class="row mt-3 justify-content-between">
        <div class="col-md-auto">
          <img className="img-profile" src={question.photoUrl ? question.photoUrl : "https://i.ibb.co/1rkvVY3/foto-anonimus-profile.png"}/>
        </div>
        <div className='col-md-auto'>
          <h2><div dangerouslySetInnerHTML={{ __html: question.question }} /></h2>
          <p>{question.category}  - <small>{question.type}</small></p>
          <div className='row'>
            <div className='col-md-auto'>
              {excerpt && (
                <Link to={`/question/${question.id}`} className="btn btn-primary btn-lg btn-block">
                  View Question
                </Link>
              )}
            </div>
            <div className='col-md-auto'>
              {onDelete && (
                <button className="btn btn-danger btn-lg btn-block" onClick={() => onDelete(question.id)}>Delete</button>
              )}
            </div>
          </div>
        </div>
        <div className='col-md-auto container-question-title'>
        {question.favorite && userId ? 
          <div className='container-favorites' onClick={handleClick}>
            <p className='text-favorite'><b>Add Favorites</b></p>
            <StarOutlineIcon />
          </div> : showFavorite && userId ? 
          <div className='container-favorites-added'>
            <p className='text-favorite'><b>Added</b></p>
            <StarIcon /> 
          </div> :null}
      </div>
      </div>
    </article>
  )
  }

const mapStateToProps = state => ({
  userId: state.auth.uid
})

export default connect(mapStateToProps)(Question);

