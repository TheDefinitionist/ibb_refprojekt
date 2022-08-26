// Charts

const Charts = () => {

	return (
		<>
			<section className="section -mt-5">
				<div className="top20">
					<section className="section -mt-20">
						<div className="mb-10">
							<h1 className="section__headline">TOP 20 CHARTS</h1>
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
						<div className="charts__button">
							<button>View Charts</button>
						</div>
					</section>
				</div>
			</section>
		</>
	)
}

export { Charts }
