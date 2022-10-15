import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumThumbnail from '../Components/AlbumThumbnail';
import '../styles/search.css'

class Search extends Component {
  constructor(props) {
    super(props);

    this.onChanging = this.onChanging.bind(this);
    this.searchAlbum = this.searchAlbum.bind(this);

    this.state = {
      artist: '',
      searchedArtist: '',
      loading: false,
      albums: [],
    };
  }

  onChanging({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async searchAlbum() {
    const { artist } = this.state;
    this.setState({ loading: true });
    await searchAlbumsAPI(artist)
      .then((requested) => {
        this.setState((state) => (
          {
            artist: '',
            searchedArtist: state.artist,
            albums: [...requested],
            loading: false,
          }
        ));
        this.newState()
      })
      
      .catch((error) => console.log(error));
  }

  newState(){
    const { albums } = this.state;
    this.setState({artist: albums[0].artistName })


  }

  render() {
    const { artist, loading, albums, searchedArtist } = this.state;
    
    const albumsList = albums.map((album, key) => (
    <li>
      <Link
        key={ key }
        data-testid={ `link-to-album-${album.collectionId}` }
        to={ `/album/${album.collectionId}` }
      >
        <AlbumThumbnail
          name={ artist }
          collectionName={ album.collectionName }
          price={ album.collectionPrice }
          img={ album.artworkUrl100 }
          releaseDate={ album.releaseDate }

        />
        
      </Link>
      </li>
    ));

    return (
      <div data-testid="page-search" className="search-page">
        <Header />
        { (
          <form className="form-search" onSubmit={ (event) => event.preventDefault() }>
            <input
              className="input-search"
              data-testid="search-artist-input"
              type="text"
              placeholder="Artist Name"
              onChange={ this.onChanging }
              name="artist"

            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ artist.length < 2 }
              onClick={ this.searchAlbum }
              className="search-button"
            >
              Search

            </button>
          </form>
        )}
        {
          albums.length > 0
            ? (
              <div>
              <div className="div-albuns-found">
                <span className="span-albuns-found">{ `The result of your search from: '${searchedArtist}'` }</span>
              </div>
              <ul className="album-list">{ albumsList }</ul>              
              </div>
            
            )
            : searchedArtist.length > 0 && !loading && (
              <div className="div-not-found">
             
              <span>Sorry, we didn't find anything from '${searchedArtist}'</span>
            </div>
             
            )
        }
      </div>
    );
  }
}

export default Search;
