import * as React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import AuthorizationForm from "./AuthorizationForm";
import MainForm from "./MainForm";

class App extends React.Component {
    render() {
        const authorized=this.props.user.authorized;
        return(
        <BrowserRouter>
            <Route exact path={"/welcome"} component={AuthorizationForm}/>
            <Route exact path={"/main"} component={MainForm}/>
            {authorized && <Redirect to={"/main"}/>}
            {(!authorized && <Redirect to={"/welcome"}/>)}
        </BrowserRouter>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
};
const mapDispatchToProps = dispatch => {
    return {
        // setStyle: deviceType => dispatch(setStyle(deviceType)),
        // setCanvasWidth: width => dispatch(setCanvasWidth(width)),
        // setDeviceType: deviceType => dispatch(setDeviceType(deviceType)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)