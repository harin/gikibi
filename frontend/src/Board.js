import Card from './Card.js'

export default React.createClass({

  getDefaultProps() {
    return {
      cards: [],
      name: ''
    }
  },
  
  render() {
    let cards = this.props.cards.map((card) => {
      return (
        <Card 
          key={card.id} 
          data={card} />
      )
    });
    return (
      <div className="board">
        <h2>{this.props.name}({cards.length})</h2>
        {cards}
      </div>
    )
  }
});