import './styling/navbar.css';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/Logo.svg';

function navbar () {
    const navHeading = [{
        value: '/',
        label:"Overview"
    },{
        value: '/comparison',
        label:"Comparison"
    },{
        value: '/timeline',
        label:"Timeline"
    }]

    return (
        <div className="navbar-container">
            <div className="upper-nav">
                <Link className="logo" to="/">
                    <img className='logo-image' src={Logo} alt="Logo"/>
                    <p>Yu-Gi-Oh! Price Tracker</p>
                </Link>
            </div>
            <div className="lower-nav">
                {navHeading.map((_heading) => (
                    <NavLink 
                        to={_heading.value}
                        className="navbar-link"
                        style={({ isActive }) => ({
                            fontWeight: isActive ?'800' : 'normal'
                        })}
                    >
                        {_heading.label}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default navbar;