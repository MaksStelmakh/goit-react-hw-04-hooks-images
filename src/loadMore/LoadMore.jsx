import PropTypes from "prop-types";
import { LoadMoreBtn } from "./LoadMore.styled";

export default function LoadMore({ click }) {
  return (
    <LoadMoreBtn type="button" onClick={click}>
      Load more
    </LoadMoreBtn>
  );
}

LoadMore.propTypes = {
  click: PropTypes.func.isRequired,
};
