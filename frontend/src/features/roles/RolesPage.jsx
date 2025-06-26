import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, createRole, updateRole, deleteRole } from '../../store/slices/rolesSlice';
import { useForm } from 'react-hook-form';

const RolesPage = () => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.roles);
  const [editRole, setEditRole] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { user } = useSelector(state => state.auth);

  // Use default tenant ID if no user is logged in
  const tenantId = user?.tenant_id || 'a891264e-450c-41ac-ad72-7fe11fedd092';

  useEffect(() => {
    dispatch(fetchRoles(tenantId));
  }, [dispatch, tenantId]);

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
    try {
      if (editRole) {
        await dispatch(updateRole({ tenantId: tenantId, id: editRole.id, data })).unwrap();
        setToast('Role updated!');
        setEditRole(null);
      } else {
        await dispatch(createRole({ tenantId: tenantId, data })).unwrap();
        setToast('Role created!');
        reset();
      }
    } catch (err) {
      setToast(err || 'Operation failed');
    }
  };

  const handleEdit = (role) => setEditRole(role);
  const handleDelete = async (role) => {
    if (window.confirm('Delete this role?')) {
      try {
        await dispatch(deleteRole({ tenantId: tenantId, id: role.id })).unwrap();
        setToast('Role deleted!');
      } catch (err) {
        setToast(err || 'Delete failed');
      }
    }
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
    </div>
  );
};

export default RolesPage; 