import { useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import ImageGallery from "../iageGallery/ImageGallery";
import { AppWrapper } from "./App.styled";

export default function App() {
  const [searchValue, setSearchVslue] = useState("");

  return (
    <AppWrapper>
      <Searchbar onSubmit={setSearchVslue} />
      <ImageGallery imgName={searchValue} />
    </AppWrapper>
  );
}
