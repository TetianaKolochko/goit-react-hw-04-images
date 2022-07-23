import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  largeImage,
}) => {
  return (
    <GalleryItem key={id} onClick={() => largeImage(largeImageURL)}>
      <GalleryImage src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.func.isRequired,
};
