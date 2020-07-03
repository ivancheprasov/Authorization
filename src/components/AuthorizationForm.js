import * as React from "react";
import {connect} from "react-redux";
import {isAuthorized, setPassword, setToken, setUserMessage, setUsername} from "../actions/userActions";
import axios from "axios";
import {
    BASE_URL,
    USERNAME_REGEX,
    PASSWORD_REGEX,
    HOVER,
    COMMON_TEXT_FIELD,
    HOVER_ERROR,
    HIGHLIGHT_ERROR
} from "../const/properties";
import $ from "jquery";
import {setDeviceType} from "../actions/deviceActions";
import {deviceEnum} from "../const/deviceEnum";

class AuthorizationForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.setUserMessage("");
        this.identifyDeviceType();
    }

    render() {
        const {userMessage, deviceType, username, password} = this.props;
        const deviceTypeClass = deviceType === deviceEnum.DESKTOP ? "desktop" : "mobile";
        return (
            <div id={"authorizationDiv"} className={deviceTypeClass}>
                <div id={"authorizationTitleDiv"} className={deviceTypeClass}>
                    WELCOME
                </div>
                <div id={"userMessageDiv"} className={deviceTypeClass}>
                    {userMessage === "" ?
                        <div><br/>{deviceType === deviceEnum.PHONE && <br/>}</div> :
                        userMessage}
                </div>
                <div id={"authorizationFormDiv"} className={deviceTypeClass}>
                    <form name={"authorizationForm"} className={deviceTypeClass}>
                        <input
                            type={"text"}
                            name={"usernameInput"}
                            id={"usernameInput"}
                            form={"authorizationForm"}
                            placeholder={"Username"}
                            maxLength={150}
                            className={deviceTypeClass}
                            value={username || ""}
                            onChange={event => this.usernameInputChange(event)}
                            autoComplete={"new-password"}
                        />
                        <input
                            type={"password"}
                            name={"passwordInput"}
                            id={"passwordInput"}
                            form={"authorizationForm"}
                            placeholder={"Password"}
                            maxLength={128}
                            className={deviceTypeClass}
                            value={password || ""}
                            onChange={event => this.passwordInputChange(event)}
                            autoComplete={"new-password"}
                        />
                        <button
                            id={"signInButton"}
                            type={"button"}
                            className={`requestButton ${deviceTypeClass}`}
                            form={"authorizationForm"}
                            onClick={() => this.signIn()}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        $(window).resize(() => {
            this.identifyDeviceType();
        });
    }

    identifyDeviceType() {
        const width = window.innerWidth;
        if (width >= 1200) {
            this.props.setDeviceType(deviceEnum.DESKTOP);
        } else {
            this.props.setDeviceType(deviceEnum.PHONE);
        }
    }

    hoverTextField(element) {
        const jquery = $(element);
        jquery.hover(() => {
            jquery.css(HOVER);
        }, () => {
            jquery.css(COMMON_TEXT_FIELD);
        });
    }

    hoverError(element) {
        const jquery = $(element);
        jquery.hover(() => {
            jquery.css(HOVER_ERROR);
        }, () => {
            jquery.css(HIGHLIGHT_ERROR);
        });
    }

    isUsernameInputEmpty() {
        const {username} = this.props;
        return (
            username === "" ||
            username == null
        );
    }

    isPasswordInputEmpty() {
        const {password} = this.props;
        return (
            password === "" ||
            password == null
        );
    }

    isCredentialsMissing() {
        return (
            this.isUsernameInputEmpty() ||
            this.isPasswordInputEmpty()
        );
    }

    usernameInputChange(event) {
        $("#usernameInput").css(COMMON_TEXT_FIELD);
        this.props.setUsername(event.target.value);
        this.hoverTextField("#usernameInput");
    }

    passwordInputChange(event) {
        $("#passwordInput").css(COMMON_TEXT_FIELD);
        this.props.setPassword(event.target.value);
        this.hoverTextField("#passwordInput");
    }

    checkCredentials() {
        const {username, password} = this.props;
        return (
            USERNAME_REGEX.test(username) &&
            PASSWORD_REGEX.test(password)
        );
    }

    getCredentials() {
        const {username, password} = this.props;
        return {
            "username": username,
            "password": password
        }
    }

    signIn() {
        this.props.setUserMessage("");
        if (!(this.isCredentialsMissing())) {
            if (this.checkCredentials()) {
                const url = `${BASE_URL}/api-token-auth/`;
                axios.post(url, this.getCredentials())
                    .then(
                        result => {
                            if (result.status === 200) {
                                this.props.setToken(result.data.token);
                                this.props.isAuthorized(true);
                            }
                        },
                        () => this.props.setUserMessage("Unable to log in with provided credentials"));
            } else {
                this.props.setUserMessage("Provided credentials are incorrect");
            }
        } else {
            if (this.isUsernameInputEmpty()) {
                $("#usernameInput").css(HIGHLIGHT_ERROR);
                this.hoverError("#usernameInput");
            }
            if (this.isPasswordInputEmpty()) {
                $("#passwordInput").css(HIGHLIGHT_ERROR);
                this.hoverError("#passwordInput");
            }
        }
    }
}

const mapStateToProps = store => {
    const {username, password, userMessage} = store.user;
    const {deviceType} = store.device;
    return {username, password, userMessage, deviceType};
};
const mapDispatchToProps = dispatch => {
    return {
        setUsername: username => dispatch(setUsername(username)),
        setPassword: password => dispatch(setPassword(password)),
        isAuthorized: flag => dispatch(isAuthorized(flag)),
        setUserMessage: message => dispatch(setUserMessage(message)),
        setToken: token => dispatch(setToken(token)),
        setDeviceType: type => dispatch(setDeviceType(type))
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationForm)