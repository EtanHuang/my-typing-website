import React, {useState, useEffect} from 'react';
import '../App.css';
import InfoContainer from '../components/InfoContainer';
import axios from 'axios';
import results from '../results'

const words = ['house', 'in', 'school', 'open', 'kind', 'been', 'saw', 'picture', 'is', 'you', 'where', 'when'
, 'state', 'me', 'how', 'open', 'sometimes', 'she', 'he', 'like', 'who', 'what', 'kind', 'develop', 'interest' 
, 'without', 'number', 'time', 'end', 'start', 'increase', 'begin', 'but', 'look', 'book', 'picture', 'zebra', 'dog',
'cat', 'animal', 'cube', 'laptop', 'how', 'is', 'but', 'far', 'far', 'far', 'found', 'should', 'part', 'how', 'basic', 
'to', 'man', 'right', 'left', 'odd', 'even', 'our', 'us', 'even', 'go', 'go', 'go', 'been']

function Test()  {

  const totalTime = 60; 
  const testLength = 200;
  const [wordlist, setWordlist] = useState([]); // the current word list 
  const [currentWordIndex, setcurrentWordIndex] = useState(0); // current index of the word we are on 
  const [totalWordsTyped, setTotalWordsTyped] = useState(0);
  const [userInput, setUserInput] = useState(''); // user's input in the box, reset when pressed space bar 
  const [testActive, setTestActive] = useState(false); // true if test is running, false otherwise 
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [timer, setTimer] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [correct, setCorrect] = useState(false); //determines whether current user input matches current word 
  const [wpm, setWpm] = useState(0);


  function postData() {
    const testData = {
      wpm: wpm,
      correctCount: correctCount,
      wrongCount: wrongCount
    };

    results.post('/results.json', testData) 
      .then(response => {
        console.log('Test data sent successfully:', 
        response.data, 
        testData
        );
      })
      .catch(error => {
        console.error('Error sending test data:', error);
      });
  }


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
      postData();
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [timer]);


  const handleStart = () => {
    setIsRunning(true);
    setTestActive(true);
    setTimer(totalTime+1);
    setTimer(totalTime-1);
  };

  function handleRestart() {
    setTimer(totalTime);
    setIsRunning(false);
    setTestActive(false);
    setcurrentWordIndex(0);
    setTotalWordsTyped(0);
    setCorrectCount(0);
    setWrongCount(0);
    setWpm(0);
    generateWords();
    setUserInput("");
  }

  useEffect(() => {
    generateWords();
  }, []);

  let charCount = 0;

  function calculateWPM() {
    let netWpm = 0;
    let grossWpm = 0;
    for (let i = 0; i < (totalWordsTyped % testLength); i++) {
      charCount += wordlist[i].length;
    }

    // grosswpm = (all typed characters / 5) / time (min) 
    // netwpm = grosswpm - (wrong words / time (min))
    if (timer !== totalTime) { // prevents division by 0 
      grossWpm = Math.round(((charCount + totalWordsTyped) / 5) / ((totalTime - timer) /  totalTime));
      netWpm = Math.round(grossWpm - (wrongCount / ((totalTime - timer) / totalTime))); 

    }
    if (netWpm < 0) {
      setWpm(0);
    } 
    else {
      setWpm(netWpm);
    }
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
    if (userInput.trim() !== '' && e.key === ' ') { 
      e.preventDefault();
      setUserInput('');
      checkWord();
      setcurrentWordIndex(currentWordIndex + 1);
      setTotalWordsTyped(totalWordsTyped + 1);
    }    
    //console.log(currentWordIndex);
    if (currentWordIndex === testLength-1 && e.key === ' ') {
      generateWords();
      setcurrentWordIndex(0);
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

    return (
        <div>
          <div className = 'container'>
            <div className = 'text-box'>
              {newerWordList}     
              <InfoContainer
                timer={timer}
                correctCount={correctCount}
                wrongCount={wrongCount}
                wpm={wpm}
              /> 
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
export default Test;
  


