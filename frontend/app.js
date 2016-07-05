import data from './open-issue.js'
import IssueModal from './src/IssueModal.js'
import Board from './src/Board.js'
import React from 'react'
import ReactDOM from 'react-dom'

const token = '374eeab8f7d3ab3f5b566ddb5f8177b304a913e8';
const repo = 'harinsa/gikibi-board'

let mockMilestones = [
  {
    title: 'Todo',
    number: 1
  },
  {
    title: 'Doing',
    number: 2
  },
  {
    title: 'Done',
    number: 3
  }
]
require("./style.scss");
require("./node_modules/react-selectize/themes/default.css");

let App = React.createClass({
  getCardsForBoard(boardName) {
    const mapping = {
      'todo': ['queue'],
      'doing': ['doing'],
      'done': ['uat', 'done']
    }
    const validLabels = mapping[boardName];
    if (!validLabels) return [];
    
    return this.state.issues;
    return this.state.issues.filter((issue) => {
      const labels = issue.labels;
      const matchList = labels.map((label) => {
        return validLabels.indexOf(label.name.toLowerCase()) >= 0;
      });
      return matchList.indexOf(true) >= 0;
    })
  },
  
  addIssueHandler(e) {
    this.setState({showingIssueModal: true});
    console.log(this.state)
  },

  getInitialState() {
    return {
      boards: ['todo', 'doing', 'done'],
      showingIssueModal: false,
      currentIssue: null,
      milestones: [],
      issues: [],
      labels: []
    }
  },

  hideIssueModal() {
    this.setState({showingIssueModal: false});
  },

  componentDidMount() {
    this.getIssues()
    this.getMilestones()
    this.getLabels()
  },

  updateIssue(data) {

  },

  createIssue(issue) {
    // https://api.github.com/repos/harinsa/gikibi-board/issues
    let url = `https://api.github.com/repos/${this.props.repo}/issues`
    let request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Authorization', `token ${this.props.token}`);
    request.setRequestHeader('Content-type', 'applcation/json');
    request.onload = () => {
      if (request.status >= 200 && request.status < 400)
        this.setState({showingIssueModal: false});
    }

    let data = {
      title: issue.title,
      body: issue.body,
      assignee: issue.assignee,
      milestone: issue.milestones,
      labels: issue.labels,
    }

    Object.keys(data).forEach((key) => {
      if (data[key] === null) delete data[key];
    });
  
    request.send(JSON.stringify(data));
  },

  getIssues() {
    console.log('getting milestones')
    let request = new XMLHttpRequest()
    let url = `https://api.github.com/repos/${this.props.repo}/issues`

    request.open('GET', url, true);
    request.setRequestHeader('Authorization', `token ${this.props.token}`);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        this.setState({issues: data})
      } else {
        // We reached our target server, but it returned an error
        console.log('error return', this)
      }
    };
    request.onerror = () => {

    };
    request.send();
  },

  getMilestones() {
    console.log('getting milestones')
    let request = new XMLHttpRequest()
    let url = `https://api.github.com/repos/${this.props.repo}/labels`

    request.open('GET', url, true);
    request.setRequestHeader('Authorization', `token ${this.props.token}`);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        this.setState({labels: data})
      } else {
        // We reached our target server, but it returned an error
        console.log('error return', this)
      }
    };
    request.onerror = function() {

    };
    request.send();
  },

  getLabels() {
    console.log('getting labels')

    let request = new XMLHttpRequest()
    let url = `https://api.github.com/repos/${this.props.repo}/milestones`
    request.open('GET', url, true);
    request.setRequestHeader('Authorization', `token ${this.props.token}`);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        this.setState({milestones: data})

      } else {
        // We reached our target server, but it returned an error

      }
    };
    request.onerror = function() {
      console.log('err');
      console.log(this);
    };
    request.send();
  },

  render() {

    let nodes = this.state.boards.map((name) => {
      const cards = this.getCardsForBoard(name);
      return (
        <Board key={name} name={name} cards={cards} />
      )
    });
    return (
      <div className="app">
        <div className="menu">
          <button 
            name="add-issue"
            onClick={this.addIssueHandler}
            >Add Issue</button>
        </div>
        {nodes}
        <IssueModal 
          hidden={!this.state.showingIssueModal}
          createIssue={this.createIssue}
          issue={this.currentIssue}
          milestones={this.state.milestones}
          labels={this.state.labels}
          hideSelf={this.hideIssueModal}
          />
      </div>
    )
  }
});

console.log('test change');

ReactDOM.render(
  <App repo={repo} token={token}/>,
  document.querySelector('.app-container')
);