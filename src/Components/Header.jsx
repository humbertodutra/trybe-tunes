import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';
import LogoImg from '../images/logo-trybetunes.png';

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

      <header className="header" data-testid="header-component">
        { name !== ''
          ? (
            <>
            <section className="top-header">
              <img src={LogoImg} alt="trybetunes" className='logo-header'/>
              <div
                className='user-button'
                data-testid="header-user-name"
              >
                <p>{ name }</p>
              </div>
            </section>  
              <div>
                <nav className="navigation">
                <Link to="/search" data-testid="link-to-search" className="link-nav">
                  Search
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites" className="link-nav favorites-nav">
                  Favorites
                </Link>
                <Link to="/profile" data-testid="link-to-profile" className="link-nav">
                  Profile
                </Link>
                </nav>
              </div>
            </>
          )
          : <Loading /> }
      </header>
    );
  }
}

export default Header;
