import React from 'react';
// Clase 5 código diapo 3 first
// function App() {
//   const students = ['Joe', 'Maria', 'Michel'];
//   const listStudents = students.map((student) => {
//     return <li>{student}</li>;
//   });
//   return <div className="App">{listStudents}</div>;
// }

// Clase 5 código diapo 3 second
// function App() {
//   const students = ['Joe', 'Maria', 'Michel'];
//   const listStudents = students.map((student, index) => {
//     return <li key={index}>{student}</li>;
//   });

//   return <div className="App">{listStudents}</div>;
// }

// Clase 5 código diapo 4
// function App() {
//   const students = [
//     { dni: '11111111A', name: 'Joe', date_of_birth: '1987-01-02' },
//     { dni: '22222222B', name: 'Maria', date_of_birth: '1989-01-02' },
//   ];

//   const listStudents = students.map((student, index) => {
//     return <li key={student.dni}>{student.name}</li>;
//   });
//   return (
//     <div className="App">
//       <ul>{listStudents}</ul>
//     </div>
//   );
// }

// Clase 5 código diapo 5
// const ListItem = ({ value }) => {
//   return <li>{value}</li>;
// };

// function App() {
//   const students = [
//     {
//       dni: '11111111A',
//       name: 'Joe',
//       date_of_birth: '1987-01-02',
//     },
//     {
//       dni: '22222222B',
//       name: 'Maria',
//       date_of_birth: '1989-01-02',
//     },
//   ];

//   const listStudents = students.map((student, index) => {
//     return (
//       <ListItem key={student.dni} dni={student.dni} value={student.name} />
//     );
//   });
//   return <div className="App">{listStudents}</div>;
// }

// Clase 5 código diapo 6
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: '' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }
//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }
//   render() {
//     //     return (
//     //       <form onSubmit={this.handleSubmit}>
//     //         <label>
//     //           Name:
//     //           <input
//     //             type="text"
//     //             value={this.state.value}
//     //             onChange={this.handleChange}
//     //           />
//     //         </label>
//     //         <input type="submit" value="Submit" />
//     //       </form>
//     //     );
//     //   }
//     // }

//     // Diapo 7 nuevo código cambia el return anterior

//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           No editable:
//           <input type="text" value="hi" />
//         </label>
//         <label>
//           Editable:
//           <input type="text" value={null} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// Clase 5 diapo 8
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: 'Hello there, this is some text in a text area',
      select: 'coconut',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    alert('tetxarea submitted: ' + this.state.textArea);
    alert('select submitted: ' + this.state.select);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Text area:
          <textarea
            value={this.state.textArea}
            name="textArea"
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Pick your favorite flavor:
          <select
            value={this.state.select}
            name="select"
            onChange={this.handleChange}
          >
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
