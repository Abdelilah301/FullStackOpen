import React from "react";

const Header = ({ course }) => {
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>

  )
}

const Total = ({ total }) => {
  // const sumWithInitial = course.parts.reduce(
  //   (previousValue, currentValue) => previousValue + currentValue.exercises
  // );

  return (
    <div>
      <h3>Total of {total} exercises</h3>
    </div>
  )
}



const Course = ({ course }) => {
  let total = 0;
  const result = course.parts.map(part => {

    total += part.exercises
    return <li key={part.id}>{part.name}  {part.exercises}</li>
  }
  );

  return (
    <div>
      <Header course={course} />
      {result}
      <Total total={total} />
    </div>
  )
}

export default Course;
