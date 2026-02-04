import Api from "./Api";

export const getUsers = () =>
  Api.get("/admin/users");

export const getPosts = () =>
  Api.get("/admin/posts");

export const deleteIssueType = (groupName, categoryName) =>
  Api.delete("/admin/issue-types", {
    data: { groupName, categoryName },
  });

export const deletePost = (id) =>
  Api.delete(`/admin/posts/${id}`);
