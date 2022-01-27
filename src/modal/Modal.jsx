import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalDiv } from "./Modal.styled";

const modalRoot = document.querySelector(`#modal-root`);

export default function Modal({ photo, tag, onClose }) {
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === `Escape`) {
        onClose();
      }
    };
    window.addEventListener(`keydown`, handleKeyDown);
    return () => {
      window.removeEventListener(`keydown`, handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalDiv>
        <img src={photo} alt={tag} />
      </ModalDiv>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  photo: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
