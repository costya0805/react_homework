import "./App.css";

import { Provider } from "react-redux";
import Film from "./pages/film";
import FilmsList from "./pages/search/search";
import { setupStore} from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header/header";

const store = setupStore();

const router = createBrowserRouter([
    {
        path: "/",
        element: <FilmsList />,
    },
    {
        path: "film/:filmId",
        element: <Film />,
    },
]);

function App() {
    return (
        <Provider store={store}>
            <Header />
            <div className="main">
                <RouterProvider router={router} />
            </div>
        </Provider>
    );
}

export default App;
