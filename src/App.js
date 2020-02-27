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
        name0: { link: 'link', name: '' },
        name1: { link: 'link', name: '' },
        name2: { link: 'link', name: '' },
        name3: { link: 'link', name: '' },
        name4: { link: 'link', name: '' }
      }
    }
    this.apikey = ''
  }

  handleupdate (e) {
    const index = e.target.dataset.optionIndex
    const data = this.state.items[index].areacode_s
    this.searchData()
    this.setState({ item: data })
    console.log('handleupdate', data)
  }

  //  async setData () {
  //    const getJSON = uri =>
  //      window
  //        .fetch(uri)
  //        .then(res => res.json())
  //        .then(json => json.garea_small)
  //    const uri = 'https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/?'
  //    const params = `keyid=${this.apikey}&lang=ja`
  //    const data = await getJSON(uri + params)
  //    this.setState({ items: data })
  //  }

  async setData () {
    const uri =
      'https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/?keyid=d44820a99e565793f96bb49913a3135f&lang=ja'
    await window
      .fetch(uri)
      .then(res => res.json())
      .then(json => json.garea_small)
      .then(json => this.setState({ items: json }))
  }

  async searchData () {
    const getJSON = uri =>
      window
        .fetch(uri)
        .then(res => res.json())
        .then(json => json.rest)
        .then(json => ({
          name0: { link: json[0].url, name: json[0].name },
          name1: { link: json[1].url, name: json[1].name },
          name2: { link: json[2].url, name: json[2].name },
          name3: { link: json[3].url, name: json[3].name },
          name4: { link: json[4].url, name: json[4].name }
        }))

    const uri = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?'
    const params = `keyid=${this.apikey}&areacode_s=${this.state.item}`
    const data = await getJSON(uri + params)
    this.setState({ rist: data })
    console.log('searchdata')
  }

  componentDidMount () {
    this.setData()
  }

  render () {
    console.log(this.state.items)
    console.log(this.state.item)
    console.log(this.state.rist)
    return (
      <div>
        <h1>ぐるなび</h1>
        <h2>
          <SelectorView
            data={this.state.items}
            handleUpdate={this.handleupdate.bind(this)}
          />
          <ListView rist={this.state.rist} />
        </h2>
      </div>
    )
  }
}

const ListView = props => {
  const data = props.rist
  return (
    <ul>
      <li>
        <a href={data.name0.link}>{data.name0.name}</a>
      </li>
      <li>
        <a href={data.name1.link}>{data.name1.name}</a>
      </li>
      <li>
        <a href={data.name2.link}>{data.name2.name}</a>
      </li>
      <li>
        <a href={data.name3.link}>{data.name3.name}</a>
      </li>
      <li>
        <a href={data.name4.link}>{data.name4.name}</a>
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
