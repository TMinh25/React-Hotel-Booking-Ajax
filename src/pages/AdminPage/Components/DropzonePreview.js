import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Lightbox from 'react-image-lightbox';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

function DropzonePreview(props) {
  const { imageFiles, setImageFiles, currentRoomID } = props;
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImageFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = imageFiles.map((file, index) => (
    <div style={thumb} key={file.name} onClick={() => onOpenLightBox(index)}>
      <div style={thumbInner}>
        <img
          src={currentRoomID ? file : file.preview}
          alt="preview"
          style={img}
        />
      </div>
    </div>
  ));

  const onOpenLightBox = photoIndex => {
    setPhotoIndex(photoIndex);
    setIsLightBoxOpen(true);
  };
  const onCloseLightBox = () => setIsLightBoxOpen(false);
  const onMovePrevRequest = () =>
    setPhotoIndex((photoIndex + imageFiles.length - 1) % imageFiles.length);
  const onMoveNextRequest = () =>
    setPhotoIndex((photoIndex + 1) % imageFiles.length);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      imageFiles.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [imageFiles],
  );

  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Thả ảnh vào đây, hoặc nhấp để chọn ảnh</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
      {isLightBoxOpen && (
        <Lightbox
          imageLoadErrorMessage="Không tải được ảnh"
          mainSrc={imageFiles[photoIndex].preview ?? imageFiles[photoIndex]}
          nextSrc={
            imageFiles[(photoIndex + 1) % imageFiles.length].preview ??
            imageFiles[(photoIndex + 1) % imageFiles.length]
          }
          prevSrc={
            imageFiles[(photoIndex + imageFiles.length - 1) % imageFiles.length]
              .preview ??
            imageFiles[(photoIndex + imageFiles.length - 1) % imageFiles.length]
          }
          onCloseRequest={onCloseLightBox}
          onMovePrevRequest={onMovePrevRequest}
          onMoveNextRequest={onMoveNextRequest}
        />
      )}
    </>
  );
}

export default DropzonePreview;
