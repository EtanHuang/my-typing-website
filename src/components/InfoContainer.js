import React from 'react';


function InfoContainer({timer, correctCount, wrongCount, wpm}) {
    const testInfo = [
        { name: 'Time Left', displayvalue: timer, id: 1 },
        { name: 'Correct', displayvalue: correctCount, id: 2 },
        { name: 'Wrong', displayvalue: wrongCount, id: 3 },
        { name: 'WPM', displayvalue: wpm, id: 4 }];

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

  export default InfoContainer;




