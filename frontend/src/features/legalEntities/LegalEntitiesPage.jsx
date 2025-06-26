import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLegalEntitiesStart, fetchLegalEntitiesSuccess, fetchLegalEntitiesFailure,
  createLegalEntityStart, createLegalEntitySuccess, createLegalEntityFailure,
  updateLegalEntityStart, updateLegalEntitySuccess, updateLegalEntityFailure,
  deleteLegalEntityStart, deleteLegalEntitySuccess, deleteLegalEntityFailure
} from '../../store/slices/legalEntitiesSlice';
import { getLegalEntities, createLegalEntity, updateLegalEntity, deleteLegalEntity } from '../../api/mockApi';
import { useForm } from 'react-hook-form';

const LegalEntitiesPage = () => {
  const dispatch = useDispatch();
  const { legalEntities, loading, error } = useSelector((state) => state.legalEntities);
  const [editEntity, setEditEntity] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchLegalEntitiesStart());
    getLegalEntities()
      .then((res) => dispatch(fetchLegalEntitiesSuccess(res.data)))
      .catch(() => dispatch(fetchLegalEntitiesFailure('Failed to load legal entities')));
  }, [dispatch]);

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
    if (editEntity) {
      dispatch(updateLegalEntityStart());
      updateLegalEntity(editEntity.id, data)
        .then((res) => {
          if (res.success) {
            dispatch(updateLegalEntitySuccess(res.data));
            setToast('Legal entity updated!');
            setEditEntity(null);
          } else {
            dispatch(updateLegalEntityFailure(res.error));
            setToast(res.error || 'Update failed');
          }
        })
        .catch(() => {
          dispatch(updateLegalEntityFailure('Update failed'));
          setToast('Update failed');
        });
    } else {
      dispatch(createLegalEntityStart());
      createLegalEntity(data)
        .then((res) => {
          if (res.success) {
            dispatch(createLegalEntitySuccess(res.data));
            setToast('Legal entity created!');
            reset();
          } else {
            dispatch(createLegalEntityFailure(res.error));
            setToast(res.error || 'Create failed');
          }
        })
        .catch(() => {
          dispatch(createLegalEntityFailure('Create failed'));
          setToast('Create failed');
        });
    }
  };

  const handleEdit = (entity) => setEditEntity(entity);
  const handleDelete = (entity) => setShowDelete(entity);
  const confirmDelete = () => {
    if (!showDelete) return;
    dispatch(deleteLegalEntityStart());
    deleteLegalEntity(showDelete.id)
      .then((res) => {
        if (res.success) {
          dispatch(deleteLegalEntitySuccess(res.data));
          setToast('Legal entity deleted!');
        } else {
          dispatch(deleteLegalEntityFailure(res.error));
          setToast(res.error || 'Delete failed');
        }
        setShowDelete(null);
      })
      .catch(() => {
        dispatch(deleteLegalEntityFailure('Delete failed'));
        setToast('Delete failed');
        setShowDelete(null);
      });
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

export default LegalEntitiesPage; 