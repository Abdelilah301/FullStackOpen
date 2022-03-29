import React from "react";

const Person = ({ name, number }) => {
    return (
        <div>
            <li>{name} {number}</li>
        </div>
    )
}

const Persons = ({ persons, newFilter }) => {
    let filteredList = persons
    if (newFilter) {
        filteredList = persons.filter(el => new RegExp(newFilter.toLowerCase()).test(el.name.toLowerCase()))
    }
    return (
        filteredList.map(person => <Person key={person.id} name={person.name} number={person.number} />)
    )
}

export default Persons