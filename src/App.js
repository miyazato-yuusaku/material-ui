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
      item: '',
      rist: ''
    }
    this.apikey = 'd44820a99e565793f96bb49913a3135f'
  }

  handleupdate (e) {
    const index = e.target.dataset.optionIndex
    const data = this.state.items[index].areacode_s
    this.setState({ item: data })
    this.searchData()
    console.log(data)
  }

  async setData () {
    const getJSON = uri =>
      window
        .fetch(uri)
        .then(res => res.json())
        .then(json => json.garea_small)

    const uri = 'https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/?'
    const params = `keyid=${this.apikey}&lang=ja`
    const data = await getJSON(uri + params)
    this.setState({ items: data })
  }

  async searchData () {
    const getJSON = uri =>
      window
        .fetch(uri)
        .then(res => res.json())
        .then(json => json.rest)
        .then(json => json[0].name)

    const uri = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?'
    const params = `keyid=${this.apikey}&areacode_s=${this.state.item}`
    const data = await getJSON(uri + params)
    this.setState({ rist: data })
  }

  componentDidMount () {
    this.setData()
  }

  //  componentDidMount () {
  //    getJSON(
  //      'https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/?keyid=d44820a99e565793f96bb49913a3135f&lang=ja'
  //    )
  //      .then(json => json.garea_small)
  //      .then(json => this.setState({ items: json }))
  //  }

  render () {
    console.log(this.state.rist)
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
          <ListView rist={this.state.rist} />
        </CardContent>
      </Card>
    )
  }
}

const ListView = props => {
  const data = props.rist
  return (
    <List>
      <ListItem>
        <ListItemText primary={data} />
      </ListItem>
    </List>
  )
}

// const getJSON = async uri => {
//  const result = await window.fetch(uri).then(res => res.json())
//  return result
// }

// const getJson = (uri, params, options) => {
//  const result = window.fetch(uri + params, options).then(res => res.json())
//  return result
// }

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
