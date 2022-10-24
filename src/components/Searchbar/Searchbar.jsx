import s from '../../styles.module.css';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    query: '',
  };
  handleSearchInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.warn('Enter image category name');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={e => this.handleOnSubmit(e)}>
          <button type="submit" className={s.SearchForm_button}>
            <AiOutlineSearch size={18} />
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            name="query"
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onInput={this.handleSearchInput}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
