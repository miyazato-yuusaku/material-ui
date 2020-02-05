import React from 'react'
import {
  Card,
  TextField,
  CardHeader,
  CardContent,
  CardActions
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      item: { name: '', age: 0 }
    }
  }

  handleUpdate (event) {
    const index = event.target.dateset.optionIndex
    const place = this.state.data[index]
    console.log(index)
    console.log(place)
    this.setstate({ item: { name: place.name } })
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
        <CardHeader title='list' />
        <CardActions>
          <SelectorView
            data={this.state.data}
            handleUpdate={this.handleUpdate.bind(this)}
          />
        </CardActions>
        <CardContent>
          <View name={this.state.item} />
        </CardContent>
      </Card>
    )
  }
}

const View = props => {
  const { name, age } = props.name
  return (
    <ul>
      <li>{name}</li>
      <li>{age}</li>
    </ul>
  )
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
