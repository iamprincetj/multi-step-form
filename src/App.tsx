import MainContent from "./components/main-content/MainContent";
import SideBar from "./components/SideBar";
import './assets/css/App.css';
import { AddOnProvider } from "./contexts/dataContext";

const App = () => {
  return (
    <div className='container'>
      <AddOnProvider>
        <SideBar />
        <MainContent />
      </AddOnProvider>
    </div>
  );
};

export default App;
