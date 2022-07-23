import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDiv } from './Button.styled';

export const ButtonLoadMore = ({ onClick }) => {
  return (
    <ButtonDiv>
      <Button type="submit" onClick={onClick}>
        Load more
      </Button>
    </ButtonDiv>
  );
};

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
