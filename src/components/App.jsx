import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';
import { fetchImages } from 'services/Api';

export default function App() {
  const [searchItem, setSearchItem] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);

  useEffect(() => {
    if (searchItem === '') {
      return;
    }

    setStatus('pending');
    fetchImages(searchItem, 1)
      .then(items => {
        setItems(items.hits);
        setStatus('resolved');
        setPage(1);
      })
      .catch(error => {
        setError(error);
        setStatus(error, 'rejected');
      });
  }, [searchItem]);

  useEffect(() => {
    if (page !== 1) {
      setStatus('pending');
      fetchImages(searchItem, page)
        .then(items => {
          setItems(prevState => [...prevState, ...items.hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setStatus('rejected');
        });
    }
  }, [page, searchItem]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = searchItem => {
    setSearchItem(searchItem);
    setItems([]);
    setPage(1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(showModal => !showModal);
    setImageModal(largeImageURL);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery items={items} onClick={toggleModal} />
      {status === 'pending' && <Loader />}
      {(items.length === 12 || items.length > 12) && (
        <ButtonLoadMore onClick={loadMore} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imageModal} alt="" />
        </Modal>
      )}

      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  );
}
