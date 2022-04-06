import React from "react";

const Person = ({ name, number, onDelete }) => {

    return (
        <div>
            <li>{name} {number}<button onClick={onDelete}>delete</button></li>
        </div>
    )
}

const Persons = ({ persons, newFilter, onDelete, updateNumberOf }) => {
    let filteredList = persons
    if (newFilter) {
        filteredList = persons.filter(el => new RegExp(newFilter.toLowerCase()).test(el.name.toLowerCase()))
    }
    return (
        filteredList.map(person => <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person.id, person.name)}  />)
    )
}

export default Persons