import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: {},
      item: ''
    }
    this.apikey = 'd44820a99e565793f96bb49913a3135f'
  }

  handleupdate (e) {
    const index = e.target.dataset.optionIndex
    const data = this.state.items[index].areacode_s
    this.setState({ item: data })
    console.log(data)
  }

  componentDidMount () {
    getJSON(
      'https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/?keyid=d44820a99e565793f96bb49913a3135f&lang=ja'
    )
      .then(json => json.garea_small)
      .then(json => this.setState({ items: json }))
  }

  render () {
    return (
      <Card>
        <CardHeader title='ぐるなび' />
        <CardActions>
          <SelectorView
            data={this.state.items}
            handleUpdate={this.handleupdate.bind(this)}
          />
        </CardActions>
        <CardContent>
          <ListView item={this.state.item} />
        </CardContent>
      </Card>
    )
  }
}

const ListView = props => {
  const data = props.item
  return (
    <List>
      <ListItem>
        <ListItemText primary={data} />
      </ListItem>
    </List>
  )
}

const getJSON = async uri => {
  const result = await window.fetch(uri).then(res => res.json())
  return result
}

const SelectorView = props => (
  <Autocomplete
    options={props.data}
    getOptionLabel={option => option.areaname_s}
    renderInput={params => (
      <TextField
        {...params}
        label='Choose a location'
        variant='outlined'
        style={{ width: 300 }}
        fullWidth
      />
    )}
    onChange={props.handleUpdate}
  />
)

export default App
