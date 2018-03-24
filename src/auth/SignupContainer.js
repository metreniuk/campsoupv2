// @flow
import { withHandlers, withState, compose } from "recompose"
import Signup from "./Signup"

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
}) => () => {
  console.log(email, password)
  fetch("http://localhost:3030/auth/signup", {
    body: JSON.stringify({ email, password }),
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
  })
    .then(res => res.json())
    // TODO find why it doesn't go to catch
    .then(({ token }) => {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token)
      } else {
        throw new Error("no token")
      }
    })
    .then(() => history.push("/"))
    // TODO implement visual error handling
    .catch(() => {
      setEmail("")
      setPassword("")
      localStorage.removeItem(TOKEN_KEY)
    })
}
const SignupContainer = compose(
  withState("email", "setEmail", ""),
  withState("password", "setPassword", ""),
  withHandlers({ handleEmailChange, handlePasswordChange, handleSubmit })
)(Signup)

export default SignupContainer
