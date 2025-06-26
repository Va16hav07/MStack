import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLegalEntities, createLegalEntity, updateLegalEntity, deleteLegalEntity } from '../../store/slices/legalEntitiesSlice';
import { useForm } from 'react-hook-form';

const LegalEntitiesPage = () => {
  const dispatch = useDispatch();
  const { legalEntities, loading, error } = useSelector((state) => state.legalEntities);
  const [editEntity, setEditEntity] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { user } = useSelector(state => state.auth);

  // Use default tenant ID if no user is logged in
  const tenantId = user?.tenant_id || 'a891264e-450c-41ac-ad72-7fe11fedd092';

  useEffect(() => {
    dispatch(fetchLegalEntities(tenantId));
  }, [dispatch, tenantId]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
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
    } else {
      reset();
    }
  }, [editEntity, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (editEntity) {
        await dispatch(updateLegalEntity({ tenantId: tenantId, id: editEntity.id, data })).unwrap();
        setToast('Legal entity updated!');
        setEditEntity(null);
      } else {
        await dispatch(createLegalEntity({ tenantId: tenantId, data })).unwrap();
        setToast('Legal entity created!');
        reset();
      }
    } catch (err) {
      setToast(err || 'Operation failed');
    }
  };

  const handleEdit = (entity) => setEditEntity(entity);
  const handleDelete = async (entity) => {
    if (window.confirm('Delete this legal entity?')) {
      try {
        await dispatch(deleteLegalEntity({ tenantId: tenantId, id: entity.id })).unwrap();
        setToast('Legal entity deleted!');
      } catch (err) {
        setToast(err || 'Delete failed');
      }
    }
  };

  return (
    <div className="legal-entities-page">
      <h2>Legal Entities</h2>
      {toast && <div className="toast">{toast}</div>}
      {loading && <div className="skeleton">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {legalEntities.map((entity) => (
          <li key={entity.id}>
            {entity.name} ({entity.legal_name})
            <button onClick={() => handleEdit(entity)} style={{marginLeft: 8}}>Edit</button>
            <button onClick={() => handleDelete(entity)} style={{marginLeft: 4, color: 'red'}}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{editEntity ? 'Edit Legal Entity' : 'Add Legal Entity'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: 16}}>
        <input placeholder="Name" {...register('name', { required: 'Name required' })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input placeholder="Legal Name" {...register('legal_name', { required: 'Legal name required' })} />
        {errors.legal_name && <span className="error">{errors.legal_name.message}</span>}
        <input placeholder="Type" {...register('legal_entity_type', { required: 'Type required' })} />
        {errors.legal_entity_type && <span className="error">{errors.legal_entity_type.message}</span>}
        <input placeholder="Address" {...register('address')} />
        <input placeholder="Incorporation Date" type="date" {...register('incorporation_date')} />
        <label>
          <input type="checkbox" {...register('is_default')} /> Default
        </label>
        <input placeholder="Registration Number" {...register('registration_number')} />
        <input placeholder="Tax Identifier" {...register('tax_identifier')} />
        <input placeholder="Jurisdiction Country" {...register('jurisdiction_country')} />
        <input placeholder="Functional Currency" {...register('functional_currency')} />
        <button type="submit" disabled={loading} style={{marginLeft: 8}}>
          {editEntity ? 'Update' : 'Add'}
        </button>
        {editEntity && <button type="button" onClick={() => setEditEntity(null)} style={{marginLeft: 4}}>Cancel</button>}
      </form>
    </div>
  );
};

export default LegalEntitiesPage; 