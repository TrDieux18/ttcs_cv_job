import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";

// 🧩 Import ConfigProvider từ antd
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Lexend, sans-serif", 
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
