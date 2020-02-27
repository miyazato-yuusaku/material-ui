import React from 'react'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    getJSON('./fruit.json')
  }

  render () {
    console.log(this.state.items)
    return <div>test</div>
  }
}

const getJSON = uri => {
  const data = window
    .fetch(uri)
    .then(res => res.json())
    .then(json => json.fruits)
  this.setState({ items: data })
}

export default App
