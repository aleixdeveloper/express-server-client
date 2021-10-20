
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './App.css';
import GetData from './components/GetData';
import SetData from './components/SetData';

function App() {

  const [navItem, setNavItem] = useState('1')

  return (
    <div className="App">
            <Nav variant="dark">
      <Nav.Item>
        <Nav.Link onClick={() => setNavItem('1')}>
          Get data
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => setNavItem('2')}>
        Set data
        </Nav.Link>
      </Nav.Item>
    </Nav>
      <header className="App-header">

      {navItem === '1' ? <GetData /> : navItem === '2' && <SetData />}

      </header>

    </div>
  );
}



export default App;
