import React, { Component } from 'react';
import './App.css'
import { students, instructor } from './data/Students'
import Student from './components/Student'


class App extends Component {

  state = {
    students,
    teacher: instructor,
    showStudents: false,
    showSchool: true,
    showProjects: false,
    githubData: {},
    apiFinished: false
  }

  showStudentsSection = () => {
    this.setState({
      showStudents: true,
      showSchool: false,
      showProjects: false
    })
  }

  showSchoolSection = () => {
    this.setState({
      showStudents: false,
      showSchool: true,
      showProjects: false
    })
  }

  showProjectsSection = () => {
    this.setState({
      showStudents: false,
      showSchool: false,
      showProjects: true
    })
  }

  componentDidMount(){
    fetch('https://api.github.com/users/marcllopis')
      .then(response => response.json())
      .then(data => this.setState({
        githubData: data,
        apiFinished: true
      }))
  }

  render() {
    console.log('render')
    return (
      <div>
        <nav>
          <div onClick={this.showStudentsSection}>
            Show students
          </div>
          <div onClick={this.showSchoolSection}>
            Show the school
          </div>
          <div onClick={this.showProjectsSection}>
            Show projects
          </div>
        </nav>

        {
          this.state.showStudents &&
          <div className='students-container'>
            {
              this.state.students.map((student, index) => (
                <Student key={index} user={student}/>
              ))
            }
          </div>
        }
        {
          this.state.showSchool &&
          <div>
            <h1>Show School</h1>
            {
              !this.state.apiFinished
                ? <h1>Loading.....</h1>
                : <h3>Data coming from the api: {this.state.githubData.name}</h3>
            }
          </div>

        }
        {
          this.state.showProjects &&
          <div>Show projects</div>
        }
      </div>
    );
  }
}

export default App;
