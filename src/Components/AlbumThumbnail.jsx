import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AlbumThumbnail extends Component {
  render() {
    const {
      artist,
      collectionName,
      price,
      img,
      releaseDate,
    } = this.props;

    return (
      <>
        <img src={ img } alt={ `Cover From ${collectionName}` } />
        <h7 data-testid="artist-name">{artist}</h7>
        <p data-testid="album-name">{collectionName}</p>
        <p>{`Price: $${price}`}</p>
        <p>{`Released Date: ${new Date(releaseDate).toLocaleDateString('en')}`}</p>

      </>
    );
  }
}

AlbumThumbnail.propTypes = {
  artist: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default AlbumThumbnail;
