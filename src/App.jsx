import Inicio from './Components/Inicio'
import Login from './Components/Login'
import Registrar from './Components/Registrar'
import Cerveza from './Components/Cerveza'
import Menu from './Components/Menu'
import AgregarCerveza from './Components/AgregarCerveza'
import QuitarCerveza from './Components/QuitarCerveza'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Menu></Menu>
      <Switch>
        <Route exact path="/" component={Inicio}></Route>
        <Route path="/Registrar" component={Registrar}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Cerveza" component={Cerveza}></Route>
        <Route path="/AgregarCerveza" component={AgregarCerveza}></Route>
        <Route path="/QuitarCerveza" component={QuitarCerveza}></Route>
      </Switch>
    </Router>
  );
}

export default App;
