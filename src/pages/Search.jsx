import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumThumbnail from '../Components/AlbumThumbnail';

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
    searchAlbumsAPI(artist)
      .then((requested) => {
        this.setState((state) => (
          {
            artist: '',
            searchedArtist: state.artist,
            albums: [...requested],
            loading: false,
          }
        ));
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { artist, loading, albums, searchedArtist } = this.state;
    const albumsList = albums.map((album, key) => (
      <Link
        key={ key }
        data-testid={ `link-to-album-${album.collectionId}` }
        to={ `/album/${album.collectionId}` }
      >
        <AlbumThumbnail
          name={ album.artistName }
          collectionName={ album.collectionName }
          price={ album.collectionPrice }
          img={ album.artworkUrl100 }
          releaseDate={ album.releaseDate }

        />
      </Link>
    ));

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form onSubmit={ (event) => event.preventDefault() }>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Nome do Artista"
              onChange={ this.onChanging }
              name="artist"

            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ artist.length < 2 }
              onClick={ this.searchAlbum }
            >
              Pesquisar

            </button>
          </form>
        )}
        {
          albums.length > 0
            ? (
              <>
                <p>{ `Resultado de álbuns de: ${searchedArtist}` }</p>
                { albumsList }
              </>
            )
            : searchedArtist.length > 0 && !loading && (
              <p>Nenhum álbum foi encontrado</p>
            )
        }
      </div>
    );
  }
}

export default Search;
