import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Buttons/LoadMore';
import { Notification } from './Notification/Notification';
import { Loader } from './Loader';
import { Modal } from './Modal/Modal';
import fetchImages from 'services/rest-api';

export const App = () => {
  // state = {
  //   query: '',
  //   images: [],
  //   isLoading: false,
  //   notFound: false,
  //   error: null,
  //   page: 1,
  //   largeImageId: null,
  //   imageInModal: null,
  //   total: null,
  // };
  const [query, setQuery] = useState('');
  const [Images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [imageInModal, setImageInModal] = useState(null);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    if (query === '') {
      return;
    }
    const searchImg = async (query, page) => {
      setIsLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const data = await fetchImages(query, page);

        const apiImages = data.data.hits;
        if (apiImages.length) {
          setImages(prevImages => [
            ...prevImages,
            ...apiImages.map(({ id, largeImageURL, webformatURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })),
          ]);
          setNotFound(false);
          setTotal(data.data.totalHits);
        } else {
          setNotFound(true);
          setTotal(null);
          setImages([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    searchImg(query, page);
  }, [query, page]);

  const onSubmit = Query => {
    if (query === Query) {
      return;
    }
    setQuery(Query);
    setImages([]);
    setPage(1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const openModal = e => {
    const imageInModal = e.target.dataset.url;
    setImageInModal(imageInModal);
  };

  const closeModal = () => {
    setImageInModal(null);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <Notification msg={error} />}
      {notFound && !error && (
        <Notification msg="Nothing found for your request" />
      )}
      <ImageGallery array={Images} openModal={openModal} />
      {page < total / 12 && !isLoading && !error && (
        <LoadMore handleNextPage={() => handleNextPage()} />
      )}
      {imageInModal && <Modal closeModal={closeModal} url={imageInModal} />}
    </>
  );
};
