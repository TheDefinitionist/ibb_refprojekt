// Media

import Modifier from '../utilities/modifier'

Modifier.setMax(50)
const short = Modifier.shorten

const Media = () => {

	return (
		<>
			<section className="section -mt-5">
				<div className="mb-10">
					<h1 className="section__headline">MEDIA</h1>
				</div>
				<div className="news">
					<div className="news__item news__item--top">
						<img className="news__img" src="./assets/img/news/img1.jpg" alt="content" />
						<div className="news__desc">
							<h3 className="news__column">MUSIC</h3>
							<h2 className="news__text">Lacuna Coil World Tour 2022</h2>
						</div>
					</div>
					<div className="news__item">
						<img className="news__img" src="./assets/img/news/img2.jpg" alt="content" />
						<div className="news__desc">
							<h3 className="news__column">MUSIC</h3>
							<h2 className="news__text">Charlez Niér In Amsterdam</h2>
						</div>
					</div>
					<div className="news__item">
						<img className="news__img" src="./assets/img/news/img3.jpg" alt="content" />
						<div className="news__desc">
							<h3 className="news__column">CULTURE</h3>
							<h2 className="news__text">Lorem Ipsum Dolor Sit Amet</h2>
						</div>
					</div>
					<div className="news__item">
						<img className="news__img" src="./assets/img/news/img4.jpg" alt="content" />
						<div className="news__desc">
							<h3 className="news__column">MEDIA</h3>
							<h2 className="news__text">Julia Craik Behind The Scenes</h2>
						</div>
					</div>
					<aside className="aside">
						<div className="trending">
							<h3 className="trending__headline">TRENDING</h3>
							<ul id="trending__items">
								<li><a href="/">
									<h3 className="news__column">MEDIA</h3>
									<p>{short('Could Taylor Swift Score Her First Oscar Nomination With ‘Carolina’?')}</p>
								</a></li>
								<li><a href="/">
									<h3>MUSIC</h3>
									<p>{short('Harry Styles Holds Off Porcupine Tree For U.K. Chart Title')}</p>
								</a></li>
								<li><a href="/">
									<h3>CULTURE</h3>
									<p>{short('Cardi B Goes Casual in $31 Shorts Set: Here’s Where You Can Buy It Online')}</p>
								</a></li>
								<li><a href="/">
									<h3>MUSIC</h3>
									<p>{short('R. Kelly Remains on Suicide Watch ‘For His Own Safety,’ Feds Say')}</p>
								</a></li>
								<li><a href="/">
									<h3>MEDIA</h3>
									<p>{short('BTS’ Label Recruits ARMY to Protect the Band From ‘Persoal Attacks and Defamation’')}</p>
								</a></li>
							</ul>
						</div>
					</aside>
				</div>
			</section>
		</>
	)
}

export { Media }
