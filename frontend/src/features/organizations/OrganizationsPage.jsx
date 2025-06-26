import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../../store/slices/organizationsSlice';
import { useForm } from 'react-hook-form';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { organizations, loading, error } = useSelector((state) => state.organizations);
  const [editOrg, setEditOrg] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { user } = useSelector(state => state.auth);

  // Use default tenant ID if no user is logged in
  const tenantId = user?.tenant_id || 'a891264e-450c-41ac-ad72-7fe11fedd092';

  // Debug logging
  console.log('OrganizationsPage - organizations:', organizations);
  console.log('OrganizationsPage - loading:', loading);
  console.log('OrganizationsPage - error:', error);
  console.log('OrganizationsPage - tenantId:', tenantId);

  useEffect(() => {
    console.log('OrganizationsPage - useEffect triggered, dispatching fetchOrganizations');
    dispatch(fetchOrganizations(tenantId));
  }, [dispatch, tenantId]);

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
    try {
      if (editOrg) {
        await dispatch(updateOrganization({ tenantId: tenantId, id: editOrg.id, data })).unwrap();
        setToast('Organization updated!');
        setEditOrg(null);
      } else {
        await dispatch(createOrganization({ tenantId: tenantId, data })).unwrap();
        setToast('Organization created!');
        reset();
      }
    } catch (err) {
      setToast(err || 'Operation failed');
    }
  };

  const handleEdit = (org) => setEditOrg(org);
  const handleDelete = async (org) => {
    if (window.confirm('Delete this organization?')) {
      try {
        await dispatch(deleteOrganization({ tenantId: tenantId, id: org.id })).unwrap();
        setToast('Organization deleted!');
      } catch (err) {
        setToast(err || 'Delete failed');
      }
    }
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
    </div>
  );
};

export default OrganizationsPage; 