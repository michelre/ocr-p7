import {BrowserRouter, Switch, Route} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import React from "react";
import context from "./context";

function App() {
    const [useApi, setUseApi] = React.useState(false);
    return (
        <context.Provider value={{useApi, setUseApi}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/a-propos" exact component={About}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </context.Provider>
    );
}

export default App;
