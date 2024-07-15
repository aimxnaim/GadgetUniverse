import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import ProductItem from './product/ProductItem'
import Loading from './layout/Loader'
import toast from 'react-hot-toast'
import CustomPagination from './layout/CustomPagination'
import { Link, useSearchParams } from 'react-router-dom'
import Filter from './layout/Filter'
import { useGetProductsQuery } from '../actions/api/productsApi'
import Marquee from "react-fast-marquee";
import CategoryItem from './home/CategoryItem'
import BlogCard from './home/BlogCard'

const Home = () => {

    useEffect(() => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const config = {
            rootMargin: '0px 0px 50px 0px',
            threshold: 0.01,
        };

        const observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    preloadImage(entry.target);
                    self.unobserve(entry.target);
                }
            });
        }, config);

        images.forEach(image => {
            observer.observe(image);
        });

        function preloadImage(img) {
            const src = img.getAttribute('data-src');
            if (!src) { return; }
            img.src = src;
        }
    }, []);

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const category = searchParams.get('category');
    const ratings = searchParams.get('ratings');

    const params = { page, keyword };

    min !== null && (params.min = min);
    max !== null && (params.max = max);
    category !== null && (params.category = category);
    ratings !== null && (params.ratings = ratings);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(() => {
        if (isError) toast.error(error?.data?.message)
    }, [isError, error]);

    const columnSize = keyword ? 4 : 3;

    if (isLoading) return <Loading />
    return (
        <>
            <MetaData title={`Buy Best Products Online`}></MetaData>
            {!keyword &&
                <>
                    <section className='home-wrapper-1 py-5'>
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-6">
                                    <div className="main-banner position-relative">
                                        <img
                                            src="images/youtube/main-banner.jpg"
                                            alt="main banner"
                                            className='img-fluid rounded-3'
                                        />
                                        <div className="main-banner-content position-absolute">
                                            <h4>Superchanged for Pros.</h4>
                                            <h5>Special Sale</h5>
                                            <p>From RM2399 or</p>
                                            <p className='mb-4'>RM199/mo. for 12 mo.</p>
                                            <Link className="button">BUY NOW</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                                        <div className="small-banner position-relative">
                                            <img
                                                src="images/youtube/catbanner-01.jpg"
                                                alt="main banner"
                                                className='img-fluid rounded-3'
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>BEST SALES</h4>
                                                <h5>13-inch Macbook Pro </h5>
                                                <p>From RM3399 or <br /> RM283/mo. for 12 mo. </p>
                                            </div>
                                        </div>
                                        <div className="small-banner position-relative">
                                            <img
                                                src="images/youtube/catbanner-02.jpg"
                                                alt="main banner"
                                                className='img-fluid rounded-3'
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>15% OFF</h4>
                                                <h5>Apple Watch Series 11</h5>
                                                <p>Shop the latest band <br /> styles and colors</p>                                    </div>
                                        </div>
                                        <div className="small-banner position-relative">
                                            <img
                                                src="images/youtube/catbanner-03.jpg"
                                                alt="main banner"
                                                className='img-fluid rounded-3'
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>New Arrival</h4>
                                                <h5>Buy IPad Air</h5>
                                                <p>From RM2599 or <br /> RM216/mo. for 12 mo.</p>
                                            </div>
                                        </div>
                                        <div className="small-banner position-relative">
                                            <img
                                                src="images/youtube/catbanner-04.jpg"
                                                alt="main banner"
                                                className='img-fluid rounded-3'
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>Free Engraving</h4>
                                                <h5>AirPods Max</h5>
                                                <p>High-fidelity playback & <br /> active noise cancellation</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="home-wrapper-2 py-5">
                        <div className="icon-website">
                            <div className="container-xxl">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="services d-flex align-items-center justify-content-between">
                                            <div className='d-flex align-items-center gap-10'>
                                                <img
                                                    src="images/youtube/service-01.png"
                                                    alt="delivery truck"
                                                    style={{ width: '50px', height: '50px', marginRight: '5px' }}
                                                />
                                                <div>
                                                    <h6>Free Shipping</h6>
                                                    <p className='mb-0'>From all orders over RM250</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-10'>
                                                <img
                                                    src="/images/youtube/service-02.png"
                                                    alt="gift box"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                                <div>
                                                    <h6>Daily Surpise Offer</h6>
                                                    <p className='mb-0'>Save up to 25% off</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-10'>
                                                <img
                                                    src="/images/youtube/service-03.png"
                                                    alt="support    "
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                                <div>
                                                    <h6>Support 24/7</h6>
                                                    <p className='mb-0'>Shop with an expert</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-10'>
                                                <img
                                                    src="/images/youtube/service-04.png"
                                                    alt="offer"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                                <div>
                                                    <h6>Affordable Prices</h6>
                                                    <p className='mb-0'>Get Factory Direct Prices</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-10'>
                                                <img
                                                    src="/images/youtube/service-05.png"
                                                    alt="credit-card"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                                <div>
                                                    <h6>Secure Payments</h6>
                                                    <p className='mb-0'>100% Protected Payments</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-shown-wrapper py-5">
                            <div className="container-xxl">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="categories d-flex flex-wrap align-items-center justify-content-between">
                                            <CategoryItem title="Cameras" count="10" imgSrc="/images/youtube/camera.png" />
                                            <CategoryItem title="Smart Tv" count="10" imgSrc="/images/youtube/tv.png" />
                                            <CategoryItem title="Mouse" count="10" imgSrc="/images/youtube/mouse.png" />
                                            <CategoryItem title="Speaker" count="10" imgSrc="/images/youtube/speaker.png" />
                                            <CategoryItem title="Smart Watch" count="10" imgSrc="/images/youtube/watch.png" />
                                            <CategoryItem title="Cameras" count="10" imgSrc="/images/youtube/camera.png" />
                                            <CategoryItem title="Programming Books" count="10" imgSrc="/images/youtube/books.png" />
                                            <CategoryItem title="Gaming" count="10" imgSrc="/images/youtube/game.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
            <section className='product-wrapper pt-5 pb-0 home-wrapper-2'>
                <div className="container-xxl">
                    <div className="row">
                        {keyword &&
                            <div className="col-6 col-md-3 mt-5">
                                <Filter />
                            </div>
                        }
                        <div className={keyword ? "col-6 col-sm-6 col-md-9" : "col-12"}>
                            <h3 id="products_heading" className="section-heading">
                                {
                                    keyword
                                        ? `${data?.products?.length} Products found with keyword ${keyword}`
                                        : 'Latest Products'
                                }

                            </h3>

                            <section id="products">
                                <div className="row">
                                    {data?.products?.map((product, index) => (
                                        <ProductItem key={product.id || index} product={product} columnSize={columnSize} />
                                    ))}

                                </div>
                            </section>

                            <CustomPagination
                                resPerPage={data?.resPerPage}
                                filterProductCount={data?.filterProductCount}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {!keyword &&
                <>
                    <section className="famous-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-3">
                                    <div className="famous-card position-relative">
                                        <img
                                            src="/images/famous/famous-01.webp"
                                            alt="famous01"
                                            className='img-fluid'
                                        />
                                        <div className="famous-content position-absolute text-white">
                                            <h5>Big Screen</h5>
                                            <h6>Apple Watch Series 11</h6>
                                            <p>From RM3399 or RM283/mo. for 12 mo. *</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="famous-card position-relative">
                                        <img
                                            src="/images/famous/famous-02.webp"
                                            alt="famous02"
                                            className='img-fluid'
                                        />
                                        <div className="famous-content position-absolute">
                                            <h5>Studio Display</h5>
                                            <h6>600 nits of brightness.</h6>
                                            <p>27-inch 5K Retina Display</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="famous-card position-relative">
                                        <img
                                            src="/images/famous/famous-03.webp"
                                            alt="famous03"
                                            className='img-fluid'
                                        />
                                        <div className="famous-content position-absolute">
                                            <h5>Smartphones</h5>
                                            <h6>iPhone 13 Pro</h6>
                                            <p>Now in Green. From RM3600 or RM300/mo. for 12 mo. *</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="famous-card position-relative">
                                        <img
                                            src="/images/famous/famous-04.webp"
                                            alt="famous04"
                                            className='img-fluid'
                                        />
                                        <div className="famous-content position-absolute">
                                            <h5>Home Speakers</h5>
                                            <h6>Room-filling Sounds</h6>
                                            <p>From RM700 or RM350/mo. for 2 mo. *</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="popular-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="section-heading">Our Popular Products</h3>
                                </div>
                            </div>
                            <div className="row">
                                {data?.products?.map((product, index) => (
                                    <ProductItem key={product.id || index} product={product} columnSize={columnSize} />
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="marque-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-12">
                                    <div className="marque-inner-wrapper brand-wrapper ">
                                        <Marquee gradient={true} speed={50} >
                                            <div className="d-flex">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                                    <div key={index} className="mx-4 w-25">
                                                        <img src={`/images/brand/brand-0${index}.png`} alt="" loading="lazy" />
                                                    </div>
                                                ))}
                                            </div>
                                        </Marquee>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="blog-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            <div className="col-12">
                                <h3 className="section-heading ">Our Latest Blogs</h3>
                            </div>
                            <div className="row">
                                <BlogCard />
                                <BlogCard />
                                <BlogCard />
                                <BlogCard />
                            </div>
                        </div>
                    </section>

                </>
            }
        </>
    )
}

export default Home