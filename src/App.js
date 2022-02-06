import { useState } from 'react';
import './App.css';
import { Display } from './components/Display';
import { Keyboard } from './components/Keyboard';

let output = '';
let history = '';
let symbols = ['+','-','*','*'];

function App() {

  const [state,setState] = useState({
    history : '',
    displayValue : ''
  });

  const updateState = () => {
    setState({history : history.toString(), displayValue : output.toString()})
  }

  // function key

  const functionKey = (id,lastInput) => {

    const resetOutput = display => {
      output = '';
      history = '';
      
      display && updateState();
    }

    const calculate = lastInput => {
      if(!symbols.includes(lastInput) &&  output){
        try{
          history = output;
          output = eval(output.replace(/%/g, '*0.01'));
					updateState();
					history = output;
					output = '';
				} catch (error) {
					output = 'Error';
					updateState();
					resetOutput();
        }
      }
    }

    switch(id){
      case 'clear' : 

            resetOutput(true);
            break;

      case 'clearBack' :

            output = output.slice(0,-1);
            updateState();
            break;
      
      case 'calc' : 

            calculate(lastInput);
            break;
      
      default : return;


    }
  }

  // operator Key

  const operatorKey = (value,lastInput) => {
    if(output === '' && value !== '-'){
      return;
    }
    else{
      symbols.includes(lastInput) ? (output = output.slice(0,-1) + value) : (output += value);
    }

    updateState();
  }


  // numberKey

  const numberKey = (value,lastInput) => {
    if(value === '.' || value === '%'){
      if(output === '' && value === '%') return;

      lastInput === '.' || lastInput === '%' || (output += value);
    }
    else output += value;

    updateState();
  }

  const onClick = (id,keyType,value) => {

    output = output.toString();

    let lastInput = output.slice(-1);

    switch(keyType){
      case 'function' : functionKey(id,lastInput);
                        break;
      
      case 'operator' : operatorKey(value,lastInput);
                        break;

      case 'number'  : numberKey(value,lastInput);
                       break;

      default : return;

    }

    
  }

  return (
    <div className="app">
    <div className="container">
      <Display history={state.history} output={state.displayValue} />
      <Keyboard onClick={onClick} />
    </div>
  </div>
    );
}

export default App;
