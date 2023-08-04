import { Link, useLocation } from "react-router-dom";

const menuItems = [{ path: 'search', title: 'Search' }, { path: '/', title: 'All books' }]

/**
 * 
 * @returns Menu component that uses search and route paths
 */
function Menu() {

    const location = useLocation();
    const menuItem = (location.pathname !== '/search') ? menuItems[0] : menuItems[1];
    return (
        <div className="list-books-title">
            <h1 className="title">MyReads</h1>
            <Link to={menuItem.path} className="searchButton" > {menuItem.title} </Link>
        </div>
    );
}

export default Menu;