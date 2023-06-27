/* images */
/* packages */
import { Link } from "react-router-dom";
/* other components */
/* main component */
const Navbar = ({ list, vertical }) => {
	return (
		<nav className={`navbar${vertical ? " navbar_vertical" : ""}`}>
			<ul className="navbar__list">
				{list.map((item, index) =>
					item.type === "button" ? (
						<li key={index} className={`navbar__item navbar__item_mobile`}>
							<div onClick={item.onClickEvent} className="navbar__link text text_small">
								{item.text}
							</div>
						</li>
					) : (
						<li key={index} className="navbar__item">
							<Link to={item.path} className="navbar__link text text_small">
								{item.text}
							</Link>
						</li>
					)
				)}
			</ul>
		</nav>
	);
};
/* export */
export default Navbar;
