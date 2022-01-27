import { Component } from "react";
import Searchbar from "../searchbar/Searchbar";
import ImageGallery from "../iageGallery/ImageGallery";
import { AppWrapper } from "./App.styled";

export default class App extends Component {
  state = {
    searchValue: "",
  };

  handleFormSubmit = (searchValue) => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imgName={this.state.searchValue} />
      </AppWrapper>
    );
  }
}
