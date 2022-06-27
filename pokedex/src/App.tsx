import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout  from "./components/Layout"
import Urls from './components/Urls';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Urls/>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
