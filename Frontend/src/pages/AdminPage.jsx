import React, { useState, useEffect } from 'react';
import bcrypt from 'bcrypt';

const AddUserForm = ({ addUser }) => {
  const [newUser, setNewUser] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUser);
    setNewUser({ email: '', password: '' });
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const UserList = ({ users }) => {
  if (users.length === 0) {
    return <p>No users yet!</p>;
  }

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}
    </div>
  );
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/usuarios')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  const addUser = async (newUser) => {
    try {
      const { password } = newUser;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userWithHashedPassword = { ...newUser, password: hashedPassword };
  
      const response = await fetch('http://localhost:8000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userWithHashedPassword),
      });
  
      if (!response.ok) throw new Error('Error al crear el usuario');
  
      const newUserFromServer = await response.json();
      setUsers([...users, newUserFromServer]);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <h1>User Administration</h1>

      <AddUserForm addUser={addUser} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
};

export default AdminPage;
