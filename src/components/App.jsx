import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Buttons/LoadMore';
import { Notification } from './Notification/Notification';
import { Loader } from './Loader';
import { Modal } from './Modal/Modal';
import fetchImages from 'services/rest-api';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    notFound: false,
    error: null,
    page: 1,
    largeImageId: null,
    imageInModal: null,
    total: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.searchImg(this.state.query, this.state.page);
    }
  }
  searchImg = async (query, page) => {
    this.setState({ isLoading: true, error: null, notFound: false });
    try {
      const data = await fetchImages(query, page);
      console.log(data.data.totalHits);

      const apiImages = data.data.hits;
      if (apiImages.length) {
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            ...apiImages.map(({ id, largeImageURL, webformatURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })),
          ],
          notFound: false,
          total: data.data.totalHits,
        }));
      } else {
        this.setState({ notFound: true, total: null, images: [] });
      }
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  onSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };
  handleNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  openModal = e => {
    const imageInModal = e.target.dataset.url;
    this.setState({ imageInModal: imageInModal });
  };

  closeModal = () => {
    this.setState({ imageInModal: null });
  };

  render() {
    const { total, images, page, error, notFound, isLoading, imageInModal } =
      this.state;
    return (
      <>
        <ToastContainer position="top-right" autoClose={2000} />
        <SearchBar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {error && <Notification msg={error} />}
        {notFound && !error && (
          <Notification msg="Nothing found for your request" />
        )}
        <ImageGallery array={images} openModal={this.openModal} />
        {page < total / 12 && (
          <LoadMore handleNextPage={() => this.handleNextPage()} />
        )}
        {imageInModal && (
          <Modal url={imageInModal} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
