import Loader from "components/Loader"
import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Register from "pages/Register"
import "./styles/utility.min.css"

const SignIn = lazy(() => import("pages/LogIn"))
const Dashboard = lazy(() => import("pages/Dashboard"))
const Assets = lazy(() => import("pages/Assets"))

const App: React.FC = () => {
  const checkToken = () => {
    const isAuth = localStorage.getItem("token")
    return isAuth ? "/dashboard" : "/signin"
  }
  return (
    <Suspense fallback={<Loader size="large" style={{ width: "100vw", height: "100vh" }} />}>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/assets">
            <Assets />
          </Route>
          <Route path="/">
            <Redirect to={checkToken()} />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
