import './App.css';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header></Header>
      <div className="min-h-screen flex flex-col m-10">
        <Dashboard></Dashboard>
      </div>

      <Footer></Footer>
    </>
  );
}

export default App;
