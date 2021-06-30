import React, { useRef } from "react"
import { Redirect, BrowserRouter as Router, Route, Switch, withRouter, useLocation } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import Stockx from "modules/stockx/containers/Stockx";
import StockxSingle from "modules/stockx/containers/StockxSingle";
import Navbar from "lib/components/navbar/containers/Navbar"
import Footer from "lib/components/footer/Footer"
import SignIn from "modules/auth/Login"
import SignUp from "modules/auth/Register"
import { useEffect } from "react";
import { auth, createUserProfileDocument } from "lib/utils/firebase"
import extract from "lib/utils/extractValue.js";


export default ({ init, setCurrentUser, currentUser }) => {

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        (await userRef).onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
    init()
  }, [init])

  return (
    <Router>
      <Navbar />
      <Scroller />
      <Switch>
        <Route exact={true} path="/" component={Stockx} />
        <Route exact={true} path="/stockx" component={Stockx} />
        <Route exact={true} path="/stockx/:id" component={StockxSingle} />
        {/* LOGIN/REGISTER ROUTES */}
        <Route exact={true} path="/signin" render={() => extract(["currentUser"], currentUser) ? (<Redirect to="/stockx" />) : (<SignIn />)} />
        <Route exact={true} path="/signup" render={() => extract(["currentUser"], currentUser) ? (<Redirect to="/stockx" />) : (<SignUp />)} />
      </Switch>
      <Footer />
    </Router>
  )
}


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const ScrollToTopController = () => {
  let location = useLocation();
  const pathname = location.pathname
  const prevCountRef = usePrevious(pathname);
  useEffect(() => {
    if (pathname !== prevCountRef) {
      window.scrollTo(0, 0);
    }
  });
  return null;
};


const Scroller = withRouter(ScrollToTopController)