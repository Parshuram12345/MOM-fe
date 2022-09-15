// import SidenavWeb from './mainComponent/SideNavWeb/SideNavWeb.jsx';
// import WebHeader from './mainComponent/WebHeader/WebHeader.jsx';
import { Home } from './views';
import './Styles/index.css'
function App() {
    return (
        <>
            <div className="top-navbar">top navbar</div>
            <div className='d-flex'>
                <div className="side-navbar">side navbar</div>
                {/* <WebHeader /> */}
                {/* <SidenavWeb /> */}
                    <Home />
            </div>
        </>
    )
}
export default App;