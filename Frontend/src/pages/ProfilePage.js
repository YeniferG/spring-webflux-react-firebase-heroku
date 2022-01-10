import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { findUserById, updateUser } from "../actions/authActions";
import swal from "sweetalert";

const ProfilePage = () => {
    const user = useSelector(state => state.auth);
    const question = useSelector(state => state.question);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [name, setName] = useState(user.name);

    useEffect(() => {
        dispatch(findUserById(user.uid))
    }, [dispatch, user.uid]);

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const validateInput = data => {
        swal({
            title: "Actualizar?",
            text: "¡Recuerda, al actualizar puedes cambiar el contenido del nombre!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((actualizar) => {
                if (actualizar) {
                    swal("¡Se ha actualizado con exito!", {
                        icon: "success",
                    });
                    data.id = user.uid;
                    data.email = user.email;
                    dispatch(updateUser(data));
                } else {
                    swal("uff, que bueno que preguntamos");
                }
            });
    }

    return (
        <section>
            <div className="container-md shadow p-4 mt-5 mb-3 rounded form-group mx-10">
                <h2 className="text-center">Personal Information</h2>
                <hr />
                <form onSubmit={handleSubmit(validateInput)}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <br></br>
                        <input id="name" className="form-control" {...register("name", { required: true, maxLength: 100 })} onChange={handleChange} value={name} />
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="form-control" disabled={true} value={user.email} />
                    </div>
                    <br></br>
                    <button type='submit' className='btn btn-primary btn-lg' disabled={question.loading}>
                        {question.loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ProfilePage;