import { Link } from 'react-router-dom'

const Footer = () => (
	<footer>
		<div id="sitemap">
			<div className="sitemap__wrapper">
				<nav>
					<h2>MusicBoard</h2>
					<li><Link to="/charts">CHART</Link></li>
					<li><Link to="/music">MUSIC</Link></li>
					<li><Link to="/culture">MEDIA</Link></li>
					<li><Link to="/media">CULTURE</Link></li>
				</nav>
				<nav>
					<h2>Sitemap</h2>
					<li><Link to="/subscribe">Subscribe</Link></li>
					<li><Link to="/privacy">Privacy Policy</Link></li>
					<li><Link to="/terms-of-use">Terms Of Use</Link></li>
					<li><Link to="/contact">Contact Us</Link></li>
				</nav>
			</div>
		</div>
		<div id="social-links">
			<span className="social-links__wrapper">
				<Link to="/">
					<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
						<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
					</svg>
				</Link>
				<Link to="/">
					<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
						<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
					</svg>
				</Link>
				<Link to="/">
					<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
						<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
						<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
					</svg>
				</Link>
				<Link to="/">
					<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" viewBox="0 0 24 24">
						<path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
						<circle cx="4" cy="4" r="2" stroke="none"></circle>
					</svg>
				</Link>
			</span>
		</div>
		<div id="copyright">
			<div className="copyright__wrapper">
				<address>
					MusicBoard &copy; 2022&nbsp; <a href="https://twitter.com/knyttneve" className="link" target="_blank" rel="noopener noreferrer">@knyttneve</a>
				</address>
			</div>
		</div>
	</footer>
)

export default Footer
