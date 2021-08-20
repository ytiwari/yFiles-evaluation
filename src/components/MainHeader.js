import { NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css'

const MainHeader = () =>{
    return <header className={classes.header}>
        <nav>
            <ul>
                <li>
                    <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example1">Creating Graph Element</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example3">Setting Graph Styles</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example2">Configurable Node</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example4">Simple CSV</NavLink>
                </li>
                <li>
                <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example5">Organizational Structure</NavLink>
                </li>
                <li>
                <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example6">Transitivity</NavLink>
                </li>
                <li>
                <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example7">Networkflows</NavLink>
                </li>
                <li>
                <NavLink activeClassName={classes.active} to="/Tripudio-PLM/example8">Network Monitoring Demo</NavLink>
                </li>
            </ul>
        </nav>
    </header>
};



export default MainHeader;