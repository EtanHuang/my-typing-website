import React, {useState, useEffect} from 'react';
import './App.css';

const words = ['house', 'in', 'school', 'open', 'kind', 'been', 'saw', 'picture', 'is', 'you', 'where', 'when'
, 'state', 'me', 'how', 'open', 'sometimes', 'she', 'he', 'like', 'who', 'what', 'kind', 'develop', 'interest' 
, 'without', 'number', 'time', 'end', 'start', 'increase', 'begin', 'but', 'look', 'book', 'picture', 'zebra', 'dog',
'cat', 'animal', 'cube', 'laptop', 'how', 'is', 'but', 'far', 'far', 'far', 'found', 'should', 'part', 'how', 'basic', 
'to', 'man', 'right', 'left', 'odd', 'even', 'our', 'us', 'even', 'go', 'go', 'go', 'been']

function App() {
  const totalTime = 60;
  const testLength = 200;
  const [wordlist, setWordlist] = useState([]); // the current word list 
  const [currentWordIndex, setcurrentWordIndex] = useState(0); // current index of the word we are on 
  const [userInput, setUserInput] = useState(''); // user's input in the box, reset when pressed space bar 
  const [testActive, setTestActive] = useState(false); // true if test is running, false otherwise 
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [timer, setTimer] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [correct, setCorrect] = useState(false); //determines whether current user input matches current word 
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
        interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      calculateWPM();
    }

    if (timer === 0) {
      setIsRunning(false);
      setTestActive(false);
      clearInterval(interval);
      calculateWPM();
    }

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [isRunning, timer]); // runs when isRunning changes from true to false and runs whenever timer decreases by 1 until 0

  const handleStart = () => {
    setIsRunning(true);
    setTestActive(true);
  };

  function handleRestart() {
    setTimer(totalTime);
    setIsRunning(false);
    setTestActive(false);
    setcurrentWordIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setWpm(0);
    generateWords();
    setUserInput("");
  }

  useEffect(() => {
    generateWords();
  }, []);

  function calculateWPM() {
    let charCount = 0;
    for (let i = 0; i < currentWordIndex; i++) {
      charCount += wordlist[i].length;
    }
    charCount += currentWordIndex; // adds spaces. 
    // grosswpm = (all typed characters / 5) / time (min) 
    // netwpm = grosswpm - (wrong words / time (min))
    let netWpm = 0;
    if (timer !== totalTime) { // prevents division by 0 
      let grossWpm = Math.round(charCount / 5) / ((totalTime - timer) /  60);
      netWpm = Math.round(grossWpm - (wrongCount / ((totalTime - timer) / 60))); 
    }
    setWpm(netWpm);
  }

  function generateWords() {
    const generatedWords = [];
    for (let i = 0; i < testLength; i++) {
      let index = Math.floor(Math.random() * words.length);
      generatedWords.push(words[index]);
    }
    setWordlist(generatedWords);
  }

  let newWordList = wordlist.map((word, index) => {
    let wordClassName = (index === currentWordIndex) ? 'text highlight' : 'text';
      if (index === currentWordIndex - 1 && correct) {
        wordClassName = 'text right';
      } else if (index === currentWordIndex - 1 && !correct) {
        wordClassName = 'text wrong';
      }
    return (
      <span key = {index} 
            className = {wordClassName}>
        {word}
      </span>
    ); 
  });

  let newerWordList = newWordList.map((element, index) => (
      <React.Fragment key={index}>
        {element}{" "}
      </React.Fragment>
    ));

  function handleUserInput(e) {
    if (!testActive && e.target.value == " ") {
      return;
    }
    if (timer === totalTime && !testActive) {
      handleStart();
    } else if (timer === 0) {
      e.preventDefault();
      return;
    }
    setUserInput(e.target.value.trim());
  }

  function checkWord() {
      if (wordlist[currentWordIndex] === userInput) {
        setCorrect(true);
        setCorrectCount(correctCount + 1);
        //newWordList[currentWordIndex].props.className.append('right');
      } else {
        setCorrect(false);
        setWrongCount(wrongCount + 1);
        //newWordList[currentWordIndex].props.className.append('wrong');
      }
  }

  function handleSpace(e) {
    // if(currentWordIndex === 200) {
    //   setcurrentWordIndex(0);
    // }
    if (userInput.trim() !== '' && e.key === ' ') { 
      e.preventDefault();
      setUserInput('');
      checkWord();
      setcurrentWordIndex(currentWordIndex + 1);
    }
  }

  function preventCopyPaste(e) {
    e.preventDefault();
  }
  
  document.body.style.backgroundColor = "#17a2b8";

  function RestartButton() {
    return (
      <button onClick = {handleRestart}
              className = "restart-button">
        Restart
      </button>
    )
  }

  const testInfo = [
    { name: 'Time Left', displayvalue: timer, id: 1 },
    { name: 'Correct', displayvalue: correctCount, id: 2 },
    { name: 'Wrong', displayvalue: wrongCount, id: 3 },
    { name: 'WPM', displayvalue: wpm, id: 4 }];

 function InfoContainer() {
    return (
      <ul className = 'info-container'>
        {testInfo.map(item => 
          <li 
            style = {{listStyleType: 'none',
                      fontFamily: 'sans-serif',
                      fontSize: 23}}
            key = {item.id}>
              {item.name}:
              {" "}
              <strong>{item.displayvalue}</strong>
          </li>)}
        </ul>
     )
  };

  return (
    <div>
      <div className = 'container'>
        <div className = 'text-box'>
          {newerWordList}     
          <InfoContainer /> 
        </div>  

      </div>    
      <div className = 'input-restart-container'>
          <input
                type = "text"
                className = "input-box"
                //placeholder = "Enter here to type..."
                value = {userInput}
                onChange = {handleUserInput}
                onPaste = {preventCopyPaste}
                onKeyDown = {handleSpace}>
          </input>  
          <RestartButton className = 'restart-button' />

        </div> 
    </div> 
  );
}

export default App;
