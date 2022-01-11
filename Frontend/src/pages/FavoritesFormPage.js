import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { getFavoritesUser } from "../actions/questionActions";

const FavoritesFormPage = ({ dispatch,favorites, userId,redirect }) => {

    useEffect(() => {
        if (redirect) {
            dispatch(getFavoritesUser(userId))
        }
    }, [redirect, dispatch, userId]);

    useEffect(() => {
        dispatch(getFavoritesUser(userId))
    }, [dispatch,userId])

    return (
        <section>
            <h1 className="mt-5 text-center">Favorites</h1>
            {favorites.map(favorite => (
                <div key={favorite.id} className="container-fav">
                    <p className="question-fav"><div dangerouslySetInnerHTML={{ __html: favorite.question }} /></p>
                </div>
            ))}
        </section>
    );
}

const mapStateToProps = state => ({
    userId: state.auth.uid,
    favorites : state.question.favorites,
    redirect : state.question.redirect
})

export default connect(mapStateToProps)(FavoritesFormPage)