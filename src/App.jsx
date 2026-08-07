import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostComposer from "./components/PostComposer";
import PostList from "./components/PostList";

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

            <div className="app">

                <header className="app-header">
                    <h1> Redux Toolkit Post Composer</h1>
                    <p>
                        Create, edit and manage social media posts using Redux Toolkit.
                    </p>
                </header>

                <main className="app-content">
                    <PostComposer />
                    <PostList />
                </main>

            </div>
        </>
    );
}

export default App;