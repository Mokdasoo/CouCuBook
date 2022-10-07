import './App.css';
import CCBRouter from './CCBRouter';
import {BrowserRouter} from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Header/>
        <CCBRouter/>  
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
