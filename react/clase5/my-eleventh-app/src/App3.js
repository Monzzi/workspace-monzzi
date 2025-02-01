import React from 'react';

class App3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', selectedOption: 'coconut' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('Submitted: ' + this.state.value + ' ' + this.state.selectedOption);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea
            name="value"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Pick your favorite flavor:
          <select
            name="selectedOption"
            value={this.state.selectedOption}
            onChange={this.handleChange}
          >
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App3;
