import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestions } from '../actions/questionActions'
import Question from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question key={question.id} showFavorite={false} question={question} excerpt />)
    }

    return (
        <section>
            <h1 className="text-center mt-5">Questions</h1>
            <div className="py-5 d-flex justify-content-center">
                <div className="card container container-md mb-5">
                    {renderQuestions()}
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)
