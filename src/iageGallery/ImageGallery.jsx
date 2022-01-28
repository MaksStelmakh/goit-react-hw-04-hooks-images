import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import LoadMore from "../loadMore/LoadMore";
import { ImageList, Loader } from "./imageGallery.styled";

export default function ImageGallery({ imgName }) {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!imgName) {
      return;
    }
    console.log("изменяем страницу", page);
    setLoading(true);
    getImageFetch();
  }, [page]);

  useEffect(() => {
    if (!imgName) {
      return;
    }
    console.log("изменяем имя", imgName);
    if (images) {
      setImages(null);
      console.log("обнуляем фотографии", images);
      setPage(1);
      console.log("обнуляем страницу", page);
    }
    setLoading(true);
    return getImageFetch();
  }, [imgName]);

  useEffect(() => {
    if (images && images.length === 0) {
      alert("There is no result for your reqest!");
      setImages(null);
    }
  }, [images]);

  const loadMoreMethod = () => {
    setPage((prev) => prev + 1);
  };

  const paintPicturesMethod = ({ hits }) => {
    if (hits.length === 0) {
      return alert(`Images are over!`);
    }
    if (images && page > 1) {
      return setImages((prevState) => [...prevState, ...hits]);
    }
    setImages(hits);
  };

  const getImageFetch = () => {
    const apiKey = `24435694-017d2bab3470121913608c0c0`;
    fetch(
      `https://pixabay.com/api/?q=${imgName}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    ).then((response) => {
      if (response.ok) {
        return response
          .json()
          .then(paintPicturesMethod)
          .then(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          })
          .finally(() => setLoading(false));
      }
      return Promise.reject(new Error("Nothing found"));
    });
  };
  return (
    <>
      <Loader>
        <ImageList>
          {images && images.length !== 0
            ? images.map(({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    smallPhoto={webformatURL}
                    bigPhoto={largeImageURL}
                    tag={tags}
                  />
                );
              })
            : ""}
        </ImageList>
        {loading && <TailSpin color="#3f51b5" height={80} width={80} />}
      </Loader>
      {images && images.length !== 0 && !loading && (
        <LoadMore click={loadMoreMethod} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  imgName: PropTypes.string.isRequired,
};
