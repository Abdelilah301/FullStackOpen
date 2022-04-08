import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson);
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

  const onHandleDelete = (personId, name) => {
    const confirmAlert = window.confirm(
      `Do you really want to delete ${name}?`
    )
    if (confirmAlert === true) {
      const newList = persons.filter(person => person.personId !== personId);
      personService
        .deleteId(personId)
        .then(() => {
          setPersons(newList);
          console.log(personId);
          window.location.reload(false);
        })
    }
  }

  const updateNumberOf = () => {

  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: ""

    }
    const str = `\\b${newName}\\b`;
    const wordMatch = str.trim().split(" ").join('');
    // console.log(wordMatch);
    const regex = new RegExp(wordMatch);
    const result = persons.filter(person => regex.test(person.name.split(" ").join('')));
    //console.log(persons[1].name.split(" ").join(''));
    if (result.length > 0) {
      const person = persons.find(p => p.name === newName)
      const confirmAlert = window.confirm(
        `${newName} is already exist do you want to replace the old number?`
      )
      if (confirmAlert) {
        const id = person.id;
        const replacePerson = { ...person, number: newNumber }
        console.log(person);
        console.log(id);
        return personService
          .update(id, replacePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            console.log('success!');
            setNewName('');
            setNewNumber('');
          })
          .then(succes => {
            setErrorMessage(`Phone number of ${newName} has changed to ${newNumber}!`)
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(`${newName} was already deleted from server`)

            setTimeout(() => {
              setPersons(persons.filter(p => p.id !== id));
              setErrorMessage(null);
            }, 5000);
          })
      }
    } else {
      personService.
        create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .then(success => {
          setErrorMessage(`${newName} was Added to your phonebook`)
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })

    }


  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} onChangeFilter={handleFilter} />
      <PersonForm
        onSubmitPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} onDelete={onHandleDelete} updateNumberOf={updateNumberOf} />
    </div>
  )
}

export default App