import { useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import ImageGallery from "../iageGallery/ImageGallery";
import { AppWrapper } from "./App.styled";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  return (
    <AppWrapper>
      <Searchbar
        setPage={setPage}
        onSubmit={setSearchValue}
        setPaintImages={setImages}
      />
      <ImageGallery
        setPage={setPage}
        page={page}
        imgName={searchValue}
        images={images}
        setImages={setImages}
      />
    </AppWrapper>
  );
}
