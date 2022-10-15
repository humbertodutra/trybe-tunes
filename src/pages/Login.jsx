import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';
import '../styles/login.css'
import LogoTunes from '../images/logo-trybetunes.png'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = { isAuthenticated: false };
  }

  redirect() {
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, handleInputChange } = this.props;
    const minName = 3;
    const { isAuthenticated } = this.state;
    const { redirect } = this;
    return !isAuthenticated
      ? (
    <div data-testid="page-login" className="login-page">    
      <section className="login-rectangle">  
        <img
          className="logo-trybe-tunes"
          src={ LogoTunes }
          alt="logo-trybetunes"
        />
        <div className="form-rectangle" data-testid="page-login">
          <form className='login-form'onSubmit={ (event) => event.preventDefault() }>
              <input
                data-testid="login-name-input"
                name="name"
                className="login-input"
                value={ name }
                placeholder="name"
                onChange={ handleInputChange }
              />
            <button
              data-testid="login-submit-button"
              className="btn"
              type="submit"
              value="Entrar"
              disabled={ name.length < minName }
              onClick={ async () => {
                this.setState((state) => ({ isAuthenticated: !state.isAuthenticated }));
                const isLogged = await createUser({ name });
                this.setState((state) => ({ isAuthenticated: !state.isAuthenticated }));
                return isLogged === 'OK' && redirect();
              
              } }
            > Join </button>
          </form>
        </div>
    </section>  
    /</div>
      )
      : (
        <Loading />);
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired })
    .isRequired,
};

export default Login;
