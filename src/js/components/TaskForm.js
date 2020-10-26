import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTask } from '../actions/tasks';
import { toDateString } from '../util/DateUtil';

const initialState = {
  name: '',
  category: '',
  description: '',
  dueDate: '',
  reminderDate: ''
};

export class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.onInputChanged = this.onInputChanged.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChanged(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.addTask(this.state);
    this.setState(initialState);
  }

  isValidForm() {
    const { name, dueDate } = this.state;
    return name.length  && dueDate.length;
  }

  render() {
    const { name, description,dueDate } = this.state;
    const minDate = toDateString(Date.now());
    return (
      <section>
        <div className="card">
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group required">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={this.onInputChanged}
                  required
                />
              </div>
           
              <div className="form-group required">
                <label htmlFor="dueDate">Due date</label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  min={minDate}
                  value={dueDate}
                  onChange={this.onInputChanged}
                  required
                />
              </div>
           
              <div className="form-group">
                <label htmlFor="description" className="bmd-label-floating">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={this.onInputChanged}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block btn-raised"
                disabled={!this.isValidForm()}
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: task => dispatch(addTask(task))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TaskForm);
