import { create } from "zustand";
import { STATUS } from "../../constants";
import { apis } from "../../services/apis/api";
import { ErrorAlert, SuccessAlert } from "../../utils/Helper";
import { filter, includes, map } from "lodash";

export const useProjectStore = create((set, get) => ({
  resetProjectStatus: async () => {
    set({
      getProjectStatus: STATUS.NOT_STARTED,
      addProjectStatus: STATUS.NOT_STARTED,
      updateProjectStatus: STATUS.NOT_STARTED,
    });
  },

  getProjectAction: async (payload) => {
    set({ getProjectStatus: STATUS.FETCHING });
    const { data, ok } = await apis.getProjectApi(payload);
    if (ok) {
      set({
        projectData: data,
        getProjectStatus: STATUS.SUCCESS,
      });
    } else {
      set({ getProjectStatus: STATUS.FAILED });
    }
  },

  addProjectAction: async (payload) => {
    set({ addProjectStatus: STATUS.FETCHING });
    const { data, ok } = await apis.addProjectApi(payload);
    let previousData = get().projectData || [];
    if (ok) {
      set({
        projectData: [data, ...previousData],
        addProjectStatus: STATUS.SUCCESS,
      });
      SuccessAlert("Project Added Successfully");
    } else {
      set({ addProjectStatus: STATUS.FAILED });
      ErrorAlert((data && data.errorMessage) || "Something Went Wrong");
    }
  },

  updateProjectAction: async (payload) => {
    set({ updateProjectStatus: STATUS.FETCHING });
    const { data, ok } = await apis.updateProjectApi(payload);
    let previousData = get().projectData || [];
    if (ok) {
      const newData = map(previousData, (d) => (d._id == data?._id ? data : d));
      set({
        projectData: newData,
        updateProjectStatus: STATUS.SUCCESS,
      });
      SuccessAlert("Updated Successfully");
    } else {
      set({ updateProjectStatus: STATUS.FAILED });
      ErrorAlert((data && data.errorMessage) || "Something Went Wrong");
    }
  },
}));
