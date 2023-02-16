import { UserItem } from './UserItem'
import Card from '../../shared/UIElements/Card'
import './UsersList.css'

export const UsersList = (props) =>{
if(props.items.length === 0){
  return (
    <div>
      <Card>
      <h2>No users found</h2>
      </Card>
    </div>
  )
}
return <ul className='users-list'>
  {props.items.map(user =>{
    return <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places}/>
  })}
</ul>
} 