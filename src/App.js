import React from 'react'
import './App.css'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Card } from '@material-ui/core'

const App = props => {
  const data = [
    { name: 'yusaku', age: 25 },
    { name: 'omas', age: 52 }
  ]
  return (
    <Card>
      <div>
        <Autocomplete
          id='combo-box-demo'
          options={data}
          getOptionLabel={option => option.name}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label='Combo box'
              variant='outlined'
              fullWidth
            />
          )}
        />
      </div>
    </Card>
  )
}

export default App
