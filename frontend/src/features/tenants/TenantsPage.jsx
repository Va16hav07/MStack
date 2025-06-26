import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTenants,
  createTenant
} from '../../store/slices/tenantsSlice';
import { useForm } from 'react-hook-form';

const TenantsPage = () => {
  const dispatch = useDispatch();
  const { tenants, loading, error } = useSelector((state) => state.tenants);
  const [editTenant, setEditTenant] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchTenants());
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
      setToast('Update not implemented');
      setEditTenant(null);
    } else {
      try {
        await dispatch(createTenant(data)).unwrap();
        setToast('Tenant created!');
        reset();
      } catch (err) {
        setToast(err || 'Create failed');
      }
    }
  };

  const handleEdit = (tenant) => setEditTenant(tenant);
  const handleDelete = (tenant) => setShowDelete(tenant);
  const confirmDelete = () => {
    setToast('Delete not implemented');
    setShowDelete(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Tenants</h1>
        <button 
          className="btn btn-primary btn-sm flex items-center gap-1"
          onClick={() => {
            setEditTenant(null);
            reset();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add New Tenant
        </button>
      </div>
      
      {toast && <div className="toast toast-success">{toast}</div>}
      
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4">
              <div className="skeleton h-6 w-3/4 mb-2"></div>
              <div className="skeleton h-4 w-1/2 mb-1"></div>
              <div className="skeleton h-4 w-2/3 mb-4"></div>
              <div className="flex justify-end">
                <div className="skeleton h-8 w-16 mr-2"></div>
                <div className="skeleton h-8 w-16"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card bg-red-50">
          <div className="error">{error}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="card">
              <h3 className="font-medium text-lg">{tenant.name}</h3>
              <p className="text-neutral-500 text-sm mb-2">{tenant.email}</p>
              {tenant.description && <p className="text-neutral-600 mb-4">{tenant.description}</p>}
              <div className="mt-4 pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button 
                  onClick={() => handleEdit(tenant)} 
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(tenant)} 
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="card mt-8">
        <h2 className="mb-4">{editTenant ? 'Edit Tenant' : 'Add New Tenant'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" placeholder="Tenant name" {...register('name', { required: 'Name required' })} />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" placeholder="contact@example.com" type="email" {...register('email', { required: 'Email required' })} />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" placeholder="+1 (555) 123-4567" {...register('phone')} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Website</label>
              <input className="form-input" placeholder="https://example.com" {...register('website')} />
            </div>
            
            <div className="form-group md:col-span-2">
              <label className="form-label">Description</label>
              <input className="form-input" placeholder="Brief description of the tenant" {...register('description')} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Industry</label>
              <input className="form-input" placeholder="e.g. Technology, Healthcare" {...register('industry')} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Annual Revenue</label>
              <input className="form-input" placeholder="e.g. $1M" {...register('annual_revenue')} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Employee Count</label>
              <input className="form-input" placeholder="Number of employees" type="number" {...register('employee_count', { valueAsNumber: true })} />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            {editTenant && (
              <button 
                type="button" 
                onClick={() => setEditTenant(null)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary"
            >
              {editTenant ? 'Update Tenant' : 'Add Tenant'}
            </button>
          </div>
        </form>
      </div>
      
      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete <strong>{showDelete.name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDelete(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantsPage; 