import Api from "./Api";

export const getUsers = () =>
  Api.get("/admin/users");

export const getPosts = () =>
  Api.get("/admin/posts");
