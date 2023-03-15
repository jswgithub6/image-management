import request from "@/util/request";

export function uploadFile(data, uploadProgress) {
  return request({
    method: "post",
    url: "/file/upload",
    data,
    onUploadProgress: function (e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      uploadProgress(e);
    },
  });
}

export function fetchFileList(queryInfo) {
  return request({
    method: "get",
    url: "/file/",
    params: queryInfo,
  });
}

// 获取的是所有审核通过的图片
export function fetchAllPassFiles(queryInfo) {
  return request({
    method: "get",
    url: "/file/reviewStatus/pass",
    params: queryInfo,
  });
}

export function deleteFileById(fileId) {
  return request({
    method: "delete",
    url: `/file/${fileId}`,
  });
}

export function updateReviewStatus(fileId, status) {
  return request({
    method: "patch",
    url: `/file/${fileId}/reviewStatus/${status}`,
  });
}
