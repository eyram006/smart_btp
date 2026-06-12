import { useState, useEffect } from 'react';
import { stepService } from '../services/stepService';

/**
 * Hook personnalisé gérant la logique métier des étapes d'un chantier.
 * @param {string|number} chantierId - ID du chantier actif
 * @returns {Object} États et méthodes CRUD/filtrage
 */
export default function useSteps(chantierId) {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Charger les étapes
  const fetchSteps = async () => {
    if (!chantierId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await stepService.getSteps(chantierId);
      setSteps(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de récupérer les étapes du chantier.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, [chantierId]);

  // Ajouter une étape
  const addStep = async (stepData) => {
    setLoading(true);
    try {
      const response = await stepService.createStep(chantierId, stepData);
      setSteps((prev) => [...prev, response.data]);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        errors: err.response?.data?.errors || { general: [err.response?.data?.message || "Une erreur est survenue."] } 
      };
    } finally {
      setLoading(false);
    }
  };

  // Modifier une étape
  const updateStep = async (stepId, stepData) => {
    setLoading(true);
    try {
      const response = await stepService.updateStep(stepId, stepData);
      setSteps((prev) => prev.map((s) => (s.id === stepId ? response.data : s)));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        errors: err.response?.data?.errors || { general: [err.response?.data?.message || "Une erreur est survenue."] } 
      };
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une étape
  const deleteStep = async (stepId) => {
    setLoading(true);
    try {
      await stepService.deleteStep(stepId);
      setSteps((prev) => prev.filter((s) => s.id !== stepId));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || "Impossible de supprimer l'étape." 
      };
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les étapes par recherche (nom ou type)
  const filteredSteps = steps.filter((step) => {
    const query = searchQuery.toLowerCase();
    const nomMatch = step.nom?.toLowerCase().includes(query);
    const typeMatch = step.type?.toLowerCase().includes(query);
    return nomMatch || typeMatch;
  });

  return {
    steps: filteredSteps,
    rawSteps: steps,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    fetchSteps,
    addStep,
    updateStep,
    deleteStep,
  };
}
