import './App.css';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen dark:bg-black dark:text-amber-50">
      <Header></Header>
      <div className="min-h-screen flex flex-col m-10">
        <Dashboard></Dashboard>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
