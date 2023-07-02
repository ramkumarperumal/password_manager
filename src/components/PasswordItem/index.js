import './index.css'

const PasswordItem = props => {
  const {passwordData, checked, deletePassword} = props
  const {website, username, password, id, profileBgColor} = passwordData

  const websiteInitial = website[0].toUpperCase()

  const passwordElement = checked ? (
    <p className="password-text">{password}</p>
  ) : (
    <img
      className="mask-img"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  const deleteItem = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div style={{backgroundColor: profileBgColor}} className="initial-con">
        <h1 className="initial-heading">{websiteInitial}</h1>
      </div>
      <div className="password-text-con">
        <p className="website-text">{website}</p>
        <p className="username-text">{username}</p>
        {passwordElement}
      </div>
      <div className="delete-btn-container">
        <button
          data-testid="delete"
          className="delete-btn"
          type="button"
          onClick={deleteItem}
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
