import MomSection from './HeroComponent/momSection/MomSection';
import './Styles/index.css'
function App (){
    return(
        <>
        <div className="top-navbar"> top navbar</div>
        <div className='d-flex'>
        <div className="side-navbar"> side navbar</div>
         <MomSection/>
        </div>
        </>
    )
}
export default App;