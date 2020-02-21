import React from 'react'

// const getJSON = async (uri) => {
//  const result = await window.fetch(uri).then(res => res.json())
//  return result
// }

class pokemon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <getJSON item='https://pokeapi.co/api/v2/' />
      </div>
    )
  }
}

const getJSON = uri => {
  const result = window.fetch(uri.item).then(res => res.json())
  console.log(result)
  return result
}

export default pokemon
