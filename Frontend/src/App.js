import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch,Route, Redirect,} from 'react-router-dom'

import { login, logout, postUser } from './actions/authActions';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,signInWithGoogle } from './config/auth';

import { PublicNavbar, PrivateNavbar } from './components/Navbar'
import HomePage from './pages/HomePage'
import SingleQuestionPage from './pages/SingleQuestionPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionFormPage from './pages/QuestionFormPage'
import AnswerFormPage from './pages/AnswerFormPage'
import OwnerQuestionsPage from './pages/OwnerQuestionsPage'
import { useDispatch } from 'react-redux';
import Register from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import FavoritesFormPage from './pages/FavoritesFormPage';


const App = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login(user?.email, user?.uid, user?.displayName,user?.photoURL));
    if(user?.uid,user?.displayName,user?.email){
      var data = {};
      data.id = user.uid;
      data.displayName = user.displayName;
      data.email = user.email;
      dispatch(postUser(data));
    }
  }, [user])

  return (
    <Fragment>
      <Router>
      {user ?
        <>
          <PrivateNavbar > <SignOut dispatch={dispatch} /></PrivateNavbar>
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage/>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Route exact path="/user" component={ProfilePage} />
            <Route exact path="/favorites" component={FavoritesFormPage} />
            <Redirect to="/" />
          </Switch>
        </> :
        <>
          <PublicNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage />
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LoginPage} />
            <Redirect to="/" />
          </Switch>
        </>
      }
    </Router>
    <Footer />
    </Fragment>
  )
}


/*function SignIn() {  
  return <button className="button right" onClick={signInWithGoogle}>Sign in with google</button>;
}*/

function SignOut({ dispatch }) {
  return (
    auth.currentUser && (
      <button
        className="button"
        onClick={() => {
          dispatch(logout())
          auth.signOut();
        }}
      >
        Sign out
      </button>
    )
  );
}


export default App
