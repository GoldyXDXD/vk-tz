import RepositoryList from './components/RepositoryList';
import { RepositoryContext, repositoryStore } from './stores/RepositoryStore';
import "./App.css"

const App = () => (
    <RepositoryContext.Provider value={repositoryStore}>
        <div className="app">
            <h1>Список из API GitHub</h1>
            <RepositoryList />
        </div>
    </RepositoryContext.Provider>
);

export default App;
