import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { deleteFavorite, getFavoritesUser } from "../actions/questionActions";

const FavoritesFormPage = ({ dispatch,favorites, userId,redirect }) => {

    const handleClick = (id) => {
        dispatch(deleteFavorite(id))
    }

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
            <h1 className="text-center mt-3">My Favorites</h1><br/>
            {favorites.map(favorite => (
                <div key={favorite.id} className="container-fav">
                    <p className="question-fav"><div dangerouslySetInnerHTML={{ __html: favorite.question }} /></p>
                    <button onClick={() => handleClick(favorite.id)} className="button-rm-fav">Remove</button>
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