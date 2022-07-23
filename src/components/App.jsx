import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class App extends Component {
  state = {
    searchItem: '',
    items: [],
    status: 'idle',
    error: null,
    page: 1,
    showModal: false,
    imageModal: null,
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ imageModal: largeImageURL });
  };

  handleFormSubmit = searchItem => {
    this.setState({
      searchItem,
      items: [],
      page: 1,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchItem;
    const newName = this.state.searchItem;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevName !== newName || prevPage !== newPage) {
      this.setState({ status: 'pending' });
      if (prevName !== newName) {
        this.setState({ page: 1 });
      }

      try {
        const response = await axios.get(
          `/?q=${newName}&page=${newPage}&key=24558564-a16a5722e1280d44cb84f27e6&image_type=photo&orientation=horizontal&per_page=12`
        );

        const galleryList = response.data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        this.setState(prevState => ({
          items: [...prevState.items, ...galleryList],
          status: 'resolved',
        }));
        if (response.data.hits.length === 0) {
          toast.error('Щось пішло не так :( спробуй ще раз!', {
            position: 'top-center',
          });
        }
      } catch (error) {
        toast.error('Упс, щось пішло не так :(', { position: 'top-center' });
        this.setState({ status: 'rejected' });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { items, status, showModal, imageModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictures={items} onClick={this.toggleModal} />
        {status === 'pending' && <Loader />}
        {(items.length === 12 || items.length > 12) && (
          <ButtonLoadMore onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imageModal} alt="" />
          </Modal>
        )}

        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}
