import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { getUser } from "../services/userAPI";
import "../styles/profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false,
    };
  }

  uppercase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

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
        {loading ? (
          <Loading />
        ) : (
          <div className="App">
            <div className="clearfix">
              <div className="row"></div>
              <div className="col-md-4 animated fadeIn">
                <div className="card">
                  <div className="card-body">
                    <div className="avatar">
                      <img src={user.image} className="card-img-top" alt="" />
                    </div>
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">
                      <Link to="/profile/edit">{"Edit Your profile"}</Link>
                    </p>
                    <p className="card-text">
                      {"thanks for visiting my project =D"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
