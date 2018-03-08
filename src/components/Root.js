import React from 'react'

class Root extends React.Component {
  constructor (props) {
    super(props)

    this.state = {value: 'initial state'}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    console.log(e.target.value)
    this.setState({value: e.target.value})
  }

  render () {
    return (
      <div>
        <input type="text" value={this.state.value} style={{border: '1px solid red'}} onChange={this.handleChange}/>
        {this.state.value}
      </div>
    )
  }
}

export default Root
