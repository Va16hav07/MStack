import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTenantsStart, fetchTenantsSuccess, fetchTenantsFailure,
  createTenantStart, createTenantSuccess, createTenantFailure,
  updateTenantStart, updateTenantSuccess, updateTenantFailure,
  deleteTenantStart, deleteTenantSuccess, deleteTenantFailure
} from '../../store/slices/tenantsSlice';
import { getTenants, createTenant, updateTenant, deleteTenant } from '../../api/mockApi';
import { useForm } from 'react-hook-form';

const TenantsPage = () => {
  const dispatch = useDispatch();
  const { tenants, loading, error } = useSelector((state) => state.tenants);
  const [editTenant, setEditTenant] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchTenantsStart());
    getTenants()
      .then((res) => dispatch(fetchTenantsSuccess(res.data)))
      .catch(() => dispatch(fetchTenantsFailure('Failed to load tenants')));
  }, [dispatch]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    if (editTenant) {
      setValue('name', editTenant.name);
      setValue('description', editTenant.description);
      setValue('email', editTenant.email);
      setValue('phone', editTenant.phone);
      setValue('website', editTenant.website);
      setValue('industry', editTenant.industry);
      setValue('annual_revenue', editTenant.annual_revenue);
      setValue('employee_count', editTenant.employee_count);
    } else {
      reset();
    }
  }, [editTenant, setValue, reset]);

  const onSubmit = async (data) => {
    if (editTenant) {
      dispatch(updateTenantStart());
      updateTenant(editTenant.id, data)
        .then((res) => {
          if (res.success) {
            dispatch(updateTenantSuccess(res.data));
            setToast('Tenant updated!');
            setEditTenant(null);
          } else {
            dispatch(updateTenantFailure(res.error));
            setToast(res.error || 'Update failed');
          }
        })
        .catch(() => {
          dispatch(updateTenantFailure('Update failed'));
          setToast('Update failed');
        });
    } else {
      dispatch(createTenantStart());
      createTenant(data)
        .then((res) => {
          if (res.success) {
            dispatch(createTenantSuccess(res.data));
            setToast('Tenant created!');
            reset();
          } else {
            dispatch(createTenantFailure(res.error));
            setToast(res.error || 'Create failed');
          }
        })
        .catch(() => {
          dispatch(createTenantFailure('Create failed'));
          setToast('Create failed');
        });
    }
  };

  const handleEdit = (tenant) => setEditTenant(tenant);
  const handleDelete = (tenant) => setShowDelete(tenant);
  const confirmDelete = () => {
    if (!showDelete) return;
    dispatch(deleteTenantStart());
    deleteTenant(showDelete.id)
      .then((res) => {
        if (res.success) {
          dispatch(deleteTenantSuccess(res.data));
          setToast('Tenant deleted!');
        } else {
          dispatch(deleteTenantFailure(res.error));
          setToast(res.error || 'Delete failed');
        }
        setShowDelete(null);
      })
      .catch(() => {
        dispatch(deleteTenantFailure('Delete failed'));
        setToast('Delete failed');
        setShowDelete(null);
      });
  };

  return (
    <div className="tenants-page">
      <h2>Tenants</h2>
      {toast && <div className="toast">{toast}</div>}
      {loading && <div className="skeleton">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            {tenant.name} ({tenant.email})
            <button onClick={() => handleEdit(tenant)} style={{marginLeft: 8}}>Edit</button>
            <button onClick={() => handleDelete(tenant)} style={{marginLeft: 4, color: 'red'}}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{editTenant ? 'Edit Tenant' : 'Add Tenant'}</h3>
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
          {editTenant ? 'Update' : 'Add'}
        </button>
        {editTenant && <button type="button" onClick={() => setEditTenant(null)} style={{marginLeft: 4}}>Cancel</button>}
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

export default TenantsPage; 