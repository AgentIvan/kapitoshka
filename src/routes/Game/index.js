import { Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";

const GamePage = ({ database }) => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/`} exact>
                <StartPage database={database} />
            </Route>|
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
    );
};

export default GamePage;