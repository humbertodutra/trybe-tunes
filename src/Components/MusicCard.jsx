import React, { Component } from "react";
import PropTypes from "prop-types";
import { addSong, removeSong } from "../services/favoriteSongsAPI";
import "../styles/musics.css";

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.favSong = this.favSong.bind(this);
  }

  async favSong({ target }) {
    const { checked } = target;
    const { toLoad, update } = this.props;
    const { ...track } = this.props;
    const objToPass = { ...track };
    toLoad();
    if (checked) {
      await addSong(objToPass).then(update());
    } else {
      await removeSong(objToPass).then(update());
    }
  }

  render() {
    const { number, musicName, previewUrl, trackId, loading, checked } =
      this.props;

    return (
      !loading && (
        <section className="track-section">
         
            
              <audio data-testid="audio-component" src={previewUrl} controls>
                <track kind="captions" />
              </audio>
              <span style={{ color: "red" }}>{"      " + number + "- "}</span>
              <span className="track-name">{musicName}</span>
              <label htmlFor={trackId}>
                Favorite &hearts;
                <input
                  data-testid={`checkbox-music-${trackId}`}
                  type="checkbox"
                  name="fav"
                  onChange={this.favSong}
                  checked={checked}
                  id={trackId}
                  className="favorite-checkbox"
                />
              </label>
           
        </section>
      )
    );
  }
}

MusicCard.propTypes = {
  number: PropTypes.string.isRequired,
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  toLoad: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
};
export default MusicCard;
