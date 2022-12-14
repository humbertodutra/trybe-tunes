import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import MusicCard from "../Components/MusicCard";
import getMusic from "../services/musicsAPI";
import { getFavoriteSongs } from "../services/favoriteSongsAPI";
import "../styles/musics.css";
import AlbumThumbnail from "../Components/AlbumThumbnail";

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      musics: [],
      favsongs: [],
      image: [],
    };

    this.toLoad = this.toLoad.bind(this);
    this.updateFavTracks = this.updateFavTracks.bind(this);
  }
  async componentWillMount() {
    const { params } = this.props;
    const { id } = params;
    await getMusic(id)
      .then((response) => this.setState({ musics: [...response] }))
      .then(() => this.setState({ loading: false }))
      .catch((error) => console.log(error));
    getFavoriteSongs().then((fav) => this.setState({ favsongs: [...fav] }));
  }

  componentDidMount() {
    getFavoriteSongs().then((fav) => this.setState({ favsongs: [...fav] }));
  }

  componentWillUnmount() {
    this.setState({
      favsongs: [],
      musics: [],
    });
  }

  toLoad() {
    this.setState((state) => ({ loading: !state.loading }));
  }

  updateFavTracks() {
    getFavoriteSongs()
      .then((response) => this.setState({ favsongs: [...response] }))
      .then(() => this.toLoad())
      .catch((error) => console.log("Error, ", error));
  }

  render() {
    const { musics, loading, favsongs } = this.state;
    const artistName = musics.map((track) => track.artistName);

    const albumName = musics.map((track) => track.collectionName);
    const imgUrl = musics.map((track) => track.artworkUrl100);
    const musicList = musics
      .slice(1)
      .map((track) => (
        <MusicCard
          key={track.trackId}
          number={track.trackNumber}
          musicName={track.trackName}
          previewUrl={track.previewUrl}
          trackId={track.trackId}
          trackObj={track}
          toLoad={this.toLoad}
          loading={loading}
          checked={favsongs.some((song) => song.trackId === track.trackId)}
          update={this.updateFavTracks}
          img={track.artworkUrl100}
        />
      ));
    return (
      <div data-testid="page-album">
        {<Header />}
        {loading && <Loading />}

        {musics.length > 0 && !loading && (
          <div className="music-page ">
            <div className="track-list">{musicList}</div>

            <div className="stuck">
              <AlbumThumbnail
                name={artistName[0]}
                img={imgUrl[0]}
                collectionName={albumName[0]}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};
