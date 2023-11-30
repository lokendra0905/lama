import { URIS, apiClient } from ".";

export const apis = {
  /* Project */
  getProjectApi: (payload) => apiClient.get(URIS.GET_PROJECTS, payload),
  addProjectApi: (payload) => apiClient.post(URIS.PROJECTS, payload),
  updateProjectApi: (payload) => apiClient.patch(URIS.PROJECTS, payload),
  deleteProjectApi: (payload) => apiClient.delete(URIS.PROJECTS, payload),

  /* Upload */
  getAllUploadApi: (payload) => apiClient.get(URIS.GET_UPLOAD, payload),
  getUploadApi: (payload) => apiClient.get(URIS.UPLOAD, payload),
  addUploadApi: (payload) => apiClient.post(URIS.UPLOAD, payload),
  updateUploadApi: (payload) => apiClient.patch(URIS.UPLOAD, payload),
  deleteUploadApi: (payload) => apiClient.delete(URIS.UPLOAD, payload),
};
