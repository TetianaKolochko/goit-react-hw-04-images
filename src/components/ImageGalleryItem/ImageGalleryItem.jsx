import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ items, largeImage }) => {
  return items.map(item => {
    const { id, webformatURL, largeImageURL, tags } = item;

    return (
      <GalleryItem key={id} onClick={() => largeImage(largeImageURL)}>
        <GalleryImage src={webformatURL} alt={tags} />
      </GalleryItem>
    );
  });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  largeImage: PropTypes.func.isRequired,
};
