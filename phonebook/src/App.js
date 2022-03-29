import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value);
    // console.log(event.target.value);
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
    // console.log(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
    //  console.log(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    
    }
    const str = `\\b${newName}\\b`;
    const wordMatch = str.trim().split(" ").join('');
    // console.log(wordMatch);
    const regex = new RegExp(wordMatch);
    const result = persons.filter(person => regex.test(person.name.split(" ").join('')));
    //console.log(persons[1].name.split(" ").join(''));

    if (result.length > 0) {
      alert(`${newName} is already exist!`)
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} onChangeFilter={handleFilter} />
      <PersonForm
        onSubmitPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App