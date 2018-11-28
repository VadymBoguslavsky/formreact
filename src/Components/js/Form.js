import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from './Modal';
import { FormErrors } from './FormErrors';
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      last: '',
      country: '',
      address: '',
      notes: '',
      email: '',
      isOpen: false,
      password: '',
      formErrors: { email: '', password: '', name: '', address: '', last: '' },
      emailValid: false,
      passwordValid: false,
      addressValid: false,
      lastValid: false,
      formValid: false,
      firstValid: false,
      gender: this.props.gender,
      value: 'coconut',
      birthday: new Date()
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setGender = this.setGender.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.toggleModal();
    console.log(
      e.target.name.value,
      e.target.last.value,
      e.target.address.value,
      e.target.notes.value
      )
      
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onChangeDueDate(e) {
    this.setState({
      birthday: e
    });
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ value: e.target.value });
  }
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let firstValid = this.state.firstValid;
    let lastValid = this.state.lastValid;
    let addressValid = this.state.addressValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'name':
        firstValid = value.length >= 3;
        fieldValidationErrors.name = firstValid ? '' : ' is too short';
        break;
      case 'address':
        addressValid = value.length >= 3;
        fieldValidationErrors.address = addressValid ? '' : ' is too short';
        break;
      case 'last':
        lastValid = value.length >= 3;
        fieldValidationErrors.last = lastValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      firstValid: firstValid,
      lastValid: lastValid,
      addressValid: addressValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState({ 
      formValid: 
        this.state.emailValid && 
        this.state.passwordValid && 
        this.state.firstValid && 
        this.state.lastValid && 
        this.state.addressValid  
    });
  }
  setGender = (e) => {
    this.setState({
      gender: e.target.value
    })
  }


  errorClass = (error) => {
    return (error.length === 0 ? '' : 'has-error');
  }
  render() {
    const { gender } = this.state
    return (
      <div className="form__wrapper">
        <form onSubmit={this.onSubmit} className='demoForm'>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div className="">
            <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
              <label className="control-label">First Name*</label>
              <input
                className="form-control"
                name="name"
                type="text"
                placeholder="Name"
                required={true}
                value={this.state.name}
                onChange={this.handleUserInput}
              />
            </div>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.last)}`}>
            <div className="form-input">
              <label className="control-label">Last name*</label>
              <input
                className="form-control"
                name="last"
                type="text"
                placeholder="last"
                required={true}
                value={this.state.last}
                onChange={this.handleUserInput} />
            </div>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
            <div className="form-input">
              <label className="control-label">Address*</label>
              <input
                className="form-control"
                name="address"
                type="text"
                placeholder="Address"
                required={true}
                value={this.state.address}
                onChange={this.handleUserInput} />
            </div>
          </div>

          <div className="form-group createlist">
            <div className="form-input">
              <label className="control-label">Notes</label>
              <textarea rows="1" cols="30"
                className="form-control lol"
                name="notes"
                type="text"
                placeholder="Notes"
                value={this.state.notes}
                onChange={this.onChange} />
            </div>
          </div>
          <p >Sex*</p>
          <div className='gender'>
            <input type="radio" checked={gender === "male"}
              onClick={this.setGender}
              onChange={this.setGender}
              required={true}
              value="male" /> Male
            <input type="radio"
              checked={gender === "female"}
              onClick={this.setGender}
              onChange={this.setGender}
              required={true}
              value="female" /> Female
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
            <label htmlFor='email'>Email address</label>
            <input type='email'
              value={this.state.email}
              className='form-control'
              onChange={this.handleUserInput}
              name='email' />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <label htmlFor='password'>Password</label>
            <input type='password'
              value={this.state.password}
              className='form-control'
              onChange={this.handleUserInput}
              name='password' />
          </div>
          <div className="form-group createlist"> 
            <div>Country*</div>
            <select value={this.state.value} onChange={this.onChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </div>
          <div className="form-group createlist">
            <div className="form-input">
              <label className="control-label">Birthday*</label>
              <br />
              <DatePicker
                selected={this.state.birthday}
                onChange={this.onChangeDueDate}
                className="form-control"

              />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary"  
                    disabled={!this.state.formValid} 
                    >
              Sign up
            </button>
            <Modal show={this.state.isOpen}
              onClose={this.toggleModal}>
              Here's some content for the modal
            </Modal>
          </div>
        </form>
        
      </div>
    )
  }

}
export default TaskForm;
