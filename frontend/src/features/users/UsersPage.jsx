import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,
  createUserStart, createUserSuccess, createUserFailure,
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure
} from '../../store/slices/usersSlice';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/mockApi';
import { useForm } from 'react-hook-form';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [editUser, setEditUser] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchUsersStart());
    getUsers()
      .then((res) => dispatch(fetchUsersSuccess(res.data)))
      .catch(() => dispatch(fetchUsersFailure('Failed to load users')));
  }, [dispatch]);

  // Show toast for 2s
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Populate form for editing
  useEffect(() => {
    if (editUser) {
      setValue('first_name', editUser.first_name);
      setValue('last_name', editUser.last_name);
      setValue('email', editUser.email);
    } else {
      reset();
    }
  }, [editUser, setValue, reset]);

  const onSubmit = async (data) => {
    if (editUser) {
      dispatch(updateUserStart());
      updateUser(editUser.id, data)
        .then((res) => {
          if (res.success) {
            dispatch(updateUserSuccess(res.data));
            setToast('User updated!');
            setEditUser(null);
          } else {
            dispatch(updateUserFailure(res.error));
            setToast(res.error || 'Update failed');
          }
        })
        .catch(() => {
          dispatch(updateUserFailure('Update failed'));
          setToast('Update failed');
        });
    } else {
      dispatch(createUserStart());
      createUser(data)
        .then((res) => {
          if (res.success) {
            dispatch(createUserSuccess(res.data));
            setToast('User created!');
            reset();
          } else {
            dispatch(createUserFailure(res.error));
            setToast(res.error || 'Create failed');
          }
        })
        .catch(() => {
          dispatch(createUserFailure('Create failed'));
          setToast('Create failed');
        });
    }
  };

  const handleEdit = (user) => setEditUser(user);
  const handleDelete = (user) => setShowDelete(user);
  const confirmDelete = () => {
    if (!showDelete) return;
    dispatch(deleteUserStart());
    deleteUser(showDelete.id)
      .then((res) => {
        if (res.success) {
          dispatch(deleteUserSuccess(res.data));
          setToast('User deleted!');
        } else {
          dispatch(deleteUserFailure(res.error));
          setToast(res.error || 'Delete failed');
        }
        setShowDelete(null);
      })
      .catch(() => {
        dispatch(deleteUserFailure('Delete failed'));
        setToast('Delete failed');
        setShowDelete(null);
      });
  };

  return (
    <div className="users-page">
      <h2>Users</h2>
      {toast && <div className="toast">{toast}</div>}
      {loading && <div className="skeleton">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} ({user.email})
            <button onClick={() => handleEdit(user)} style={{marginLeft: 8}}>Edit</button>
            <button onClick={() => handleDelete(user)} style={{marginLeft: 4, color: 'red'}}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{editUser ? 'Edit User' : 'Add User'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: 16}}>
        <input placeholder="First Name" {...register('first_name', { required: 'First name required' })} />
        {errors.first_name && <span className="error">{errors.first_name.message}</span>}
        <input placeholder="Last Name" {...register('last_name', { required: 'Last name required' })} />
        {errors.last_name && <span className="error">{errors.last_name.message}</span>}
        <input placeholder="Email" type="email" {...register('email', { required: 'Email required' })} />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <button type="submit" disabled={loading} style={{marginLeft: 8}}>
          {editUser ? 'Update' : 'Add'}
        </button>
        {editUser && <button type="button" onClick={() => setEditUser(null)} style={{marginLeft: 4}}>Cancel</button>}
      </form>
      {showDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete {showDelete.first_name} {showDelete.last_name}?</p>
            <button onClick={confirmDelete} style={{color: 'red'}}>Delete</button>
            <button onClick={() => setShowDelete(null)} style={{marginLeft: 4}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage; 