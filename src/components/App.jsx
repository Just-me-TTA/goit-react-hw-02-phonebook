import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { MainTitle, Title, Wrapper } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+38-097-635-35-83' },
      { id: 'id-2', name: 'Hermione Kline', number: '+38-067-274-68-29' },
      { id: 'id-3', name: 'Eden Clements', number: '+38-063-825-36-57' },
      { id: 'id-4', name: 'Annie Copeland', number: '+38-093-756-55-22' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const isExist = this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase().trim()
    );
    const contactObj = {
      ...newContact,
      id: nanoid(),
    };
    if (isExist) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, contactObj],
    }));
  };

  deleteContact = e => {
    const contactToDelete = e.target.id;
    this.setState(prev => ({
      contacts: prev.contacts.filter(({ id }) => id !== contactToDelete),
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterContactsByName = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContacts;
  };

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <MainTitle>Phonebook</MainTitle>
        <ContactForm addContact={this.addContact} />
        <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
        <Title>Contacts</Title>
        <ContactList
          contacts={this.filterContactsByName()}
          deleteContact={this.deleteContact}
        />
      </Wrapper>
    );
  }
}
