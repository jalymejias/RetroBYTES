// import './App.css';
import { Navbar } from "./components/commons/header/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Head } from "./components/commons/header";
import { UserTokenContextProvider } from "./contexts/UserTokenContext";
import Home from "./pages/home/home";
import Ordenadores from "./pages/Ordenadores/ordenadores";
import Telefonia from "./pages/Telefonia/telefonia";
import Gaming from "./pages/Gaming/gaming";
import Audio from "./pages/Audio/audio";
import Video from "./pages/Video/video";
import Musica from "./pages/Musica/musica";
import Memorabilia from "./pages/Memorabilia/memorabilia";
import Profile from "./pages/ProfilePage/profile";
import Product from "./pages/ProductPage"
import NewProduct from "./components/newProduct";
import Register from "./pages/RegisterPage"
import Login from "./pages/LoginPage"


function App() {
  return (
    <div className="App">
      <UserTokenContextProvider>

      <Router>
        <Head />
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/product/:id" component={Product} />
          <Route path="/newProduct" component={NewProduct} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/ordenadores" component={Ordenadores} />
          <Route path="/telefonia" component={Telefonia} />
          <Route path="/gaming" component={Gaming} />
          <Route path="/video" component={Video} />
          <Route path="/audio" component={Audio} />
          <Route path="/musica" component={Musica} />
          <Route path="/memorabilia" component={Memorabilia} />
        </Switch>
      </Router>
      </UserTokenContextProvider>
    </div>
  );
}

export default App;
