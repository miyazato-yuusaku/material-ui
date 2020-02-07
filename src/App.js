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
      placeName: {}
    }
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const place = this.state.data[index]
    console.log(index)
    console.log(place.name)
    this.setState({ placeName: place })
    console.log(this.state.placeName)
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
          <View item={this.state.placeName} />
        </CardContent>
      </Card>
    )
  }
}

const View = props => {
  const { name, age } = props.item
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
    onChange={props.handleUpdate}
  />
)

export default App
