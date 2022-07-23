import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchBtn,
  SearchFormSpan,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchItem: '',
  };

  handleNameChange = event => {
    this.setState({ searchItem: event.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.searchItem.trim() === '') {
      toast.error('Упс, введи назву зображення!');
      return;
    }
    this.setState({ searchItem: '' });
    this.props.onSubmit(this.state.searchItem);
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleFormSubmit}>
          <SearchBtn type="submit">
            <FcSearch />
            <SearchFormSpan></SearchFormSpan>
          </SearchBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
