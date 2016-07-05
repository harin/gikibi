import {SimpleSelect, MultiSelect} from 'react-selectize';

export default React.createClass({
  getInitialState(){
    return {
      title: null,
      body: null,
      milestones: null,
      labels: null,
      board: null,
      assignee: null,
      isNew: false
    }
  },

  getDefaultProps() {
    return {
      milestones: [],
      labels: [],
      boards: []
    }
  },


  backgroundClickHandler(e) {
    this.props.hideSelf()
  },

  formClickHandler(e) {
    e.stopPropagation();
  },

  submitHandler(e) {
    console.log(this.state);
    this.props.createIssue(this.state);
  },

  titleChangeHandler(e) {
    this.setState({title: e.target.value});
  },

  bodyChangeHandler(e) {
    this.setState({body: e.target.value});
  },

  assigneeChangeHandler(e) {
    this.setState({assignee: e.target.value})
  },

  milestonesChangeHandler(values) {
    this.setState({milestones: values.map(v => v.value)})
  },

  labelsChangeHandler(values) {
    console.log(values);
    this.setState({labels: values.map(v => v.value)})
  },

  boardChangeHandler(values) {
    this.setState({board: values.map(v => v.value)})
  },

  render() {
    if (this.props.hidden) {
      return null;
    }
    const labelOptions = this.props.labels.map((v) => {
      return {
        label: v.name,
        value: v.name
      }
    })
    const milestoneOptions = this.props.milestones.map((v) => {
      return {
        label: v.title,
        value: v.number
      }
    })

    return (
      <div className="issue-modal"
        onClick={ this.backgroundClickHandler }
        >
        <div className="form"
          onClick={ this.formClickHandler }>
          <input type="text"
            name="title" 
            placeholder="Title"
            onChange={ this.titleChangeHandler }/>
          <textarea name="content" 
            placeholder="Write something.."
            onChange={ this.bodyChangeHandler }></textarea>
          <MultiSelect
            placeholder="Labels"
            options={ labelOptions }
            onValuesChange={ this.labelsChangeHandler }
            >
          </MultiSelect>
          <MultiSelect
            placeholder="Boards"
            options={ labelOptions }
            onValuesChange={ this.boardChangeHandler }
            >
          </MultiSelect>
          <MultiSelect
            placeholder="Milestones"
            options={ milestoneOptions }
            onValuesChange={ this.milestonesChangeHandler }
            >
          </MultiSelect>
          <button name="submit"
            onClick={this.submitHandler}>
            { this.state.isNew? 'Create' : 'Save' }</button>
        </div>

      </div> 
    )
  }
})