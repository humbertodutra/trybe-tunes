import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  async componentDidMount() {
    getUser()
      .then(({ name }) => (
        this.setState({ name })
      ));
  }

  render() {
    const { name } = this.state;
    return (

      <header data-testid="header-component">
        { name !== ''
          ? (
            <>
              <div
                data-testid="header-user-name"
              >
                { name }
              </div>
              <div>
                <Link to="/search" data-testid="link-to-search">
                  Pesquisar
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">
                  Favoritos
                </Link>
                <Link to="/profile" data-testid="link-to-profile">
                  Perfil
                </Link>
              </div>
            </>
          )
          : <Loading /> }
      </header>
    );
  }
}

export default Header;
