import React, { useEffect } from "react";
import { connect } from 'react-redux'

const FavoritesFormPage = ({ dispatch, loading, redirect, match,hasErrors, question, userId }) => {

    return (
        <section>
        </section>
    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FavoritesFormPage)