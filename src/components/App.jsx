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
  const [Query, setQuery] = useState('');
  const [Images, setImages] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [NotFound, setNotFound] = useState(false);
  const [Error, setError] = useState(null);
  const [Page, setPage] = useState(1);
  const [ImageInModal, setImageInModal] = useState(null);
  const [Total, setTotal] = useState(null);
  useEffect(() => {
    if (Query === '') {
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

    searchImg(Query, Page);
  }, [Query, Page]);

  const onSubmit = query => {
    if (query === Query) {
      return;
    }
    setQuery(query);
    setImages([]);
    setPage(1);
  };
  const handleNextPage = () => {
    setPage(Page + 1);
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
      {IsLoading && <Loader />}
      {Error && <Notification msg={Error} />}
      {NotFound && !Error && (
        <Notification msg="Nothing found for your request" />
      )}
      <ImageGallery array={Images} openModal={openModal} />
      {Page < Total / 12 && !IsLoading && !Error && (
        <LoadMore handleNextPage={() => handleNextPage()} />
      )}
      {ImageInModal && <Modal closeModal={closeModal} url={ImageInModal} />}
    </>
  );
};
