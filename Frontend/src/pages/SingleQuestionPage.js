import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestion } from '../actions/questionActions'

import Question from '../components/Question'
import Answer from '../components/Answer'
import { Link } from 'react-router-dom'

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  userId,
  redirect
}) => {
  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id, redirect])

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question showFavorite={true} question={question} />
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} />
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}<br/><br/>
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2><br/>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid,
  redirect: state.question.redirect
})

export default connect(mapStateToProps)(SingleQuestionPage)
