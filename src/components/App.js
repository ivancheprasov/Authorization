import * as React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import AuthorizationForm from "./AuthorizationForm";
import MainForm from "./MainForm";

function App(props) {
    const authorized = props.user.authorized;
    return (
        <BrowserRouter>
            <Route exact path={"/welcome"} component={AuthorizationForm}/>
            <Route exact path={"/main"} component={MainForm}/>
            {authorized && <Redirect to={"/main"}/>}
            {(!authorized && <Redirect to={"/welcome"}/>)}
        </BrowserRouter>
    );
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
};
export default connect(
    mapStateToProps
)(App)