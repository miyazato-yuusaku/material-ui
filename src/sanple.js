import React from 'react'
import sa from 'superagent'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { items: null }
  }

  async loadedJSON () {
    const getAPI = uri => window.fetch(uri).then(res => res.json())

    const URI = './fruit.json'
    const data = await getAPI(URI).then(json => json.fruits)

    this.setState({ items: data })
  }

  componentDidMount () {
    this.loadedJSON()
  }

  render () {
    const items = this.state.items
    return <Display items={items} />
  }
}

const Display = props => {
  if (!props.items) {
    return <div>now loading!</div>
  }
  const options = props.items.map(item => (
    <option value={item.price} key={item.name}>
      {item.name}
    </option>
  ))
  return (
    <label>
      fruite
      <select>{options}</select>
    </label>
  )
}

export default App
