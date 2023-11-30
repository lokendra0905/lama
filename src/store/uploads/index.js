import { create } from "zustand";
import { STATUS } from "../../constants";
import { apis } from "../../services/apis/api";
import { ErrorAlert, SuccessAlert } from "../../utils/Helper";
import { filter, map } from "lodash";

export const useUploadStore = create((set, get) => ({
  resetUploadStatus: async () => {
    set({
      addUploadStatus: STATUS.NOT_STARTED,
      updateUploadStatus: STATUS.NOT_STARTED,
      deleteUploadStatus: STATUS.NOT_STARTED,
    });
  },

  getAllUploadAction: async (payload) => {
    set({ getAllUploadStatus: STATUS.FETCHING });
    const { data, ok } = await apis.getAllUploadApi(payload);
    if (ok) {
      set({
        uploadData: data,
        getAllUploadStatus: STATUS.SUCCESS,
      });
    } else {
      set({ getAllUploadStatus: STATUS.FAILED });
    }
  },

  addUploadAction: async (payload) => {
    set({ addUploadStatus: STATUS.FETCHING });
    const { data, ok } = await apis.addUploadApi(payload);
    let previousData = get().uploadData || [];
    if (ok) {
      set({
        uploadData: [data, ...previousData],
        addUploadStatus: STATUS.SUCCESS,
      });
      SuccessAlert("Uploaded Successfully");
    } else {
      set({ addUploadStatus: STATUS.FAILED });
      ErrorAlert((data && data.errorMessage) || "Something Went Wrong");
    }
  },

  updateUploadAction: async (payload) => {
    set({ updateUploadStatus: STATUS.FETCHING });
    const { data, ok } = await apis.updateUploadApi(payload);
    let previousData = get().uploadData || [];
    if (ok) {
      const newData = map(previousData, (d) => (d._id == data?._id ? data : d));
      set({
        uploadData: newData,
        updateUploadStatus: STATUS.SUCCESS,
      });
      SuccessAlert("Updated Successfully");
    } else {
      set({ updateUploadStatus: STATUS.FAILED });
      ErrorAlert((data && data.errorMessage) || "Something Went Wrong");
    }
  },

  deleteUploadAction: async (payload) => {
    set({ deleteUploadStatus: STATUS.FETCHING });
    const { data, ok } = await apis.deleteUploadApi(payload);
    let previousData = get().uploadData || [];
    if (ok) {
      const newData = filter(previousData, (d) => d._id != payload.id);
      set({
        uploadData: newData,
        deleteUploadStatus: STATUS.SUCCESS,
      });
      SuccessAlert("Deleted Successfully");
    } else {
      set({ deleteUploadStatus: STATUS.FAILED });
      ErrorAlert((data && data.errorMessage) || "Something Went Wrong");
    }
  },
}));
