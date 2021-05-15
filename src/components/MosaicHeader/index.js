import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const MosaicHeader = props => {
  const { name, images } = props;

  const [imageIndex, setImageIndex] = useState(0);
  const [lightBoxIsOpen, setLightBoxIsOpen] = useState(false);
  const [imageIsLoaded, setImageIsLoaded] = useState(
    images.map(image => false),
  );

  const toggleLightbox = imageIndex => {
    setLightBoxIsOpen(!lightBoxIsOpen);
    setImageIndex(imageIndex);
  };

  const handleImageLoaded = index => {
    const newImageIsLoaded = [...imageIsLoaded];
    newImageIsLoaded[index] = true;

    setImageIsLoaded(newImageIsLoaded);
  };

  const onCloseRequest = () => setLightBoxIsOpen(false);

  const onMovePrevRequest = () =>
    setImageIndex((imageIndex + images.length - 1) % images.length);
  const onMoveNextRequest = () =>
    setImageIndex((imageIndex + 1) % images.length);

  return name === undefined || images === undefined ? null : (
    <>
      <header className="mosaic-header">
        <div className="mosaic-header__logo">
          <Link to="/" className="mosaic-header__logo-link">
            <img
              src="/images/hero-logo_block.svg"
              alt="WhiteSpace Logo"
              className="mosaic-header__logo-img"
            />
          </Link>
        </div>
        <div className="mosaic-header__items">
          {images.map((image, index) => (
            <div
              key={index}
              className={`mosaic-header__item mosaic-header__item--${index +
                1}`}
              onClick={() => toggleLightbox(index)}
            >
              <img
                src={image}
                alt={name}
                className="mosaic-header__img"
                onLoad={() => handleImageLoaded(index)}
              />
              {!imageIsLoaded[index] && (
                <div className="mosaic-header__placeholder" />
              )}
            </div>
          ))}
        </div>
      </header>

      {lightBoxIsOpen && (
        <Lightbox
          mainSrc={images[imageIndex]}
          nextSrc={images[(imageIndex + 1) % images.length]}
          prevSrc={images[(imageIndex + images.length - 1) % images.length]}
          {...{ onCloseRequest, onMovePrevRequest, onMoveNextRequest }}
          imageCaption={name}
        />
      )}
    </>
  );
};

export default MosaicHeader;
