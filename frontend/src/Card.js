export default React.createClass({
  clickHandler(e) {
    window.location = this.props.data.html_url;
  },
  render() {
    let data = this.props.data;
    let labels = data.labels.map(l => l.name);
    return (
      <div className="card" onClick={ this.clickHandler }>
        <h3>{ data.title }</h3>
        <span>{ labels.join(',') }</span>
      </div>
    )
  }
});
