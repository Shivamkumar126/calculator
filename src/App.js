import './App.css';
import { useReducer } from "react";
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

// actions taken in the whole project

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: " evaluate"
}

// reducer function

function reducer({ currentOperand, previousOperand, operation, overwrite }, { type, payload }) {
  switch (type) {

    // here are the cases for all the functions perfomed by the calculator

    case ACTIONS.ADD_DIGIT:
      if (overwrite) {
        return {
          currentOperand: payload.digit,
          overwrite: false,
        }

      }
      if (payload.digit === "0" && currentOperand === "0") {
        return { currentOperand: "0" };
      }

      if (payload.digit === ".") {
        if(currentOperand.includes(".")){
          return{currentOperand}
        }
        return { 
          currentOperand : currentOperand+"."
        };
      }
      return {
        currentOperand,
        previousOperand,
        operation,
        currentOperand: `${currentOperand || ""}${payload.digit}`,
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (currentOperand == null && previousOperand == null) {
        return {
          currentOperand,
          previousOperand,
        }
      }

      if (previousOperand == null) {
        return {
          operation: payload.operation,
          previousOperand: currentOperand,
          currentOperand: null,
        }
      }

      return {
        previousOperand: evaluate(currentOperand, previousOperand, operation),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (currentOperand == null || previousOperand == null || operation == null) {
        return {
          currentOperand,
          previousOperand,
          operation,
        }

      }

      return {

        previousOperand: null,
        overwrite: true,
        operation: null,
        currentOperand: evaluate(currentOperand, previousOperand, operation),
      }

    case ACTIONS.DELETE_DIGIT:
      if (overwrite) {
        return {
          overwrite: false,
          currentOperand: null,
        }
      }

      if (currentOperand == null) {
        return { previousOperand, operation }
      }

      if (currentOperand.length === 1) {
        return {
          currentOperand: null,
          previousOperand,
          operation,
        }
      }

      return {
        currentOperand,
        previousOperand,
        operation,
        currentOperand: currentOperand.slice(0, -1),

      }
  }
}

// function to perform the calculation for the calculator

function evaluate(currentOperand, previousOperand, operation) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let computation = "";

  switch (operation) {

    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

// main app component

function App() {

  const [{ currentOperand, previousOperand, operation, overwrite }, dispatch] = useReducer(reducer, {});

  return (
    // rendering the main body of calculator

    <div className="calculator">
      <div className='output'>
        <div className='previous-operand'>{previousOperand}{operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>

      {/* <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button> */}
    </div>
  );
}

export default App;
