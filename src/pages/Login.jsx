import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = { isAuthenticated: false };
  }

  redirect() {
    const { history } = this.props;
    history.push('/search');
    console.log('foi');
  }

  render() {
    const { name, handleInputChange } = this.props;
    const minName = 3;
    const { isAuthenticated } = this.state;
    const { redirect } = this;
    return !isAuthenticated
      ? (
        <div data-testid="page-login">
          <form onSubmit={ (event) => event.preventDefault() }>
            <label htmlFor="name">
              Digite seu nome:
              <input
                data-testid="login-name-input"
                name="name"
                value={ name }
                onChange={ handleInputChange }
              />
            </label>
            <input
              data-testid="login-submit-button"
              type="submit"
              value="Entrar"
              disabled={ name.length < minName }
              onClick={ async () => {
                this.setState((state) => ({ isAuthenticated: !state.isAuthenticated }));
                const isLogged = await createUser({ name });
                this.setState((state) => ({ isAuthenticated: !state.isAuthenticated }));
                return isLogged === 'OK' && redirect();
              } }
            />
          </form>
        </div>
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
