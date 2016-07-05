
let data = [
  {id: 1, author: 'Pete Hunt', text: 'This is one comment'},
  {id: 2, author: "Jordan Walke", text: 'This is *another* comment'}
]

let CommentBox = React.createClass({
  render() {
    return (
      <div className="commentBox">
        <CommentList data={this.props.data}/>
        <CommentForm />
      </div>
    );
  }
});

let Comment = React.createClass({
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
      </div>
    )
  }
})

let CommentList = React.createClass({
  render() {
    let nodes = this.props.data.map((comment) => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {nodes}
      </div>
    )
  }
});

let CommentForm = React.createClass({
  render() {
    return (
      <div className="commentForm">
      Hello, world! I am a CommentForm.
      </div>
    )
  }
})


ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('example')
);
