import PropTypes from "prop-types";
import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { Searchbars, SearchForm } from "./Searchbar.styled";

export default function Searchbar({ onSubmit }) {
  const [images, setImages] = useState("");

  const handleNameCHange = (event) => {
    setImages(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (images.trim() === "") {
      alert("Введите имя");
      return;
    }
    onSubmit(images);
    setImages("");
  };

  return (
    <Searchbars>
      <SearchForm onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <ImSearch className="button-label" />
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={images}
          onChange={handleNameCHange}
        />
      </SearchForm>
    </Searchbars>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
