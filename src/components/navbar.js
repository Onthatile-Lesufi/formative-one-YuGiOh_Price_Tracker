import './styling/navbar.css';
import { Link } from 'react-router-dom';

function navbar () {
    return (
        <div className="navbar-container">
            <div className="upper-nav">
                <Link className="logo" to="/">
                    <img src="" alt="Logo"/>
                </Link>
            </div>
            <div className="lower-nav">
                <Link className='navbar-link' to="/">Overview</Link>
                <Link className='navbar-link' to="/comparison">Comparison</Link>
                <Link className='navbar-link' to="/timeline">Timeline</Link>
            </div>
        </div>
    )
}

export default navbar;