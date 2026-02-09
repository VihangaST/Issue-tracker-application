import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
  },
  setFormData: (newFormData) => set({ formData: newFormData }),
  resetFormData: () => set({
    formData: {
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
    },
  }),
}));

export default useFormStore;
