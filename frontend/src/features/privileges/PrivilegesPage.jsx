import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrivileges, createPrivilege, updatePrivilege } from '../../store/slices/privilegesSlice';
import { useForm } from 'react-hook-form';

const PrivilegesPage = () => {
  const dispatch = useDispatch();
  const { privileges, loading, error } = useSelector((state) => state.privileges);
  const [editPriv, setEditPriv] = useState(null);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { user } = useSelector(state => state.auth);

  // Use default tenant ID if no user is logged in
  const tenantId = user?.tenant_id || 'a891264e-450c-41ac-ad72-7fe11fedd092';

  useEffect(() => {
    dispatch(fetchPrivileges(tenantId));
  }, [dispatch, tenantId]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    if (editPriv) {
      setValue('name', editPriv.name);
      setValue('description', editPriv.description);
      setValue('resource', editPriv.resource);
      setShowForm(true);
    } else {
      reset();
    }
  }, [editPriv, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (editPriv) {
        await dispatch(updatePrivilege({ tenantId: tenantId, id: editPriv.id, data })).unwrap();
        setToast('Privilege updated successfully!');
        setEditPriv(null);
        setShowForm(false);
      } else {
        await dispatch(createPrivilege({ tenantId: tenantId, data })).unwrap();
        setToast('Privilege created successfully!');
        reset();
        setShowForm(false);
      }
    } catch (err) {
      setToast(err || 'Operation failed');
    }
  };

  const handleEdit = (priv) => setEditPriv(priv);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privileges Management</h1>
          <p className="text-gray-600">Manage system permissions and access controls</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => {
            setEditPriv(null);
            reset();
            setShowForm(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add New Privilege
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-card-icon bg-gradient-to-br from-blue-500 to-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              </svg>
            </div>
            <div className="stats-card-change positive">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
              +15%
            </div>
          </div>
          <div className="stats-card-value">{privileges.length}</div>
          <div className="stats-card-label">Total Privileges</div>
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
              +10%
            </div>
          </div>
          <div className="stats-card-value">{privileges.filter(p => p.resource === 'users').length}</div>
          <div className="stats-card-label">User Privileges</div>
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
              +12%
            </div>
          </div>
          <div className="stats-card-value">{privileges.filter(p => p.resource === 'organizations').length}</div>
          <div className="stats-card-label">Org Privileges</div>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="card mb-8 animate-fade-in">
          <div className="card-header flex justify-between items-center">
            <h3 className="card-title">{editPriv ? 'Edit Privilege' : 'Add New Privilege'}</h3>
            <button 
              onClick={() => {
                setShowForm(false);
                setEditPriv(null);
                reset();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Privilege Name *</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter privilege name"
                  {...register('name', { required: 'Privilege name is required' })}
                />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Resource *</label>
                <select 
                  className="form-input"
                  {...register('resource', { required: 'Resource is required' })}
                >
                  <option value="">Select a resource</option>
                  <option value="users">Users</option>
                  <option value="organizations">Organizations</option>
                  <option value="roles">Roles</option>
                  <option value="privileges">Privileges</option>
                  <option value="tenants">Tenants</option>
                  <option value="legal-entities">Legal Entities</option>
                </select>
                {errors.resource && <span className="form-error">{errors.resource.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-input"
                rows="3"
                placeholder="Enter privilege description"
                {...register('description')}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditPriv(null);
                  reset();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (editPriv ? 'Update Privilege' : 'Create Privilege')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Privileges List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Privileges</h3>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton h-16 rounded-lg"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="mx-auto mb-4" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
              </div>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : privileges.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="mx-auto" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No privileges found</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first privilege</p>
              <button 
                onClick={() => {
                  setEditPriv(null);
                  reset();
                  setShowForm(true);
                }}
                className="btn-primary"
              >
                Create First Privilege
              </button>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Privilege Name</th>
                    <th>Resource</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {privileges.map((priv) => (
                    <tr key={priv.id}>
                      <td>
                        <div className="font-medium text-gray-900">{priv.name}</div>
                      </td>
                      <td>
                        <span className="badge badge-primary">{priv.resource}</span>
                      </td>
                      <td>
                        <div className="text-gray-600">{priv.description || 'No description'}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(priv)}
                            className="btn-sm btn-secondary"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivilegesPage; 