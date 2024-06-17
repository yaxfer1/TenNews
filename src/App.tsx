import { Suspense } from "react";
import { Route, Switch } from "wouter";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {UserContextProvider} from "./context/UserContext.jsx";
import Login from "./pages/Login";
import HomePage from "./pages/Home";

import "./App.css";


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