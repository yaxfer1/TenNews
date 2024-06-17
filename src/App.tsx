import React, { Suspense } from "react";
import { Route, Switch } from "wouter";


import {UserContextProvider} from "./context/UserContext.jsx";
import Login from "./pages/Login";


import "./App.css";

const HomePage = React.lazy(() => import("./pages/Home"));

export default function App() {
    return (
        <UserContextProvider>
            <div className="App">
                <Suspense fallback={null}>
                    <section className="App-content">
                            <Switch>
                                <Route component={HomePage} path="/home" />
                                <Route component={Login} path="/" />
                            </Switch>
                    </section>
                </Suspense>
            </div>
        </UserContextProvider>
    );
}