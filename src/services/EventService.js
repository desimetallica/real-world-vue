import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getEvents() {
    return apiClient.get("/events");
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  getEventsPages(perPage, page) {
    return apiClient.get("/events/?_page=" + page + "&_limit=" + perPage);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  }
};
