import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLegalEntities, createLegalEntity, updateLegalEntity, deleteLegalEntity } from '../../store/slices/legalEntitiesSlice';
import { useForm } from 'react-hook-form';

const LegalEntitiesPage = () => {
  const dispatch = useDispatch();
  const { legalEntities, loading, error } = useSelector((state) => state.legalEntities);
  const [editEntity, setEditEntity] = useState(null);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { user } = useSelector(state => state.auth);

  // Use default tenant ID if no user is logged in
  const tenantId = user?.tenant_id || 'a891264e-450c-41ac-ad72-7fe11fedd092';

  useEffect(() => {
    dispatch(fetchLegalEntities(tenantId));
  }, [dispatch, tenantId]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    if (editEntity) {
      setValue('name', editEntity.name);
      setValue('legal_name', editEntity.legal_name);
      setValue('legal_entity_type', editEntity.legal_entity_type);
      setValue('address', editEntity.address);
      setValue('incorporation_date', editEntity.incorporation_date ? editEntity.incorporation_date.substring(0, 10) : '');
      setValue('is_default', editEntity.is_default);
      setValue('registration_number', editEntity.registration_number);
      setValue('tax_identifier', editEntity.tax_identifier);
      setValue('jurisdiction_country', editEntity.jurisdiction_country);
      setValue('functional_currency', editEntity.functional_currency);
      setShowForm(true);
    } else {
      reset();
    }
  }, [editEntity, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (editEntity) {
        await dispatch(updateLegalEntity({ tenantId: tenantId, id: editEntity.id, data })).unwrap();
        setToast('Legal entity updated successfully!');
        setEditEntity(null);
        setShowForm(false);
      } else {
        await dispatch(createLegalEntity({ tenantId: tenantId, data })).unwrap();
        setToast('Legal entity created successfully!');
        reset();
        setShowForm(false);
      }
    } catch (err) {
      setToast(err || 'Operation failed');
    }
  };

  const handleEdit = (entity) => setEditEntity(entity);
  const handleDelete = async (entity) => {
    if (window.confirm('Are you sure you want to delete this legal entity?')) {
      try {
        await dispatch(deleteLegalEntity({ tenantId: tenantId, id: entity.id })).unwrap();
        setToast('Legal entity deleted successfully!');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Entities Management</h1>
          <p className="text-gray-600">Manage your legal entities and company registrations</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => {
            setEditEntity(null);
            reset();
            setShowForm(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add New Legal Entity
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
          <div className="stats-card-value">{legalEntities.length}</div>
          <div className="stats-card-label">Total Legal Entities</div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-card-icon bg-gradient-to-br from-green-500 to-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"/>
              </svg>
            </div>
            <div className="stats-card-change positive">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
              +8%
            </div>
          </div>
          <div className="stats-card-value">{legalEntities.filter(e => e.is_default).length}</div>
          <div className="stats-card-label">Default Entities</div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-card-icon bg-gradient-to-br from-purple-500 to-purple-600">
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
          <div className="stats-card-value">{legalEntities.filter(e => e.legal_entity_type === 'Inactive').length}</div>
          <div className="stats-card-label">Inactive Entities</div>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="card mb-8 animate-fade-in">
          <div className="card-header flex justify-between items-center">
            <h3 className="card-title">{editEntity ? 'Edit Legal Entity' : 'Add New Legal Entity'}</h3>
            <button 
              onClick={() => {
                setShowForm(false);
                setEditEntity(null);
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
                <label className="form-label">Name *</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter entity name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Legal Name *</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter legal name"
                  {...register('legal_name', { required: 'Legal name is required' })}
                />
                {errors.legal_name && <span className="form-error">{errors.legal_name.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Type *</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter entity type"
                  {...register('legal_entity_type', { required: 'Type is required' })}
                />
                {errors.legal_entity_type && <span className="form-error">{errors.legal_entity_type.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter address"
                  {...register('address')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Incorporation Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  {...register('incorporation_date')}
                />
              </div>
              <div className="form-group flex items-center gap-2 mt-6">
                <input type="checkbox" {...register('is_default')} className="form-checkbox" />
                <label className="form-label mb-0">Default</label>
              </div>
              <div className="form-group">
                <label className="form-label">Registration Number</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter registration number"
                  {...register('registration_number')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tax Identifier</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter tax identifier"
                  {...register('tax_identifier')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Jurisdiction Country</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter jurisdiction country"
                  {...register('jurisdiction_country')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Functional Currency</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Enter functional currency"
                  {...register('functional_currency')}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditEntity(null);
                  reset();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (editEntity ? 'Update Entity' : 'Create Entity')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Legal Entities List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Legal Entities</h3>
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
          ) : legalEntities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="mx-auto" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No legal entities found</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first legal entity</p>
              <button 
                onClick={() => {
                  setEditEntity(null);
                  reset();
                  setShowForm(true);
                }}
                className="btn-primary"
              >
                Create First Legal Entity
              </button>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Legal Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Registration #</th>
                    <th>Tax ID</th>
                    <th>Jurisdiction</th>
                    <th>Currency</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {legalEntities.map((entity) => (
                    <tr key={entity.id}>
                      <td>
                        <div className="font-medium text-gray-900">{entity.name}</div>
                      </td>
                      <td>
                        <div className="text-gray-600">{entity.legal_name}</div>
                      </td>
                      <td>
                        <span className="badge badge-primary">{entity.legal_entity_type}</span>
                      </td>
                      <td>
                        {entity.is_default ? <span className="badge badge-success">Yes</span> : <span className="badge badge-error">No</span>}
                      </td>
                      <td>{entity.registration_number}</td>
                      <td>{entity.tax_identifier}</td>
                      <td>{entity.jurisdiction_country}</td>
                      <td>{entity.functional_currency}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(entity)}
                            className="btn-sm btn-secondary"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(entity)}
                            className="btn-sm btn-danger"
                          >
                            Delete
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

export default LegalEntitiesPage; 