import Utils from "./../utils"

Utils.setMax(50)
const short = Utils.shorten

const Main = () => {

	return (
		<main>
			<section className="section -mt-5">
				<div className="mb-10">
					<h1 className="section__headline">NEWS</h1>
				</div>
				<div className="news">
					<div className="news__item news__item--top">
						<img className="news__img" src="./assets/img/img1.jpg" alt="content" />
						<div className="news__desc">
							<h3 className="news__column">MUSIC</h3>
							<h2 className="news__text">Lacuna Coil World Tour 2022</h2>
						</div>
					</div>
					<div className="news__item">
						<img className="news__img" src="./assets/img/img2.jpg" alt="content" />
						<div className="news__desc">
							<h3 className="news__column">MUSIC</h3>
							<h2 className="news__text">Charlez Niér In Amsterdam</h2>
						</div>
					</div>
					<div className="news__item">
						<img className="news__img" src="./assets/img/img3.jpg" alt="content" />
						<div className="news__desc">
							<h3 className="news__column">CULTURE</h3>
							<h2 className="news__text">Lorem Ipsum Dolor Sit Amet</h2>
						</div>
					</div>
					<div className="news__item">
						<img className="news__img" src="./assets/img/img4.jpg" alt="content" />
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

			<section className="section -mt-20">
				<div className="mb-10">
					<h1 className="section__headline">CHARTS</h1>
				</div>
				<div className="charts">
					<div className="charts__item charts__rank1">
						<img src="./assets/img/charts/img1.jpg" alt="" />
						<div className="charts__desc charts__desc--top">
							<div className="desc__rank">1</div>
							<p className="desc__songtitle">Jimmy Cooks</p>
							<h3 className="desc__interpret">Drake ft. 21 Savage</h3>
						</div>
					</div>
					<div className="charts__item charts__rank2">
						<img src="./assets/img/charts/img2.jpg" alt="" />
						<div className="charts__desc">
							<div className="charts__desc--inline">
								<div className="desc__rank">2</div>
								<p className="desc__songtitle">As It Was</p>
							</div>
							<h3 className="desc__interpret">Harry Styles</h3>
						</div>
					</div>
					<div className="charts__item charts__rank3">
						<img src="./assets/img/charts/img3.jpg" alt="" />
						<div className="charts__desc">
							<div className="charts__desc--inline">
								<div className="desc__rank">3</div>
								<p className="desc__songtitle">First Class</p>
							</div>
							<h3 className="desc__interpret">Jack Harlow</h3>
						</div>
					</div>
					<div className="charts__item charts__rank4">
						<img src="./assets/img/charts/img4.jpg" alt="" />
						<div className="charts__desc">
							<div className="charts__desc--inline">
								<div className="desc__rank">4</div>
								<p className="desc__songtitle">Wait For U</p>
							</div>
							<h3 className="desc__interpret">Future Featuring Drake & Tems</h3>
						</div>
					</div>
					<div className="charts__item charts__rank5">
						<img src="./assets/img/charts/img5.jpg" alt="" />
						<div className="charts__desc">
							<div className="charts__desc--inline">
								<div className="desc__rank">5</div>
								<p className="desc__songtitle">About Damn Time</p>
							</div>
							<h3 className="desc__interpret">Lizzo</h3>
						</div>
					</div>
				</div>
			</section>

			<section className="section -mt-20">
				<div className="mb-10">
					<h1 className="section__headline">PREMIUM</h1>
				</div>
				<div className="premium">
					<h2>Your Premium Perks In A Nutshell</h2>
					<p className="leading-relaxed text-lg">Taxidermy bushwick celiac master cleanse microdosing seitan. Fashion axe four dollar toast truffaut, direct trade kombucha brunch williamsburg keffiyeh gastropub tousled squid meh taiyaki drinking vinegar tacos.</p>
					<div className="flex mt-6">
						<button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
						<a href="/" className="text-indigo-500 inline-flex items-center ml-4">Learn More
							<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
								<path d="M5 12h14M12 5l7 7-7 7"></path>
							</svg>
						</a>
					</div>
				</div>

			</section>
		</main >
	)
}

export default Main
