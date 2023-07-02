import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    checked: false,
    searchInput: '',
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {website, username, password, passwordList} = this.state

    const colorList = [
      'red',
      'blue',
      'green',
      'teal',
      'rosybrown',
      'tan',
      'plum',
      'saddlebrown',
    ]
    const randColorIndex = Math.floor(Math.random() * colorList.length)
    const randColor = colorList[randColorIndex]
    if (website !== '' && username !== '' && password !== '') {
      const newPasswordItem = {
        id: uuidv4(),
        website,
        username,
        password,
        profileBgColor: randColor,
      }
      const updatedPassword = [...passwordList, newPasswordItem]
      this.setState({
        website: '',
        username: '',
        password: '',
        passwordList: updatedPassword,
      })
    }
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({checked: !prevState.checked}))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const updatedPassword = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: updatedPassword})
  }

  render() {
    const {
      searchInput,
      website,
      username,
      password,
      passwordList,
      checked,
    } = this.state
    console.log(searchInput)
    const width = window.innerWidth
    const filterPasswordList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(filterPasswordList)
    const passwordManagerImg =
      width < 768
        ? 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="add-password-container">
          <div className="img-container">
            <img
              className="password-img"
              src={passwordManagerImg}
              alt="password manager"
            />
          </div>
          <form className="form-container" onSubmit={this.addPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <div className="img-con">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </div>
              <input
                className="input"
                value={website}
                onChange={this.changeWebsite}
                type="text"
                placeholder="Enter Website"
              />
            </div>
            <div className="input-container">
              <div className="img-con">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                className="input"
                value={username}
                onChange={this.changeUsername}
                type="text"
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <div className="img-con">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </div>
              <input
                className="input"
                value={password}
                onChange={this.changePassword}
                type="password"
                placeholder="Enter Password"
              />
            </div>

            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="lower-part-container">
          <div className="password-search-container">
            <h1 className="your-password-heading">
              Your Passwords
              <p className="password-count">{passwordList.length}</p>
            </h1>
            <div className="search-container">
              <div className="search-img-container">
                <img
                  className="search-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                onChange={this.changeSearchInput}
                className="search-input"
                type="search"
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="hor-line" />
          <div className="show-pass-container">
            <input
              onClick={this.toggleCheckbox}
              id="password-checkbox"
              type="checkbox"
            />
            <label htmlFor="password-checkbox">Show Passwords</label>
          </div>
          {filterPasswordList.length === 0 ? (
            <div className="no-pass-con">
              <img
                className="no-pass-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="your-password-heading">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-container">
              {filterPasswordList.map(each => (
                <PasswordItem
                  key={each.id}
                  passwordData={each}
                  checked={checked}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
