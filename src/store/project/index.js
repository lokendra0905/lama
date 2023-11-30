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

  //   updateStaffAction: async (payload) => {
  //     set({ updateStaffStatus: STATUS.FETCHING });
  //     const { data, ok } = await apis.updateStaffApi(payload);
  //     let previousData = get().projectData || [];
  //     if (ok) {
  //       const updatedData =
  //         previousData && map(previousData, (d) => (data._id === d?._id ? data : d));
  //       set({
  //         updateStaffStatus: STATUS.SUCCESS,
  //         projectData: { ...previousData, docs: updatedData },
  //       });
  //       SuccessAlert((data && data.errorMessage) || "Staff Updated Successfully");
  //     } else {
  //       set({ updateStaffStatus: STATUS.FAILED });
  //       ErrorAlert((data && data.errorMessage) || "Something went Wrong");
  //     }
  //   },

  //   deleteStaffAction: async (payload) => {
  //     set({ deleteStaffStatus: STATUS.FETCHING });
  //     const { data, ok } = await apis.deleteStaffApi(payload);
  //     let previousData = get().projectData;
  //     if (ok) {
  //       const newData = previousData && filter(previousData?.docs, (d) => d._id !== payload.id);
  //       set({
  //         deleteStaffStatus: STATUS.SUCCESS,
  //         projectData: { ...previousData, docs: newData },
  //       });
  //       SuccessAlert((data && data.errorMessage) || "Staff Deleted Successfully");
  //     } else {
  //       set({ deleteStaffStatus: STATUS.FAILED });
  //       ErrorAlert(data && data.errorMessage);
  //     }
  //   },
}));
