import io from 'socket.io-client';
import './App.css';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sender from './components/Sender';
import Rec from './components/Rec';
import Choice from './components/Choice';
import Login from './components/Login';
import Signup from './components/Signup';
import DriverLogin from './components/Driver/DriverLogin';
import StudentLogin from './components/Student/StudentLogin';
import Home from './components/Organization/Home';
import Sidebar from './components/Organization/Sidebar';
import AddStudent from './components/Organization/AddStudent';
import AddBus from './components/Organization/AddBus';
import AddStops from './components/Organization/AddStop';
import AddDriver from './components/Organization/AddDriver';
import AddRoute from './components/Organization/AddRoute';



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
            <StudentLogin />
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
          {/* home
 */}
          <Route path='/org/home' exact element={<>
            <Sidebar></Sidebar>
            <Home></Home>
          </>}
          />
          <Route path='/org/AddStudent' exact element={<>
            <div className="flex">
            <div className=""> {/* Fixed width for Sidebar */}
              <Sidebar />
            </div>
            <div className="flex-grow"> {/* AddStudent takes remaining space */}
              <AddStudent />
            </div>
          </div>
          </>}
          />
           <Route path='/org/AddVehicle' exact element={
      <>
        <div className="flex">
          <div className=""> {/* Fixed width for Sidebar */}
            <Sidebar />
          </div>
          <div className="flex-grow"> {/* AddBus takes remaining space */}
            <AddBus />
          </div>
        </div>
      </>
    } />

    <Route path='/org/AddStop' exact element={
      <>
        <div className="flex">
          <div className=""> {/* Fixed width for Sidebar */}
            <Sidebar />
          </div>
          <div className="flex-grow"> {/* AddStops takes remaining space */}
            <AddStops />
          </div>
        </div>
      </>
    } />

    <Route path='/org/AddDriver' exact element={
      <>
        <div className="flex">
          <div className=""> {/* Fixed width for Sidebar */}
            <Sidebar />
          </div>
          <div className="flex-grow"> {/* AddDriver takes remaining space */}
            <AddDriver />
          </div>
        </div>
      </>
    } />

    <Route path='/org/AddRoute' exact element={
      <>
        <div className="flex">
          <div className=""> {/* Fixed width for Sidebar */}
            <Sidebar />
          </div>
          <div className="flex-grow"> {/* AddRoute takes remaining space */}
            <AddRoute />
          </div>
        </div>
      </>
    } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
