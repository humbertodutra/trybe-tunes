import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      name: '',
    };
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    console.log(name, value);
  }

  render() {
    const { handleInputChange } = this;
    const { name } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              name={ name }
              handleInputChange={ handleInputChange }
              history={ props.history }
            />) }
          />
          <Route path="/search" component={ Search } />

          <Route
            path="/album/:id"
            render={ (props) => (<Album
              params={ props.match.params }
            />
            ) }
            /// https://www.tabnine.com/code/javascript/functions/react-router/match/params
          />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
