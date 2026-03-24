import { useReducer } from "react";
import "./styles.css"

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand"></div>
        <div className="current-operand"></div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>:</button>
      <button onClick="showOutput()">1</button>
      <button onClick="showOutput()">2</button>
      <button onClick="showOutput()">3</button>
      <button>*</button>
      <button onClick="showOutput()">4</button>
      <button onClick="showOutput()">5</button>
      <button onClick="showOutput()">6</button>
      <button>+</button>
      <button onClick="showOutput()">7</button>
      <button onClick="showOutput()">8</button>
      <button onClick="showOutput()">9</button>
      <button>-</button>
      <button>.</button>
      <button onClick="showOutput()">0</button>
      <button className="span-two">=</button>
    </div>
  )
}
export default App;