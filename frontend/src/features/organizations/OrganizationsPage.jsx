import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrganizationsStart, fetchOrganizationsSuccess, fetchOrganizationsFailure,
  createOrganizationStart, createOrganizationSuccess, createOrganizationFailure,
  updateOrganizationStart, updateOrganizationSuccess, updateOrganizationFailure,
  deleteOrganizationStart, deleteOrganizationSuccess, deleteOrganizationFailure
} from '../../store/slices/organizationsSlice';
import { getOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../../api/mockApi';
import { useForm } from 'react-hook-form';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { organizations, loading, error } = useSelector((state) => state.organizations);
  const [editOrg, setEditOrg] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchOrganizationsStart());
    getOrganizations()
      .then((res) => dispatch(fetchOrganizationsSuccess(res.data)))
      .catch(() => dispatch(fetchOrganizationsFailure('Failed to load organizations')));
  }, [dispatch]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    if (editOrg) {
      setValue('name', editOrg.name);
      setValue('description', editOrg.description);
      setValue('email', editOrg.email);
      setValue('phone', editOrg.phone);
      setValue('website', editOrg.website);
      setValue('industry', editOrg.industry);
      setValue('annual_revenue', editOrg.annual_revenue);
      setValue('employee_count', editOrg.employee_count);
    } else {
      reset();
    }
  }, [editOrg, setValue, reset]);

  const onSubmit = async (data) => {
    if (editOrg) {
      dispatch(updateOrganizationStart());
      updateOrganization(editOrg.id, data)
        .then((res) => {
          if (res.success) {
            dispatch(updateOrganizationSuccess(res.data));
            setToast('Organization updated!');
            setEditOrg(null);
          } else {
            dispatch(updateOrganizationFailure(res.error));
            setToast(res.error || 'Update failed');
          }
        })
        .catch(() => {
          dispatch(updateOrganizationFailure('Update failed'));
          setToast('Update failed');
        });
    } else {
      dispatch(createOrganizationStart());
      createOrganization(data)
        .then((res) => {
          if (res.success) {
            dispatch(createOrganizationSuccess(res.data));
            setToast('Organization created!');
            reset();
          } else {
            dispatch(createOrganizationFailure(res.error));
            setToast(res.error || 'Create failed');
          }
        })
        .catch(() => {
          dispatch(createOrganizationFailure('Create failed'));
          setToast('Create failed');
        });
    }
  };

  const handleEdit = (org) => setEditOrg(org);
  const handleDelete = (org) => setShowDelete(org);
  const confirmDelete = () => {
    if (!showDelete) return;
    dispatch(deleteOrganizationStart());
    deleteOrganization(showDelete.id)
      .then((res) => {
        if (res.success) {
          dispatch(deleteOrganizationSuccess(res.data));
          setToast('Organization deleted!');
        } else {
          dispatch(deleteOrganizationFailure(res.error));
          setToast(res.error || 'Delete failed');
        }
        setShowDelete(null);
      })
      .catch(() => {
        dispatch(deleteOrganizationFailure('Delete failed'));
        setToast('Delete failed');
        setShowDelete(null);
      });
  };

  return (
    <div className="organizations-page">
      <h2>Organizations</h2>
      {toast && <div className="toast">{toast}</div>}
      {loading && <div className="skeleton">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {organizations.map((org) => (
          <li key={org.id}>
            {org.name} ({org.email})
            <button onClick={() => handleEdit(org)} style={{marginLeft: 8}}>Edit</button>
            <button onClick={() => handleDelete(org)} style={{marginLeft: 4, color: 'red'}}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{editOrg ? 'Edit Organization' : 'Add Organization'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: 16}}>
        <input placeholder="Name" {...register('name', { required: 'Name required' })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input placeholder="Description" {...register('description')} />
        <input placeholder="Email" type="email" {...register('email', { required: 'Email required' })} />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <input placeholder="Phone" {...register('phone')} />
        <input placeholder="Website" {...register('website')} />
        <input placeholder="Industry" {...register('industry')} />
        <input placeholder="Annual Revenue" {...register('annual_revenue')} />
        <input placeholder="Employee Count" type="number" {...register('employee_count', { valueAsNumber: true })} />
        <button type="submit" disabled={loading} style={{marginLeft: 8}}>
          {editOrg ? 'Update' : 'Add'}
        </button>
        {editOrg && <button type="button" onClick={() => setEditOrg(null)} style={{marginLeft: 4}}>Cancel</button>}
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

export default OrganizationsPage; 