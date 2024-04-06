import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { setLoading } from "./store/reducers/loading";
import axios from "axios";
import { login } from "./store/reducers/auth";

async function retriveLoggedUsers() {
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/users/1/info`;
  const urlGroups = `${base_url}/api/users/`;

  try {
    const token = localStorage.getItem("TOKEN")
      ? localStorage.getItem("TOKEN")
      : null;
    if (token) {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;

      const reponseGroups = await axios.get(`${urlGroups}${data.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      data.ownedGroups = reponseGroups.data.ownedGroups;
      data.subscribedGroups = reponseGroups.data.subscribedGroups;
      console.log(data);
      store.dispatch(login(data));
    }
  } catch (error) {
    localStorage.removeItem("TOKEN");
    console.log(error);
  }
}

Promise.all([retriveLoggedUsers()]).finally(() => {
  store.dispatch(setLoading(false));
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
