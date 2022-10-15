import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/albumThumbnail.css'


class AlbumThumbnail extends Component {
  render() {
    const {
      name,
      collectionName,
      img,
    
    } = this.props;

    return (
      
    <section className="album-card">
      <div className='album-image'>
          <img src={ img } alt={ `Cover From ${collectionName}` } />
            </div>
      <div className="artist-info">
        <span data-testid="album-name">{collectionName}</span>
        <p data-testid="artist-name">{ name }</p>
   
        </div>
    </section>
      
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
