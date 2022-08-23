// NotFound

import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {

	const navigate = useNavigate()
	
	return (
		<>
			<section className="section -mt-5">
				<div className="mb-10">
					<h1 className="section__headline">ERROR 404 - Page Not Found</h1>
				</div>
				<div className="NotFound">
					<p>
						Sorry, the page you are looking for does not exist.<br />
						<br />
						➤ Go <Link className="link" to="#" onClick={()=> navigate(-1)}>back</Link> or go to <Link className="link" to="/">Home</Link>
					</p>
				</div>
			</section>
		</>
	)
}

export { NotFound }
