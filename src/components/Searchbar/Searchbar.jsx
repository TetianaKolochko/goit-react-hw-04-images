import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchBtn,
  SearchFormSpan,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchItem, setSearchItem] = useState('');

  const handleNameChange = event => {
    setSearchItem(event.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    if (searchItem.trim() === '') {
      toast.error('Упс, введи назву зображення!');
      return;
    }
    onSubmit(searchItem);
    setSearchItem('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchBtn type="submit">
          <FcSearch />
          <SearchFormSpan></SearchFormSpan>
        </SearchBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}
