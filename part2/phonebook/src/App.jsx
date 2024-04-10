import { useEffect, useState } from "react";

import personsService from "./services/persons";

import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Person from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personsFiltered, setPersonsFiltered] = useState("");
  const [operationMessage, setOperationMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleAddNewName = (event) => {
    event.preventDefault();
    const userExists = persons.find((person) => person.name === newName);

    if (userExists) {
      const confirmExistingNameMessage = `${userExists.name} is already added to phonebook, replace the old number with a new one?`;
      if (confirm(confirmExistingNameMessage)) {
        const changedPerson = { ...userExists, number: personPhone };
        personsService
          .update(userExists.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== userExists.id ? person : returnedPerson
              )
            );
            setOperationMessage({
              message: `${changedPerson.name} number changed`,
              type: "success",
            });
            setTimeout(() => {
              setOperationMessage(null);
            }, 4000);
          });
      }
    } else {
      const nameObject = {
        name: newName,
        number: personPhone,
      };

      personsService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setOperationMessage({
          message: `Added ${nameObject.name}`,
          type: "success",
        });
        setTimeout(() => {
          setOperationMessage(null);
        }, 4000);
      });
    }
    setNewName("");
    setPersonPhone("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPersonPhone(event.target.value);
  };

  const handlePersonsFilteredChange = (event) => {
    setPersonsFiltered(event.target.value);
  };

  const handlePersonDelete = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    const personName = deletedPerson.name;
    const confirmationMessage = `Delete ${personName}?`;

    if (confirm(confirmationMessage)) {
      setPersons(persons.filter((person) => person.id !== id));

      personsService
        .del(id)
        .then((response) => {
          console.log(`deleted ${response}`);
        })
        .catch((error) => {
          const errorMessage = `Information of ${personName} has already been removed from server`;

          setOperationMessage({ message: errorMessage, type: "error" });
          setTimeout(() => {
            setOperationMessage(null);
          }, 4000);
          setPersons(persons.filter(p => p.id !== id))
        });
    }
  };

  const filteredPersons = personsFiltered
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(personsFiltered.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={operationMessage} />
      <Filter
        filterValue={personsFiltered}
        handleFilterChange={handlePersonsFilteredChange}
      />
      <h3>Add new</h3>
      <PersonForm
        name={newName}
        handleNameChange={handleNameChange}
        number={personPhone}
        handleNumberChange={handlePhoneChange}
        handleAddNewName={handleAddNewName}
      />
      <h3>Numbers</h3>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => handlePersonDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
