// @flow
import { withHandlers, withState, compose } from "recompose"
import { connect } from "react-redux"
import Signin from "./Signin"

const TOKEN_KEY = "UserToken"

type Props = {
  email: string,
  password: string,
  setEmail: (event: {}) => void,
  setPassword: (event: {}) => void,
  history: {
    push: () => void,
  },
}

const handleEmailChange = ({ setEmail }: Props) => e => setEmail(e.target.value)
const handlePasswordChange = ({ setPassword }: Props) => e =>
  setPassword(e.target.value)

const handleSubmit = ({
  email,
  password,
  setEmail,
  setPassword,
  history,
  dispatch,
}) => () => {
  fetch("http://localhost:3030/auth/signin", {
    body: JSON.stringify({ email, password }),
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(({ token, id }) => {
      dispatch({ type: "ADD_ACCOUNT_ID", payload: id })
      localStorage.setItem(TOKEN_KEY, token)
    })
    .then(() => history.push("/"))
    // TODO implement visual error handling
    .catch(() => {
      setEmail("")
      setPassword("")
      localStorage.removeItem(TOKEN_KEY)
    })
}

const SigninContainer = compose(
  withState("isAuthenticated", "setAuthenticated", false),
  withState("email", "setEmail", ""),
  withState("password", "setPassword", ""),
  connect(),
  withHandlers({ handleEmailChange, handlePasswordChange, handleSubmit })
)(Signin)

export default SigninContainer
