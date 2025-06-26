import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPrivilegesStart, fetchPrivilegesSuccess, fetchPrivilegesFailure,
  createPrivilegeStart, createPrivilegeSuccess, createPrivilegeFailure,
  updatePrivilegeStart, updatePrivilegeSuccess, updatePrivilegeFailure,
  deletePrivilegeStart, deletePrivilegeSuccess, deletePrivilegeFailure
} from '../../store/slices/privilegesSlice';
import { getPrivileges, createPrivilege, updatePrivilege, deletePrivilege } from '../../api/mockApi';
import { useForm } from 'react-hook-form';

const PrivilegesPage = () => {
  const dispatch = useDispatch();
  const { privileges, loading, error } = useSelector((state) => state.privileges);
  const [editPriv, setEditPriv] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchPrivilegesStart());
    getPrivileges()
      .then((res) => dispatch(fetchPrivilegesSuccess(res.data)))
      .catch(() => dispatch(fetchPrivilegesFailure('Failed to load privileges')));
  }, [dispatch]);

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
    if (editPriv) {
      dispatch(updatePrivilegeStart());
      updatePrivilege(editPriv.id, data)
        .then((res) => {
          if (res.success) {
            dispatch(updatePrivilegeSuccess(res.data));
            setToast('Privilege updated!');
            setEditPriv(null);
          } else {
            dispatch(updatePrivilegeFailure(res.error));
            setToast(res.error || 'Update failed');
          }
        })
        .catch(() => {
          dispatch(updatePrivilegeFailure('Update failed'));
          setToast('Update failed');
        });
    } else {
      dispatch(createPrivilegeStart());
      createPrivilege(data)
        .then((res) => {
          if (res.success) {
            dispatch(createPrivilegeSuccess(res.data));
            setToast('Privilege created!');
            reset();
          } else {
            dispatch(createPrivilegeFailure(res.error));
            setToast(res.error || 'Create failed');
          }
        })
        .catch(() => {
          dispatch(createPrivilegeFailure('Create failed'));
          setToast('Create failed');
        });
    }
  };

  const handleEdit = (priv) => setEditPriv(priv);
  const handleDelete = (priv) => setShowDelete(priv);
  const confirmDelete = () => {
    if (!showDelete) return;
    dispatch(deletePrivilegeStart());
    deletePrivilege(showDelete.id)
      .then((res) => {
        if (res.success) {
          dispatch(deletePrivilegeSuccess(res.data));
          setToast('Privilege deleted!');
        } else {
          dispatch(deletePrivilegeFailure(res.error));
          setToast(res.error || 'Delete failed');
        }
        setShowDelete(null);
      })
      .catch(() => {
        dispatch(deletePrivilegeFailure('Delete failed'));
        setToast('Delete failed');
        setShowDelete(null);
      });
  };

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
            <button onClick={() => handleDelete(priv)} style={{marginLeft: 4, color: 'red'}}>Delete</button>
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

export default PrivilegesPage; 