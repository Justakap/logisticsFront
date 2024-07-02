import io from 'socket.io-client';
import './App.css';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sender from './components/Sender';
import Rec from './components/Rec';
import AddDriver from './components/AddDriver';
import Choice from './components/Choice';
import Login from './components/Login';
import Signup from './components/Signup';
import DriverLogin from './components/Driver/DriverLogin';
import StudentLogin from './components/Student/StudentLogin';



function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' exact element={<>
            <Choice></Choice>
          </>}
          />
          <Route path='/a' exact element={<>
            <About></About>
          </>}
          />
          <Route path='/login' exact element={<>
            <Login></Login>
          </>}
          />
          <Route path='/driver/login' exact element={<>
            <DriverLogin></DriverLogin>
          </>}
          />
          <Route path='/student/login' exact element={<>
            <StudentLogin/>
          </>}
          />
          <Route path='/signup' exact element={<>
            <Signup></Signup>
          </>}
          />
          <Route path='/driver/:userId' exact element={<>
            <Sender></Sender>
          </>}
          />
          <Route path='/student/:senderId' exact element={<>
            <Rec></Rec>
          </>}
          />
          <Route path='/addDriver' exact element={<>
            <AddDriver></AddDriver>
          </>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
