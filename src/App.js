import React from 'react'
import './App.css'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: {},
      item: '',
      rist: {
        name0: 'name',
        name1: 'name',
        name2: 'name',
        name3: 'name',
        name4: 'name'
      }
    }
    this.apikey = 'd44820a99e565793f96bb49913a3135f'
  }

  handleupdate (e) {
    const index = e.target.dataset.optionIndex
    const data = this.state.items[index].areacode_s
    this.searchData()
    this.setState({ item: data })
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
        .then(json => ({
          name0: json[0].url,
          name1: json[1].url,
          name2: json[2].url,
          name3: json[3].url,
          name4: json[4].url
        }))

    const uri = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?'
    const params = `keyid=${this.apikey}&areacode_s=${this.state.item}`
    const data = await getJSON(uri + params)
    this.setState({ rist: data })
  }

  componentDidMount () {
    this.setData()
  }

  render () {
    console.log(this.state.rist)
    return (
      <div>
        <h1>ぐるなび</h1>
        <p>
          <SelectorView
            data={this.state.items}
            handleUpdate={this.handleupdate.bind(this)}
          />
          <ListView rist={this.state.rist} />
        </p>
      </div>
    )
  }
}

const ListView = props => {
  const data = props.rist
  return (
    <ul>
      <li>
        <a target='_blank' href={data.name0}>
          {data.name0}
        </a>
      </li>
      <li>
        <a target='_blank' href={data.name1}>
          {data.name1}
        </a>
      </li>
      <li>
        <a target='_blank' href={data.name2}>
          {data.name2}
        </a>
      </li>
      <li>
        <a target='_blank' href={data.name3}>
          {data.name3}
        </a>
      </li>
      <li>
        <a target='_blank' href={data.name4}>
          {data.name4}
        </a>
      </li>
    </ul>
  )
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
