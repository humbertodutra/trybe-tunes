import React, { Component } from "react";
import Header from "../Components/Header";
import "../styles/editProfile.css";
import Loading from "../Components/Loading";
import { Redirect } from "react-router-dom";
import { getUser, updateUser } from "../services/userAPI";
import LogoImg from "../images/logo-trybetunes.png";

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: "",
      image: "",
      description: "",
      name: "",
      isButtonDisabled: false,
      profileEditDone: false,
    };
  }

  componentDidMount() {
    this.recoverUserData();
  }

  recoverUserData = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({
      email: userData.email,
      image: userData.image,
      description: userData.description,
      name: userData.name,
      loading: false,
    });
    this.checkData();
  };

  checkData = () => {
    const { email, image, description } = this.state;
    if (email === "") this.setState({ email: "" });
    if (image === "") this.setState({ image: LogoImg });
    if (description === "") {
      this.setState({
        description: " ",
      });
    }
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (this.validateButton()) {
      this.setState({ isButtonDisabled: false });
    } else this.setState({ isButtonDisabled: true });
  };

  validateButton = () => {
    const keys = Object.keys(this.state);
    const { state } = this;
    if (!keys.find((key) => state[key] === "")) return true;
    return false;
  };

  onSubmitButtonClick = async (event) => {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    const upDatedUser = { name, email, image, description };
    this.setState({ loading: true });
    await updateUser(upDatedUser);
    this.setState({ profileEditDone: true });
  };
  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
      isButtonDisabled,
      profileEditDone,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {profileEditDone && <Redirect to="/profile" />}
        <Header />
        <div className="form-box">
          <h5 className="form-step"> </h5>
          <form>
            <div className="field1">
              <section>
                <img
                  src={image}
                  alt="imagem do usuario"
                  className="profile-image"
                />
                <input
                  data-testid="edit-input-image"
                  name="image"
                  className="image-input"
                  id="imageInput"
                  type="text"
                  placeholder="put the image url here"
                  onChange={this.onInputChange}
                />
              </section>
              <input name="name" value={ name } onChange={this.onInputChange} placeholder="Name" />
              <input placeholder="Phone 000-000-0000" />
              <input
                id="email-input"
                value={email}
                name="email"
                onChange={this.onInputChange}
                placeholder="E-mail"
              />
              <textarea
                id="description-input"
                
                type="text"
                onChange={this.onInputChange}
                placeholder="description"
              />
            </div>

            <button
              disabled={isButtonDisabled}
              className="nextBtn"
              type="submit"
              id="submitBtn"
            >
              {" "}
              submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
