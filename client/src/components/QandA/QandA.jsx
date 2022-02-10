import React from 'react';
import Search from './Search.jsx';
import Questions from './Questions.jsx';

class QandA extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h5>Questions &amp; Answers</h5>
        <div>
          <Search />
        </div>
        <div>
          <Questions />
        </div>
      </>
    );
  }

}





export default QandA;