import { Backdrop, makeStyles } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import { uploadFireStore } from '../../../firebase';

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

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function DropzonePreview(props) {
  const {
    imageFiles,
    setImageFiles,
    previewFiles,
    setPreviewFiles,
    currentRoomID,
  } = props;
  const styles = useStyles();
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setPreviewFiles(
        acceptedFiles.map(file => {
          return { preview: URL.createObjectURL(file), image: file };
        }),
      );
    },
  });

  // useEffect(() => {
  //   console.log(imageFiles, previewFiles);
  // }, [imageFiles, previewFiles]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const thumbFiles = previewFiles.length
    ? previewFiles.map(file => file.preview)
    : imageFiles;

  const thumbs = thumbFiles?.map((file, index) => (
    <div style={thumb} key={index} onClick={() => onOpenLightBox(index)}>
      <div style={thumbInner}>
        <img src={file?.preview ?? file} alt="preview" style={img} />
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
      previewFiles.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    },
    [previewFiles],
  );

  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone', style })}>
          <input {...getInputProps()} />
          <p>Thả ảnh vào đây, hoặc nhấp để chọn ảnh</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
      {isLightBoxOpen && (
        <Lightbox
          clickOutsideToClose
          imageLoadErrorMessage="Không tải được ảnh"
          mainSrc={
            previewFiles.length
              ? previewFiles[photoIndex]?.preview
              : imageFiles[photoIndex]
          }
          nextSrc={
            previewFiles.length
              ? previewFiles[(photoIndex + 1) % imageFiles.length]?.preview
              : imageFiles[(photoIndex + 1) % imageFiles.length]
          }
          prevSrc={
            previewFiles.length
              ? previewFiles[
                  (photoIndex + imageFiles.length - 1) % imageFiles.length
                ]?.preview
              : imageFiles[
                  (photoIndex + imageFiles.length - 1) % imageFiles.length
                ]
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
