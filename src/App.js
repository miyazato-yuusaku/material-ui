import React from 'react'
import { Card, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  handleupdate (event) {
    const index = event.target.dateset.optionIndex
    const place = this.state.data[index]
    this.setstate({ name: place.name })
  }

  componentDidMount () {
    this.setState({
      data: [
        { name: 'yusaku', age: 25 },
        { name: 'omas', age: 52 }
      ]
    })
  }

  render () {
    return (
      <Card>
        <div>
          <SelectorView data={this.state.data} />
        </div>
        <div>
          <View name={this.state.data.name} />
        </div>
      </Card>
    )
  }
}

const View = props => {
  return <div>{props.name}</div>
}

const SelectorView = props => (
  <Autocomplete
    id='combo-box-demo'
    options={props.data}
    getOptionLabel={option => option.name}
    style={{ width: 300 }}
    renderInput={params => (
      <TextField {...params} label='Combo box' variant='outlined' fullWidth />
    )}
  />
)

export default App
