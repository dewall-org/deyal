import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-md navbar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to='/'>দেয়াল</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item px-md-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/' exact
                                >Home</NavLink>
                            </li>
                            <li className="nav-item px-md-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/rules'
                                >Rules</NavLink>
                            </li>
                            <li className="nav-item ps-md-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/about'
                                >About</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
