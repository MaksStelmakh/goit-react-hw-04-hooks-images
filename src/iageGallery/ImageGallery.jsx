import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import LoadMore from "../loadMore/LoadMore";
import { ImageList, Loader } from "./imageGallery.styled";
import apiIMG from "../api/api";

export default function ImageGallery({
  imgName,
  page,
  setPage,
  images,
  setImages,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imgName) {
      return;
    }
    setLoading(true);
    apiIMG
      .getImageFetch(imgName, page)
      .then(paintPicturesMethod)
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [imgName, page]);

  const loadMoreMethod = () => {
    setPage((prev) => prev + 1);
  };

  const paintPicturesMethod = ({ hits }) => {
    if (images.length === 0 && hits.length === 0) {
      return alert("There is no result for your reqest!");
    } else if (hits.length === 0) {
      return alert(`Images are over!`);
    }
    if (images === []) {
      return setImages(hits);
    }
    setImages((prevState) => [...prevState, ...hits]);
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
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};
