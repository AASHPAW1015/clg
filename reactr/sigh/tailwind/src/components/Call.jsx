import { useEffect, useState } from 'React';

const Call = () => {
  const [users, useUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => setUsers(data));
  }, []);

  return (
    <>
      <div>
        <h2>Users List</h2>
        {users.map(user => <p key={user.id}>{user.name}</p>)}
      </div>
    </>
  );

}

export default Call
