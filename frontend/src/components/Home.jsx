import React, { useEffect, useState } from 'react'
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
import BreadCrumb from './store/BreadCrumb'
import FilterSort from './layout/FilterSort'

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

    const [grid, setGrid] = useState(3);
    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const category = searchParams.get('category');
    const ratings = searchParams.get('ratings');

    const params = { page, keyword };

    min && (params.min = min);
    max && (params.max = max);
    category && (params.category = category);
    ratings && (params.ratings = ratings);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(() => {
        if (isError) toast.error(error?.data?.message)
    }, [isError, error]);

    if (isLoading) return <Loading />

    const serviceItems = {
        'Free Shipping': 'From all orders over RM250',
        'Daily Surprise Offer': 'Save up to 25% off',
        'Support 24/7': 'Shop with an expert',
        'Affordable Prices': 'Get Factory Direct Prices',
        'Secure Payments': '100% Protected Payments'
    };

    return (
        <>
            <MetaData title={`Buy Best Products Online`} />
            {keyword &&
                <BreadCrumb title='Search' keyword={keyword} />
            }
            <div className="row">
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
                                                <h4>Supercharged for Pros.</h4>
                                                <h5>Special Sale</h5>
                                                <p>From RM2399 or</p>
                                                <p className='mb-4'>RM199/mo. for 12 mo.</p>
                                                <Link className="button">BUY NOW</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                                            {['01', '02', '03', '04'].map((item, index) => (
                                                <div className="small-banner position-relative" key={index}>
                                                    <img
                                                        src={`images/youtube/catbanner-${item}.jpg`}
                                                        alt={`banner ${item}`}
                                                        className='img-fluid rounded-3'
                                                    />
                                                    <div className="small-banner-content position-absolute">
                                                        <h4>Banner {item}</h4>
                                                        <h5>Some Description</h5>
                                                        <p>Some additional info</p>
                                                    </div>
                                                </div>
                                            ))}
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
                                                {Object.entries(serviceItems).map(([title, description], index) => (
                                                    <div className='d-flex align-items-center gap-10' key={index}>
                                                        <img
                                                            src={`/images/youtube/service-0${index + 1}.png`}
                                                            alt={`service ${title}`}
                                                            style={{ width: '50px', height: '50px', marginRight: '5px' }}
                                                        />
                                                        <div>
                                                            <h6>{title}</h6>
                                                            <p className='mb-0'>{description}</p>
                                                        </div>
                                                    </div>
                                                ))}
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
                                                {['camera', 'smart tv', 'mouse', 'speaker', 'smart watch', 'programming books', 'gaming', 'home gadget'].map((item, index) => (
                                                    <CategoryItem key={index} title={item.charAt(0).toUpperCase() + item.slice(1)} count="10" imgSrc={`/images/youtube/home/${item}.png`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                }

                {keyword &&
                    <section className='product-wrapper home-wrapper-2'>
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-3">
                                    <Filter />
                                </div>
                                <div className="col-9">
                                    {keyword &&
                                        <FilterSort grid={grid} setGrid={setGrid} />
                                    }
                                    <section id="products">
                                        <div className="row">
                                            {data?.products?.map((product, index) => (
                                                <ProductItem key={product.id || index} product={product} columnSize={grid} />
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
                }

                {!keyword &&
                    <>
                        <section className="famous-wrapper py-5 home-wrapper-2">
                            <div className="container-xxl">
                                <div className="row">
                                    {['01', '02', '03', '04'].map((item, index) => (
                                        <div className="col-3" key={index}>
                                            <div className="famous-card position-relative">
                                                <img
                                                    src={`/images/famous/famous-${item}.webp`}
                                                    alt={`famous ${item}`}
                                                    className='img-fluid'
                                                />
                                                <div className="famous-content position-absolute">
                                                    <h5 className={index === 0 ? 'text-white' : ''}>Product {item}</h5>
                                                    <h6 className={index === 0 ? 'text-white' : ''}>Details {item}</h6>
                                                    <p className={index === 0 ? 'text-white' : ''}>Price {item}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <section className="popular-wrapper py-5 home-wrapper-2">
                            <div className="container-xxl">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="section-heading">Our Popular Products</h3>
                                    </div>
                                    <div className="row">
                                        {data?.products?.map((product, index) => (
                                            <ProductItem key={product.id || index} product={product} columnSize={grid} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="marque-wrapper py-5 home-wrapper-2">
                            <div className="container-xxl">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="marque-inner-wrapper brand-wrapper">
                                            <Marquee gradient={true} speed={50}>
                                                <div className="d-flex">
                                                    {['brand-01.png', 'brand-02.png', 'brand-03.png', 'brand-04.png', 'brand-05.png', 'brand-06.png', 'brand-07.png', 'brand-08.png'].map((brand, index) => (
                                                        <div className="mx-4 w-25" key={index}>
                                                            <img src={`/images/brand/${brand}`} alt={`brand ${index}`} />
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
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="section-heading">Our Latest News</h3>
                                    </div>
                                    <div className="row">
                                        {['1', '2', '3', '4'].map((item, index) => (
                                            <div className="col-3" key={index}>
                                                <BlogCard id={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                }
            </div>
        </>
    )
}

export default Home;
