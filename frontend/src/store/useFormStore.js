import { create } from "zustand";
import { BASE_URL } from "../config";

const useFormStore = create((set) => ({
  formData: {
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  },
  setFormData: (newFormData) => set({ formData: newFormData }),
  resetFormData: () =>
    set({
      formData: {
        title: "",
        description: "",
        status: "open",
        priority: "medium",
      },
    }),
  // isEdit: false,
  // setIsEdit: (value) => set({ isEdit: value }),
  // fetchIssues: async ({
  //   searchTerm = "",
  //   statusFilter = "",
  //   priorityFilter = "",
  //   currentPage = 1,
  //   pageSize = 10,
  //   setAllIssues,
  //   setTotalIssues,
  //   setShowModal,
  // }) => {
  //   try {
  //     const params = new URLSearchParams({
  //       searchTerm,
  //       statusFilter,
  //       priorityFilter,
  //       page: currentPage,
  //       pageSize,
  //     });
  //     const response = await fetch(
  //       `${BASE_URL}/api/issues/fetch?${params.toString()}`,
  //       {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       },
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       setAllIssues(data.issues);
  //       setTotalIssues(data.totalIssueCount || 0);
  //       if (setShowModal) setShowModal(false);
  //     } else {
  //       console.error("Failed to fetch issues:", data.message);
  //       alert("Failed to fetch issues: " + data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching issues:", error);
  //   }
  // },
}));

export default useFormStore;
