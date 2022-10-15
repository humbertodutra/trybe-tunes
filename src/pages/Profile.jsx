import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getUser()
      .then((r) => {
        this.setState({ user: { ...r }, loading: false });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <>
            <img
              data-testid="profile-image"
              src={ user.image }
              alt={ `Imagem de perfil de ${user.name}` }
            />
            <div>
              <p>
                { user.name}
                {' '}
              </p>
            </div>
            <div>
              <p>
                { user.email}
                {' '}
              </p>
            </div>
            <div>
              <p>
                { user.description}
                {' '}
              </p>
            </div>
            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </>
        )}

      </div>
    );
  }
}

export default Profile;
