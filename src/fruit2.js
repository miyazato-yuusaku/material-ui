import React from 'react'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getJSON()
  }

  getJSON () {
    const URI = './fruit.json'
    const data = window
      .fetch(URI)
      .then(res => res.json())
      .then(json => json.fruit)
    this.setState({ items: data })
  }

  render () {
    console.log(this.state.items)
    return <div>test</div>
  }
}
export default App
