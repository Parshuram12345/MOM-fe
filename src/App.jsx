import {Route,Routes} from "react-router-dom"
import './Styles/index.css'
import Home from './views/Home';
import MomZeroStatePage from './views/momZeroState';
import NewMomPage from './views/newMOM';
import InnerPage from './views/InnerPageMOM';
function App() {
    return (
        <>
         <Routes>
            <Route exact path="/" element={ <Home />} />
            <Route path="/mominnerpage" element={ <InnerPage />} />
            <Route path="/momzerostate" element={ <MomZeroStatePage/>} />
            <Route path="/newmom" element={ <NewMomPage />} />
        </Routes> 
        </>
    )
}
export default App;