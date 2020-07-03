import * as React from "react";
import {connect} from "react-redux";
import {
    isAuthorized,
    isModifying,
    isUserActive, setFirstName, setLastName,
    setPassword, setUserId,
    setUserMessage,
    setUsername
} from "../actions/userActions";
import axios from "axios";
import {
    BASE_URL,
    USERNAME_REGEX,
    PASSWORD_REGEX,
    SELECTED_BUTTON,
    COMMON_TEXT_FIELD,
    UNSELECTED_BUTTON,
    HIGHLIGHT_WARNING,
    HIGHLIGHT_ERROR,
    HOVER,
    HOVER_WARNING, HOVER_ERROR, HOVER_BUTTON, ERROR_MESSAGE, NOTIFICATION
} from "../const/properties";
import $ from "jquery";
import {deviceEnum} from "../const/deviceEnum";
import {setDeviceType} from "../actions/deviceActions";

class MainForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.setUserMessage("");
        this.props.setUsername("");
        this.props.setFirstName("");
        this.props.setLastName("");
        this.props.setPassword("");
        this.props.isModifying(true);
        this.props.isUserActive(true);
        this.identifyDeviceType();
    }

    render() {
        const {userMessage, deviceType, username, firstName, lastName, password, activeUser, modifying} = this.props;
        const deviceTypeClass = deviceType === deviceEnum.DESKTOP ? "desktop" : "mobile";
        return (
            <div id={"mainFormDiv"} className={deviceTypeClass}>
                <div id={"modifyOptionDiv"} className={`optionDiv ${deviceTypeClass}`}>
                    <button
                        id={"modifyOptionButton"}
                        className={`optionButton ${deviceTypeClass}`}
                        onClick={() => this.handleModifyOptionClick()}
                    >
                        MODIFY
                    </button>
                </div>
                <div id={"signUpOptionDiv"} className={`optionDiv ${deviceTypeClass}`}>
                    <button
                        id={"signUpOptionButton"}
                        className={`optionButton ${deviceTypeClass}`}
                        onClick={() => this.handleSignUpOptionClick()}
                    >
                        SIGN UP
                    </button>
                </div>
                <div id={"separator"} className={deviceTypeClass}/>
                <div id={"userMessageDiv"} className={deviceTypeClass}>
                    {userMessage === "" ?
                        <div><br/>{deviceType === deviceEnum.PHONE && <br/>}</div> :
                        userMessage}
                </div>
                <div id={"mainInputDiv"} className={deviceTypeClass}>
                    <form name={"mainForm"} className={deviceTypeClass}>
                        <input
                            type={"text"}
                            name={"usernameInput"}
                            id={"usernameInput"}
                            form={"mainForm"}
                            placeholder={"Username"}
                            maxLength={150}
                            className={deviceTypeClass}
                            value={username || ""}
                            onChange={event => this.handleUsernameInputChange(event)}
                            autoComplete={"new-password"}
                        />
                        <input
                            type={"text"}
                            name={"firstNameInput"}
                            id={"firstNameInput"}
                            form={"mainForm"}
                            placeholder={"First Name"}
                            maxLength={30}
                            className={deviceTypeClass}
                            value={firstName || ""}
                            onChange={event => this.handleFirstNameInputChange(event)}
                            autoComplete={"new-password"}
                        />
                        <input
                            type={"text"}
                            name={"lastNameInput"}
                            id={"lastNameInput"}
                            form={"mainForm"}
                            placeholder={"Last Name"}
                            maxLength={150}
                            className={deviceTypeClass}
                            value={lastName || ""}
                            onChange={event => this.handleLastNameInputChange(event)}
                            autoComplete={"new-password"}
                        />
                        <input
                            type={"password"}
                            name={"passwordInput"}
                            id={"passwordInput"}
                            form={"mainForm"}
                            placeholder={"Password"}
                            maxLength={128}
                            className={deviceTypeClass}
                            value={password || ""}
                            onChange={event => this.handlePasswordInputChange(event)}
                            autoComplete={"new-password"}
                        />
                        <div id={"activeUserCheckboxDiv"} className={"checkboxDiv"}>
                            <input type={"checkbox"}
                                   id={"activeUserCheckbox"}
                                   name={"activeUserCheckbox"}
                                   form={"mainForm"}
                                   className={deviceTypeClass}
                                   checked={activeUser}
                                   onChange={event => this.handleActiveUserChange(event)}
                            />
                            <label htmlFor={"activeUserCheckbox"} className={deviceTypeClass}>Is User Active?</label>
                        </div>
                        {modifying &&
                        <button
                            id={"modifyButton"}
                            type={"button"}
                            form={"mainForm"}
                            className={`requestButton ${deviceTypeClass}`}
                            onClick={() => this.modify()}
                        >
                            Modify
                        </button>}
                        {!modifying &&
                        <button
                            id={"signUpButton"}
                            type={"button"}
                            form={"mainForm"}
                            className={`requestButton ${deviceTypeClass}`}
                            onClick={() => this.signUp()}
                        >
                            Sign Up
                        </button>}
                    </form>
                </div>
            </div>
        );
    }

    hoverUnselectedButton(element) {
        const jquery = $(element);
        jquery.hover(() => {
            jquery.css(HOVER_BUTTON);
        }, () => {
            jquery.css(UNSELECTED_BUTTON);
        });
    }

    hoverTextField(element) {
        const jquery = $(element);
        jquery.hover(() => {
            jquery.css(HOVER);
        }, () => {
            jquery.css(COMMON_TEXT_FIELD);
        });
    }

    hoverWarning(element) {
        const jquery = $(element);
        jquery.hover(() => {
            jquery.css(HOVER_WARNING);
        }, () => {
            jquery.css(HIGHLIGHT_WARNING);
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

    noHover(element) {
        const jquery = $(element);
        jquery.hover(() => {
            jquery.css(SELECTED_BUTTON);
        });
    }

    componentDidMount() {
        $(window).resize(() => {
            this.identifyDeviceType();
        });
        this.hoverUnselectedButton("#signUpOptionButton");
    }

    identifyDeviceType() {
        const width = window.innerWidth;
        if (width >= 1200) {
            this.props.setDeviceType(deviceEnum.DESKTOP);
        } else {
            this.props.setDeviceType(deviceEnum.PHONE);
        }
    }

    componentDidUpdate() {
        const jquery = $("input[type=checkbox]");
        const width = jquery.width();
        jquery.css({"height": `${width}`});
        const height = $("#signUpOptionButton").height();
        $("#modifyOptionButton").css({"height": `${height}`});
    }

    setErrorMessage(message) {
        const jquery = $("#userMessageDiv");
        const height = jquery.height();
        jquery.css(ERROR_MESSAGE);
        this.props.setUserMessage(message);
        if (height > jquery.height()) jquery.append('<br/><br/>');
    }

    setNotification(message) {
        const jquery = $("#userMessageDiv");
        const height = jquery.height();
        jquery.css(NOTIFICATION);
        this.props.setUserMessage(message);
        if (height > jquery.height()) jquery.append('<br/><br/>');
    }

    handleModifyOptionClick() {
        this.props.isModifying(true);
        $("#modifyOptionButton").css(SELECTED_BUTTON);
        $("#signUpOptionButton").css(UNSELECTED_BUTTON);
        this.hoverUnselectedButton("#signUpOptionButton");
        this.noHover("#modifyOptionButton");
        $("#firstNameInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#firstNameInput");
        $("#lastNameInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#lastNameInput");
        $("#usernameInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#usernameInput");
        $("#passwordInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#passwordInput");
    }

    handleSignUpOptionClick() {
        this.props.isModifying(false);
        $("#signUpOptionButton").css(SELECTED_BUTTON);
        $("#modifyOptionButton").css(UNSELECTED_BUTTON);
        this.hoverUnselectedButton("#modifyOptionButton");
        this.noHover("#signUpOptionButton");
        if (this.isFirstNameInputEmpty()) {
            $("#firstNameInput").css(HIGHLIGHT_WARNING);
            this.hoverWarning("#firstNameInput");
        }
        if (this.isLastNameInputEmpty()) {
            $("#lastNameInput").css(HIGHLIGHT_WARNING);
            this.hoverWarning("#lastNameInput");
        }
        $("#usernameInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#usernameInput");
        $("#passwordInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#passwordInput");
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

    isFirstNameInputEmpty() {
        const {firstName} = this.props;
        return (
            firstName === "" ||
            firstName == null
        );
    }

    isLastNameInputEmpty() {
        const {lastName} = this.props;
        return (
            lastName === "" ||
            lastName == null
        );
    }

    isDataMissing() {
        if (this.props.modifying) {
            return this.isUsernameInputEmpty();
        } else {
            return (
                this.isUsernameInputEmpty() ||
                this.isPasswordInputEmpty()
            );
        }
    }

    highlightError() {
        if (this.isUsernameInputEmpty()) {
            $("#usernameInput").css(HIGHLIGHT_ERROR);
            this.hoverError("#usernameInput");
        }
        if (this.isPasswordInputEmpty() && !this.props.modifying) {
            $("#passwordInput").css(HIGHLIGHT_ERROR);
            this.hoverError("#passwordInput");
        }
    }

    ignoreOldWarning() {
        $("#firstNameInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#firstNameInput");
        $("#lastNameInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#lastNameInput");
    }

    handleUsernameInputChange(event) {
        $("#usernameInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#usernameInput");
        this.props.setUsername(event.target.value);
    }

    handleFirstNameInputChange(event) {
        const jquery = $("#firstNameInput");
        jquery.css(COMMON_TEXT_FIELD);
        this.hoverTextField("#firstNameInput");
        this.props.setFirstName(event.target.value);
        if (!this.props.modifying) {
            if (event.target.value === "") {
                jquery.css(HIGHLIGHT_WARNING);
                this.hoverWarning("#firstNameInput");
            }
        }
    }

    handleLastNameInputChange(event) {
        const jquery = $("#lastNameInput");
        jquery.css(COMMON_TEXT_FIELD);
        this.hoverTextField("#lastNameInput");
        this.props.setLastName(event.target.value);
        if (!this.props.modifying) {
            if (event.target.value === "") {
                jquery.css(HIGHLIGHT_WARNING);
                this.hoverWarning("#lastNameInput");
            }
        }
    }

    handlePasswordInputChange(event) {
        $("#passwordInput").css(COMMON_TEXT_FIELD);
        this.hoverTextField("#passwordInput");
        this.props.setPassword(event.target.value);
    }

    handleActiveUserChange(event) {
        this.props.isUserActive(event.target.checked);
    }

    checkData() {
        const {username, password, modifying} = this.props;
        if (this.isPasswordInputEmpty() && modifying) {
            return USERNAME_REGEX.test(username);
        }
        return (
            USERNAME_REGEX.test(username) &&
            PASSWORD_REGEX.test(password)
        );
    }

    getData() {
        let data;
        const {username, firstName, lastName, password, activeUser, modifying} = this.props;
        if (modifying) {
            data = {
                "username": username,
                "is_active": activeUser
            };
            if (!this.isFirstNameInputEmpty()) data = {...data, "first_name": firstName};
            if (!this.isLastNameInputEmpty()) data = {...data, "last_name": lastName};
            if (!this.isPasswordInputEmpty()) data = {...data, "password": password};
        } else {
            data = {
                "username": username,
                "first_name": firstName,
                "last_name": lastName,
                "password": password,
                "is_active": activeUser
            };
        }
        return data;
    }

    async getUserId() {
        const url = `${BASE_URL}/api/v1/users/`;
        const {username, token} = this.props;
        await axios.get(url, {headers: {Authorization: `Token ${token}`}})
            .then(
                result => {
                    if (result.status === 200) {
                        let exists = false;
                        result.data.forEach(user => {
                            if (user.username === username) {
                                this.props.setUserId(user.id);
                                exists = true;
                            }
                        });
                        if (!exists) {
                            this.setErrorMessage("User with provided username does not exist");
                            this.props.setUserId(null);
                        }
                    } else {
                        this.setErrorMessage("Unable to get the list of users");
                        this.props.setUserId(null);
                    }
                }, error => {
                    if (error.response.status === 401) {
                        this.props.isAuthorized(false);
                    } else {
                        throw new Error("Unable to get the list of users");
                    }
                })
            .catch(error => {
                this.setErrorMessage(error.message);
                this.props.setUserId(null);
            });
    }

    async modify() {
        this.props.setUserMessage("");
        if (!(this.isDataMissing())) {
            if (this.checkData()) {
                await this.getUserId();
                const {id, token} = this.props;
                if (id != null) {
                    const url = `${BASE_URL}/api/v1/users/${id}/`;
                    axios.patch(url, this.getData(), {headers: {Authorization: `Token ${token}`}})
                        .then(
                            result => {
                                if (result.status === 200) this.setNotification("User information has been updated");
                            },
                            error => {
                                const status = error.response.status;
                                switch (status) {
                                    case 401:
                                        this.props.isAuthorized(false);
                                        break;
                                    case 403:
                                        throw new Error("Modifying this user requires permission");
                                    default:
                                        throw new Error("User information update failed");
                                }
                            })
                        .catch(error => this.setErrorMessage(error.message));
                }
            } else {
                this.setErrorMessage("User`s provided credentials are incorrect");
            }
        } else {
            this.highlightError();
        }
    }

    signUp() {
        this.props.setUserMessage("");
        if (!(this.isDataMissing())) {
            if (this.checkData()) {
                const url = `${BASE_URL}/api/v1/users/`;
                axios.post(url, this.getData(), {headers: {Authorization: `Token ${this.props.token}`}})
                    .then(
                        result => {
                            if (result.status === 201) this.setNotification("User has been created");
                            this.ignoreOldWarning();
                        },
                        error => {
                            const status = error.response.status;
                            switch (status) {
                                case 401:
                                    this.props.isAuthorized(false);
                                    break;
                                case 400:
                                    throw new Error("User already exists");
                                default:
                                    throw new Error("Unable to create new user");
                            }
                        })
                    .catch(error => this.setErrorMessage(error.message));
            } else {
                this.setErrorMessage("User`s provided credentials are incorrect");
            }
        } else {
            this.highlightError();
        }
    }
}

const mapStateToProps = store => {
    const {username, password, modifying, userMessage, token, firstName, lastName, activeUser, id} = store.user;
    const {deviceType} = store.device;
    return {username, password, modifying, userMessage, token, firstName, lastName, activeUser, id, deviceType};
};
const mapDispatchToProps = dispatch => {
    return {
        setUsername: username => dispatch(setUsername(username)),
        setPassword: password => dispatch(setPassword(password)),
        isAuthorized: flag => dispatch(isAuthorized(flag)),
        setUserMessage: message => dispatch(setUserMessage(message)),
        isModifying: flag => dispatch(isModifying(flag)),
        setFirstName: firstName => dispatch(setFirstName(firstName)),
        setLastName: lastName => dispatch(setLastName(lastName)),
        isUserActive: flag => dispatch(isUserActive(flag)),
        setUserId: id => dispatch(setUserId(id)),
        setDeviceType: type => dispatch(setDeviceType(type))
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainForm)