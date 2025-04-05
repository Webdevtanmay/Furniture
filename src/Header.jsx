import React from 'react'

const Header = () => {
  return (
    <>
		<nav class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

			<div class="container">
				<a class="navbar-brand" href="/">Auracity<span>.</span></a>

				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarsFurni">
					<ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						<li class="nav-item active">
							<a class="nav-link" href="/">Home</a>
						</li>
						<li><a class="nav-link" href="/shop">Shop</a></li>
						<li><a class="nav-link" href="/about">About us</a></li>
						<li><a class="nav-link" href="/about">Services</a></li>
						<li><a class="nav-link" href="/login">Blog</a></li>
						<li><a class="nav-link" href="/contact">Contact us</a></li>
					</ul>

					<ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li><i className='fa-regular fa-user text-white h6'></i></li>
						<li><i className='fa-solid fa-cart-shopping text-white h6'></i></li>
					</ul>
				</div>
			</div>
				
		</nav>
			<div class="hero">
				<div class="container">
					<div class="row justify-content-between">
						<div class="col-lg-5">
							<div class="intro-excerpt">
								<h1>Modern Interior <span clsas="d-block">Design Studio</span></h1>
								<p class="mb-4">Auracity offers stylish, durable, and affordable furniture for modern homes and workspaces. Founded by Rushikesh Andhale, we focus on quality craftsmanship and elegant designs to enhance your space.</p>
								<p><a href="" class="btn btn-secondary me-2">Shop Now</a><a href="#" class="btn btn-white-outline">Explore</a></p>
							</div>
						</div>
						<div class="col-lg-7">
							<div class="hero-img-wrap">
								<img src="public/assets/images/couch.png" class="img-fluid" />
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  )
}

export default Header