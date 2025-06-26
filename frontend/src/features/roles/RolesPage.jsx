import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRolesStart, fetchRolesSuccess, fetchRolesFailure,
  createRoleStart, createRoleSuccess, createRoleFailure,
  updateRoleStart, updateRoleSuccess, updateRoleFailure,
  deleteRoleStart, deleteRoleSuccess, deleteRoleFailure
} from '../../store/slices/rolesSlice';
import { getRoles, createRole, updateRole, deleteRole } from '../../api/mockApi';
import { useForm } from 'react-hook-form';

const RolesPage = () => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.roles);
  const [editRole, setEditRole] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchRolesStart());
    getRoles()
      .then((res) => dispatch(fetchRolesSuccess(res.data)))
      .catch(() => dispatch(fetchRolesFailure('Failed to load roles')));
  }, [dispatch]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    if (editRole) {
      setValue('name', editRole.name);
      setValue('description', editRole.description);
    } else {
      reset();
    }
  }, [editRole, setValue, reset]);

  const onSubmit = async (data) => {
    if (editRole) {
      dispatch(updateRoleStart());
      updateRole(editRole.id, data)
        .then((res) => {
          if (res.success) {
            dispatch(updateRoleSuccess(res.data));
            setToast('Role updated!');
            setEditRole(null);
          } else {
            dispatch(updateRoleFailure(res.error));
            setToast(res.error || 'Update failed');
          }
        })
        .catch(() => {
          dispatch(updateRoleFailure('Update failed'));
          setToast('Update failed');
        });
    } else {
      dispatch(createRoleStart());
      createRole(data)
        .then((res) => {
          if (res.success) {
            dispatch(createRoleSuccess(res.data));
            setToast('Role created!');
            reset();
          } else {
            dispatch(createRoleFailure(res.error));
            setToast(res.error || 'Create failed');
          }
        })
        .catch(() => {
          dispatch(createRoleFailure('Create failed'));
          setToast('Create failed');
        });
    }
  };

  const handleEdit = (role) => setEditRole(role);
  const handleDelete = (role) => setShowDelete(role);
  const confirmDelete = () => {
    if (!showDelete) return;
    dispatch(deleteRoleStart());
    deleteRole(showDelete.id)
      .then((res) => {
        if (res.success) {
          dispatch(deleteRoleSuccess(res.data));
          setToast('Role deleted!');
        } else {
          dispatch(deleteRoleFailure(res.error));
          setToast(res.error || 'Delete failed');
        }
        setShowDelete(null);
      })
      .catch(() => {
        dispatch(deleteRoleFailure('Delete failed'));
        setToast('Delete failed');
        setShowDelete(null);
      });
  };

  return (
    <div className="roles-page">
      <h2>Roles</h2>
      {toast && <div className="toast">{toast}</div>}
      {loading && <div className="skeleton">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} ({role.description})
            <button onClick={() => handleEdit(role)} style={{marginLeft: 8}}>Edit</button>
            <button onClick={() => handleDelete(role)} style={{marginLeft: 4, color: 'red'}}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{editRole ? 'Edit Role' : 'Add Role'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: 16}}>
        <input placeholder="Name" {...register('name', { required: 'Name required' })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input placeholder="Description" {...register('description')} />
        <button type="submit" disabled={loading} style={{marginLeft: 8}}>
          {editRole ? 'Update' : 'Add'}
        </button>
        {editRole && <button type="button" onClick={() => setEditRole(null)} style={{marginLeft: 4}}>Cancel</button>}
      </form>
      {showDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete {showDelete.name}?</p>
            <button onClick={confirmDelete} style={{color: 'red'}}>Delete</button>
            <button onClick={() => setShowDelete(null)} style={{marginLeft: 4}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPage; 