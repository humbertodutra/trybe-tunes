import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favSong: [],
      loading: false,
    };
    this.toLoad = this.toLoad.bind(this);
    this.updateFavTracks = this.updateFavTracks.bind(this);
  }

  componentDidMount() {
    getFavoriteSongs()
      .then((response) => this.setState({ favSong: [...response] }))
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this.setState({ favSong: [] });
  }

  toLoad() {
    this.setState((state) => ({ loading: !state.loading }));
  }

  updateFavTracks() {
    getFavoriteSongs()
      .then((response) => this.setState({ favSong: [...response] }))
      .then(() => this.toLoad())
      .catch((error) => console.log('Error, ', error));
  }

  render() {
    const { favSong } = this.state;
    const { loading } = this.state;
    const favList = favSong.map((track) => (
      <MusicCard
        key={ track.trackId }
        number={ track.number }
        musicName={ track.trackName }
        previewUrl={ track.previewUrl }
        trackId={ track.trackId }
        trackObj={ track }
        toLoad={ this.toLoad }
        loading={ loading }
        checked={ favSong.some((song) => song.trackId === track.trackId) }
        update={ this.updateFavTracks }

      />
    ));
    return (

      <div data-testid="page-favorites">
        <Header />
        { loading
          ? (
            <Loading />
          )
          : (
            favList
          ) }
      </div>
    );
  }
}

export default Favorites;