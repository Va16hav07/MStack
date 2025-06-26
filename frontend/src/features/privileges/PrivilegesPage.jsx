import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrivileges, createPrivilege, updatePrivilege } from '../../store/slices/privilegesSlice';
import { useForm } from 'react-hook-form';

const PrivilegesPage = () => {
  const dispatch = useDispatch();
  const { privileges, loading, error } = useSelector((state) => state.privileges);
  const [editPriv, setEditPriv] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user?.tenant_id) {
      dispatch(fetchPrivileges(user.tenant_id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    if (editPriv) {
      setValue('name', editPriv.name);
      setValue('description', editPriv.description);
      setValue('resource', editPriv.resource);
    } else {
      reset();
    }
  }, [editPriv, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (editPriv) {
        await dispatch(updatePrivilege({ id: editPriv.id, data })).unwrap();
        setToast('Privilege updated!');
        setEditPriv(null);
      } else {
        await dispatch(createPrivilege(data)).unwrap();
        setToast('Privilege created!');
        reset();
      }
    } catch (err) {
      setToast(err || 'Operation failed');
    }
  };

  const handleEdit = (priv) => setEditPriv(priv);
  // Delete logic can be added if you have a deletePrivilege thunk

  return (
    <div className="privileges-page">
      <h2>Privileges</h2>
      {toast && <div className="toast">{toast}</div>}
      {loading && <div className="skeleton">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {privileges.map((priv) => (
          <li key={priv.id}>
            {priv.name} ({priv.description})
            <button onClick={() => handleEdit(priv)} style={{marginLeft: 8}}>Edit</button>
          </li>
        ))}
      </ul>
      <h3>{editPriv ? 'Edit Privilege' : 'Add Privilege'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: 16}}>
        <input placeholder="Name" {...register('name', { required: 'Name required' })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input placeholder="Description" {...register('description')} />
        <input placeholder="Resource" {...register('resource', { required: 'Resource required' })} />
        {errors.resource && <span className="error">{errors.resource.message}</span>}
        <button type="submit" disabled={loading} style={{marginLeft: 8}}>
          {editPriv ? 'Update' : 'Add'}
        </button>
        {editPriv && <button type="button" onClick={() => setEditPriv(null)} style={{marginLeft: 4}}>Cancel</button>}
      </form>
    </div>
  );
};

export default PrivilegesPage; 