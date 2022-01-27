import PropTypes from "prop-types";
import { Component } from "react";
import Modal from "../modal/Modal";
import { Items } from "./ImageGalleryItem.styled";

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { bigPhoto, smallPhoto, tag } = this.props;
    return (
      <Items>
        <img onClick={this.toggleModal} src={smallPhoto} alt={tag} />
        {this.state.showModal && (
          <Modal photo={bigPhoto} tag={tag} onClose={this.toggleModal} />
        )}
      </Items>
    );
  }
}

ImageGalleryItem.propTypes = {
  bigPhoto: PropTypes.string.isRequired,
  smallPhoto: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
