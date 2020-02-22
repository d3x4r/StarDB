/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Row from '../Row';
import PersonDetails from '../PersonDetails';
import Items from '../Items';
import ErrorBoundy from '../ErrorBoundry';

class PeoplePage extends Component {
  componentDidMount() {
    const { match, onPersonSelect, selectedItem } = this.props;
    const { id } = match.params;
    if (id && selectedItem.id !== id) {
      onPersonSelect(id);
    }
  }

  getLabel = ({ name }) => name;

  setPerson = (personId) => (evt) => {
    const { onPersonSelect, history } = this.props;
    evt.preventDefault();
    history.push(`/people/${personId}`);
    onPersonSelect(personId);
  };

  render() {
    const {
      items,
      selectedItem,
      loadingState,
      errorState,
      match: { params },
    } = this.props;

    const { id } = params;

    const dataToDetails = id ? selectedItem : {};

    const PersonList = (
      <Items
        items={items}
        onClickHandler={this.setPerson}
        getLabel={this.getLabel}
      />
    );

    const Details = (
      <PersonDetails
        selectedItem={dataToDetails}
        loadingState={loadingState}
        errorState={errorState}
      />
    );

    return (
      <ErrorBoundy>
        <Row leftElement={PersonList} rightElement={Details} />
      </ErrorBoundy>
    );
  }
}

PeoplePage.defaultProps = {
  items: [],
};

PeoplePage.propTypes = {
  items: PropTypes.instanceOf(Array),
  onPersonSelect: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  selectedItem: PropTypes.instanceOf(Object).isRequired,
  loadingState: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(PeoplePage);
