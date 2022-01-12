import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { deleteFavorite, getFavoritesUser } from "../actions/questionActions";
import swal from 'sweetalert';

const FavoritesFormPage = ({ dispatch,favorites, userId,redirect }) => {

    const handleClick = (id) => {        
        swal({
            title: "Estas seguro de eliminar?",
            text: "Una vez eliminada no podras recuperar esta pregunta",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteFavorite(id))
                    swal("Tu pregunta ha sido eliminada exitosamente", {
                        icon: "success",
                    });
                }
            });
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