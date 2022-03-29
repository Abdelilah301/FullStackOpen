import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th><StatisticsLine text="Good" value={good} /></th>
          </tr>
          <tr>
            <th><StatisticsLine text="Neutral" value={neutral} /></th>
          </tr>
          <tr>
            <th><StatisticsLine text="Bad" value={bad} /></th>
          </tr>
        </tbody>
      </table>
    </>


  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <div>
      <h4>{text}  {value}</h4>
    </div>
  )
}

const NoFeedBack = () => {
  return (
    <h3>No Feedback given</h3>
  )
}
const FeedBack = ({ totalFeed, good, neutral, bad }) => {
  if (totalFeed === 0) {
    return <NoFeedBack />;
  }
  return (
    <div>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Average total={totalFeed} avg={good - bad} positive={(good / totalFeed) * 100} />
    </div>

  )
}

const Average = ({ total, avg, positive}) => {

  return (
    <>
      <table>
        <tbody>
          <tr>
          <th>Total {total}</th>
          </tr>
          <tr>
          <th>Average {avg / total || 0}</th>
          </tr>
          <tr>
            <th>Positive {positive || 0}%</th>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;

  const stateGood = () => setGood(good + 1);
  const stateNeutral = () => setNeutral(neutral + 1);
  const stateBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={stateGood} text="Good" />
      <Button handleClick={stateNeutral} text="Neutral" />
      <Button handleClick={stateBad} text="Bad" />
      <h1>Statistics</h1>

      <FeedBack totalFeed={total} good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App
