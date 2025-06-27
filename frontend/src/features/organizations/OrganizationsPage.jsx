import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../../store/slices/organizationsSlice';
import { useForm } from 'react-hook-form';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { organizations, loading, error } = useSelector((state) => state.organizations);
  const [editOrg, setEditOrg] = useState(null);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
      const t = setTimeout(() => setToast(null), 3000);
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
      setShowForm(true);
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
        setShowForm(false);
      } else {
        await dispatch(createOrganization({ tenantId: tenantId, data })).unwrap();
        setToast('Organization created!');
        reset();
        setShowForm(false);
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
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizations Management</h1>
          <p className="text-gray-600">Manage your organizations and branches</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => {
            setEditOrg(null);
            reset();
            setShowForm(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add New Organization
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg animate-fade-in">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-green-500 mr-2" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
            <span className="text-green-800 font-medium">{toast}</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-card-icon bg-gradient-to-br from-blue-500 to-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </div>
            <div className="stats-card-change positive">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
              +10%
            </div>
          </div>
          <div className="stats-card-value">{organizations.length}</div>
          <div className="stats-card-label">Total Organizations</div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-card-icon bg-gradient-to-br from-green-500 to-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
            </div>
            <div className="stats-card-change positive">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
              +8%
            </div>
          </div>
          <div className="stats-card-value">{organizations.filter(o => o.industry === 'Technology').length}</div>
          <div className="stats-card-label">Tech Orgs</div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-card-icon bg-gradient-to-br from-purple-500 to-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
              </svg>
            </div>
            <div className="stats-card-change positive">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
              +15%
            </div>
          </div>
          <div className="stats-card-value">{organizations.filter(o => o.industry === 'Finance').length}</div>
          <div className="stats-card-label">Finance Orgs</div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-card-icon bg-gradient-to-br from-yellow-500 to-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </div>
            <div className="stats-card-change negative">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="rotate-180" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
              -3%
            </div>
          </div>
          <div className="stats-card-value">{organizations.filter(o => o.status === 'inactive').length}</div>
          <div className="stats-card-label">Inactive Orgs</div>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="card mb-8 animate-fade-in">
          <div className="card-header flex justify-between items-center">
            <h3 className="card-title">{editOrg ? 'Edit Organization' : 'Add New Organization'}</h3>
            <button 
              onClick={() => {
                setShowForm(false);
                setEditOrg(null);
                reset();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <form className="card-body grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-label">Name</label>
              <input className="form-input" placeholder="Name" {...register('name', { required: 'Name required' })} />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>
            <div>
              <label className="form-label">Description</label>
              <input className="form-input" placeholder="Description" {...register('description')} />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input className="form-input" placeholder="Email" type="email" {...register('email', { required: 'Email required' })} />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input className="form-input" placeholder="Phone" {...register('phone')} />
            </div>
            <div>
              <label className="form-label">Website</label>
              <input className="form-input" placeholder="Website" {...register('website')} />
            </div>
            <div>
              <label className="form-label">Industry</label>
              <input className="form-input" placeholder="Industry" {...register('industry')} />
            </div>
            <div>
              <label className="form-label">Annual Revenue</label>
              <input className="form-input" placeholder="Annual Revenue" {...register('annual_revenue')} />
            </div>
            <div>
              <label className="form-label">Employee Count</label>
              <input className="form-input" placeholder="Employee Count" type="number" {...register('employee_count', { valueAsNumber: true })} />
            </div>
            <div className="md:col-span-2 flex gap-4 mt-4">
              <button type="submit" disabled={loading} className="btn-primary">
                {editOrg ? 'Update' : 'Add'}
              </button>
              {editOrg && <button type="button" onClick={() => setEditOrg(null)} className="btn-secondary">Cancel</button>}
            </div>
          </form>
        </div>
      )}

      {/* Organizations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div key={org.id} className="card group hover:shadow-2xl transition-all duration-200">
            <div className="card-header flex justify-between items-center">
              <div>
                <h3 className="card-title text-lg font-semibold text-gray-900">{org.name}</h3>
                <p className="text-gray-500 text-sm">{org.email}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(org)} className="btn-icon text-blue-500 hover:text-blue-700" title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a1.5 1.5 0 0 1 0 2.12l-1 1-2.12-2.12 1-1a1.5 1.5 0 0 1 2.12 0zM14.44 4.06 11.56 1.18 3 9.74V13h3.26l8.56-8.56z"/>
                  </svg>
                </button>
                <button onClick={() => handleDelete(org)} className="btn-icon text-red-500 hover:text-red-700" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm3 .5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0-.5.5V4h12v-.5a.5.5 0 0 0-.5-.5h-11z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="mb-2 text-gray-700 text-sm">{org.description}</div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span>Phone: {org.phone || '-'}</span>
                <span>Website: {org.website || '-'}</span>
                <span>Industry: {org.industry || '-'}</span>
                <span>Revenue: {org.annual_revenue || '-'}</span>
                <span>Employees: {org.employee_count || '-'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsPage; 