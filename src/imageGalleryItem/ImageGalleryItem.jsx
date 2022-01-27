import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../modal/Modal";
import { Items } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ bigPhoto, smallPhoto, tag }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevCheck) => !prevCheck);
  };

  return (
    <Items>
      <img onClick={toggleModal} src={smallPhoto} alt={tag} />
      {showModal && <Modal photo={bigPhoto} tag={tag} onClose={toggleModal} />}
    </Items>
  );
}

ImageGalleryItem.propTypes = {
  bigPhoto: PropTypes.string.isRequired,
  smallPhoto: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
