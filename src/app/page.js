'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, TextField, Button } from '@mui/material';

const CRUDExample = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault(); // Evitar que se envíe automáticamente
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      setUsers([...users, response.data]);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleUpdate = async (userId, newData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, newData);
      const updatedUsers = users.map(user => user.id === userId ? { ...user, ...newData } : user);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleDelete = async userId => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Users</Typography>
      {users.map(user => (
        <Card key={user.id} style={{ marginBottom: '20px', padding: '20px' }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">{user.email} - {user.phone}</Typography>
          <Button onClick={() => handleDelete(user.id)} variant="contained" color="error" style={{ marginLeft: '10px' }}>Delete</Button>
          <UpdateUser user={user} onUpdate={handleUpdate} />
        </Card>
      ))}
      <Typography variant="h5" gutterBottom>Add User</Typography>
      <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '10px' }}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '10px' }}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '10px' }}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">Add User</Button>
      </form>
    </Container>
  );
};

const UpdateUser = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(user.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">Update</Button>
    </form>
  );
};

export default CRUDExample;
