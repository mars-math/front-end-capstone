import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

class AnswersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedHelpfulA: true,
      clickedReport: true,
    };

    this.clickHelpfulA = this.clickHelpfulA.bind(this);
    this.helpfulACounterDisplay = this.helpfulACounterDisplay.bind(this);
    this.clickReport = this.clickReport.bind(this);
    this.reportedDisplay = this.reportedDisplay.bind(this);
  }

  clickHelpfulA() {
    const aID = this.props.answer.id;
    if (this.state.clickedHelpfulA) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${aID}/helpful`, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((results) => {
          console.log('helpful ', results);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ clickedHelpfulA: !this.state.clickedHelpfulA });
    }
  }

  helpfulACounterDisplay() {
    if (this.state.clickedHelpfulA) {
      return (<>{ this.props.answer.helpfulness }</>);
    }
    return (<>{ this.props.answer.helpfulness + 1 }</>);
  }

  clickReport() {
    const aID = this.props.answer.id;
    if (this.state.clickedReport) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${aID}/report`, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((results) => {
          console.log('reported ', results);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ clickedReport: !this.state.clickedReport });
    }
  }

  reportedDisplay() {
    if (this.state.clickedReport) {
      return <u className="clickable">Report</u>;
    }
    return <u className="highlight">Reported</u>;
  }

  render() {
    // console.log('answer view props ', this.props);
    return (
      <>
        <span className="answer-list">{this.props.answer.body}</span>
        <div className="answer-footer">
          <span>
            by
            {' '}
            {this.props.answer.answerer_name === 'Seller' ?
              <b>{this.props.answer.answerer_name}</b> : <>{this.props.answer.answerer_name}</>}
          </span>
          <span>
            ,&ensp;{new Date(this.props.answer.date).toLocaleString().split(',')[0]}
          </span>
          <span>&emsp;|&emsp;Helpful?</span>
          <span className="clickable" onClick={this.clickHelpfulA}>&ensp;<u>Yes</u>&nbsp;</span>
          <span>({this.helpfulACounterDisplay()})&emsp;|&emsp;</span>
          <span onClick={this.clickReport}>{this.reportedDisplay()}</span>
        </div>
      </>
    );
  }
}

export default AnswersView;
// {console.log('answer ', this.props.answer)}
// {console.log('answers in AV ', this.props.answer)}
