import './UserItem.css'
export const UserItem = (props) =>{
  return (
    <li className='user-item'>
      <div className='user-item__content'>
        <div className='user-item__image'>
          <img src={props.image} alt={props.name}></img>
        </div>
      </div>
    </li>
  )

} 