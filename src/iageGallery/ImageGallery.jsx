import PropTypes from "prop-types";
import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import LoadMore from "../loadMore/LoadMore";
import { ImageList, Loader } from "./imageGallery.styled";

export default class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });
      this.getImageFetch();
      return;
    }
    if (prevProps.imgName !== this.props.imgName) {
      if (prevProps.imgName) {
        this.setState({ images: null });
      }
      this.setState({ loading: true });
      this.setState({ page: 1 });
      this.getImageFetch();
    }
    if (this.state.images && this.state.images.length === 0) {
      alert("There is no result for your reqest!");
      this.setState({ images: null });
    }
  }

  loadMoreMethod = () => {
    this.setState((prev) => {
      return {
        page: prev.page + 1,
      };
    });
  };

  getImageFetch = () => {
    const { imgName } = this.props;
    const { page } = this.state;
    const apiKey = `24435694-017d2bab3470121913608c0c0`;
    fetch(
      `https://pixabay.com/api/?q=${imgName}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    ).then((response) => {
      if (response.ok) {
        return response
          .json()
          .then(({ hits }) => {
            this.state.images
              ? this.setState(({ images }) => ({
                  images: [...images, ...hits],
                }))
              : this.setState({ images: hits });
            if (hits.length === 0) {
              alert(`Images are over!`);
            }
          })
          .then(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          })
          .finally(() => this.setState({ loading: false }));
      }
      return Promise.reject(new Error("Nothing found"));
    });
  };

  render() {
    const { images, loading } = this.state;
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
          <LoadMore click={this.loadMoreMethod} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imgName: PropTypes.string.isRequired,
};
