import React, { useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import ProductItem from './product/ProductItem'
import ProductItemCompact from './product/ProductItemCompact'
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
import HorizontalScroller from './layout/HorizontalScroller'
import ProductSidebar from './layout/ProductSidebar'

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
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeProductSection, setActiveProductSection] = useState('featured');
    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const category = searchParams.get('category');
    const ratings = searchParams.get('ratings');
    const minRating = searchParams.get('minRating');
    const maxRating = searchParams.get('maxRating');

    const params = { page, keyword };

    min && (params.min = min);
    max && (params.max = max);
    category && (params.category = category);
    ratings && (params.ratings = ratings);
    minRating && (params.minRating = minRating);
    maxRating && (params.maxRating = maxRating);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    // Fetch featured products (top rated with minimum 4 stars)
    const { data: featuredData } = useGetProductsQuery({ 
        ratings: 4, 
        page: 1,
        sort: 'rating-descending'
    });

    // Fetch new arrivals
    const { data: newArrivalsData } = useGetProductsQuery({ 
        page: 1,
        sort: 'newest'
    });

    // Fetch top rated products
    const { data: topRatedData } = useGetProductsQuery({ 
        page: 1,
        sort: 'rating-descending',
        ratings: 4
    });

    useEffect(() => {
        if (isError) toast.error(error?.data?.message)
    }, [isError, error]);

    // Auto-slide carousel
    useEffect(() => {
        const totalSlides = featuredData?.products?.length || 0;
        if (totalSlides === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.min(totalSlides, 4));
        }, 4000);

        return () => clearInterval(interval);
    }, [featuredData]);

    if (isLoading) return <Loading />

    const serviceItems = {
        'Free Shipping': 'From all orders over RM250',
        'Daily Surprise Offer': 'Save up to 25% off',
        'Support 24/7': 'Shop with an expert',
        'Affordable Prices': 'Get Factory Direct Prices',
        'Secure Payments': '100% Protected Payments'
    };

    const productSections = [
        { id: 'featured', title: 'Featured', icon: 'fas fa-star' },
        { id: 'new', title: 'New Arrivals', icon: 'fas fa-box' },
        { id: 'toprated', title: 'Top Rated', icon: 'fas fa-crown' },
        { id: 'popular', title: 'Popular', icon: 'fas fa-heart' }
    ];

    const getProductsBySection = () => {
        switch(activeProductSection) {
            case 'featured':
                return featuredData?.products?.slice(0, 12) || [];
            case 'new':
                return newArrivalsData?.products?.slice(0, 12) || [];
            case 'toprated':
                return topRatedData?.products?.slice(0, 12) || [];
            case 'popular':
                return data?.products || [];
            default:
                return featuredData?.products?.slice(0, 12) || [];
        }
    };

    const getSectionTitle = () => {
        const section = productSections.find(s => s.id === activeProductSection);
        return section ? section.title : 'Featured Products';
    };

    return (
        <>
            <MetaData title={`Buy Best Products Online`} />
            {keyword &&
                <BreadCrumb title='Our Store' />
            }
            <div className="row home-main-wrapper">
                {!keyword &&
                    <>
                        <section className=' pb-5' style={{ backgroundColor: 'transparent' }}>
                            <div className="container-xxl" style={{ maxWidth: '100%', padding: 0 }}>
                                <div className="row" style={{ margin: 0 }}>
                                    <div className="col-12" style={{ padding: 0 }}>
                                        {/* Nike-style carousel with image backgrounds */}
                                        <div style={{
                                            position: 'relative', 
                                            height: '75vh',
                                            maxHeight: '700px',
                                            minHeight: '500px',
                                            overflow: 'hidden', 
                                            borderRadius: '0',
                                            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                                        }}>
                                            {/* Main banner slide */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    transition: 'opacity 1s ease-in-out',
                                                    opacity: currentSlide === 0 ? 1 : 0,
                                                    pointerEvents: currentSlide === 0 ? 'auto' : 'none'
                                                }}
                                            >
                                                <div style={{ 
                                                    position: 'relative', 
                                                    width: '100%', 
                                                    height: '100%',
                                                    backgroundImage: 'url(images/youtube/main-banner.jpg)',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {/* Dark overlay for text readability */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                                                        zIndex: 1
                                                    }}></div>
                                                    
                                                    <div style={{ 
                                                        position: 'relative',
                                                        zIndex: 2, 
                                                        textAlign: 'center', 
                                                        color: 'white',
                                                        padding: '0 3rem',
                                                        maxWidth: '900px'
                                                    }}>
                                                        <p style={{ 
                                                            fontSize: '1.2rem', 
                                                            fontWeight: '600',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '3px',
                                                            marginBottom: '1.5rem',
                                                            opacity: 0.95
                                                        }}>Special Offer</p>
                                                        <h1 style={{ 
                                                            fontSize: '5rem', 
                                                            fontWeight: '900',
                                                            marginBottom: '1rem',
                                                            lineHeight: '1',
                                                            letterSpacing: '-2px'
                                                        }}>SUPERCHARGED</h1>
                                                        <h2 style={{
                                                            fontSize: '3.5rem',
                                                            fontWeight: '800',
                                                            marginBottom: '2rem',
                                                            lineHeight: '1',
                                                            letterSpacing: '-1px'
                                                        }}>FOR PROS</h2>
                                                        <p style={{ 
                                                            fontSize: '1.3rem', 
                                                            fontWeight: '400',
                                                            marginBottom: '3rem',
                                                            opacity: 0.9
                                                        }}>From RM2399 or RM199/mo. for 12 months</p>
                                                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                                            <Link 
                                                                to="/store"
                                                                style={{
                                                                    backgroundColor: 'white',
                                                                    color: 'black',
                                                                    padding: '0.75rem 2rem',
                                                                    borderRadius: '30px',
                                                                    fontWeight: '600',
                                                                    fontSize: '1rem',
                                                                    textDecoration: 'none',
                                                                    display: 'inline-block',
                                                                    transition: 'all 0.2s ease',
                                                                    border: 'none'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = 'white';
                                                                }}
                                                            >
                                                                Shop
                                                            </Link>
                                                            <Link 
                                                                to="/store"
                                                                style={{
                                                                    backgroundColor: 'transparent',
                                                                    color: 'white',
                                                                    padding: '0.75rem 2rem',
                                                                    borderRadius: '30px',
                                                                    fontWeight: '600',
                                                                    fontSize: '1rem',
                                                                    textDecoration: 'none',
                                                                    display: 'inline-block',
                                                                    transition: 'all 0.2s ease',
                                                                    border: '2px solid white'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                                }}
                                                            >
                                                                Learn More
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product slides with background images */}
                                            {featuredData?.products?.slice(0, 4).map((product, index) => (
                                                <div
                                                    key={product._id}
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        transition: 'opacity 1s ease-in-out',
                                                        opacity: currentSlide === index + 1 ? 1 : 0,
                                                        pointerEvents: currentSlide === index + 1 ? 'auto' : 'none'
                                                    }}
                                                >
                                                    <Link
                                                        to={`/${product._id}`}
                                                        style={{
                                                            display: 'block',
                                                            width: '100%',
                                                            height: '100%',
                                                            textDecoration: 'none',
                                                            position: 'relative',
                                                            backgroundImage: `url(${product?.images[0]?.url || '/images/default_product.png'})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center'
                                                        }}
                                                    >
                                                        {/* Dark overlay */}
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
                                                            zIndex: 1
                                                        }}></div>

                                                        {/* Content overlay */}
                                                        <div style={{ 
                                                            position: 'relative',
                                                            zIndex: 2,
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            textAlign: 'center',
                                                            color: 'white',
                                                            padding: '0 3rem',
                                                            maxWidth: '900px',
                                                            margin: '0 auto'
                                                        }}>
                                                            <p style={{ 
                                                                fontSize: '1.1rem', 
                                                                fontWeight: '600',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '3px',
                                                                marginBottom: '1.5rem',
                                                                opacity: 0.95
                                                            }}>{product.seller}</p>
                                                            <h1 style={{ 
                                                                fontSize: '4.5rem', 
                                                                fontWeight: '900',
                                                                marginBottom: '1.5rem',
                                                                lineHeight: '1.1',
                                                                letterSpacing: '-2px',
                                                                textTransform: 'uppercase'
                                                            }}>{product.name.substring(0, 30)}</h1>
                                                            <div style={{ 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: '2rem', 
                                                                marginBottom: '2.5rem',
                                                                fontSize: '1.2rem',
                                                                fontWeight: '400'
                                                            }}>
                                                                <span style={{ fontSize: '2rem', fontWeight: '700' }}>RM {product.price}</span>
                                                                <span style={{ opacity: 0.9 }}>⭐ {product.ratings} ({product.numOfReviews} reviews)</span>
                                                            </div>
                                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                                <span
                                                                    style={{
                                                                        backgroundColor: 'white',
                                                                        color: 'black',
                                                                        padding: '0.75rem 2rem',
                                                                        borderRadius: '30px',
                                                                        fontWeight: '600',
                                                                        fontSize: '1rem',
                                                                        display: 'inline-block',
                                                                        transition: 'all 0.2s ease'
                                                                    }}
                                                                >
                                                                    Shop Now
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}

                                            {/* Navigation Controls */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '30px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                display: 'flex',
                                                gap: '8px',
                                                zIndex: 10
                                            }}>
                                                {[0, 1, 2, 3, 4].slice(0, (featuredData?.products?.length || 0) + 1).map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentSlide(idx)}
                                                        style={{
                                                            width: '10px',
                                                            height: '10px',
                                                            borderRadius: '50%',
                                                            border: 'none',
                                                            backgroundColor: currentSlide === idx ? 'white' : 'rgba(255,255,255,0.4)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            padding: 0
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (currentSlide !== idx) {
                                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (currentSlide !== idx) {
                                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </div>

                                            {/* Arrow Controls */}
                                            <button
                                                onClick={() => setCurrentSlide(currentSlide === 0 ? Math.min((featuredData?.products?.length || 0), 4) : currentSlide - 1)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '80px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                                    border: 'none',
                                                    color: 'white',
                                                    fontSize: '1.5rem',
                                                    cursor: 'pointer',
                                                    zIndex: 10,
                                                    transition: 'all 0.2s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                                                }}
                                            >
                                                ‹
                                            </button>
                                            <button
                                                onClick={() => setCurrentSlide(currentSlide === Math.min((featuredData?.products?.length || 0), 4) ? 0 : currentSlide + 1)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '20px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                                    border: 'none',
                                                    color: 'white',
                                                    fontSize: '1.5rem',
                                                    cursor: 'pointer',
                                                    zIndex: 10,
                                                    transition: 'all 0.2s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                                                }}
                                            >
                                                ›
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                         <section className="">
                            <div className="container-xxl">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="marque-inner-wrapper brand-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Marquee gradient={true} gradientColor="white" speed={60} pauseOnHover={true}>
                                                <div className="d-flex" style={{ alignItems: 'center', gap: '3rem' }}>
                                                    {['brand-01.png', 'brand-02.png', 'brand-03.png', 'brand-04.png', 'brand-05.png', 'brand-06.png', 'brand-07.png', 'brand-08.png'].map((brand, index) => (
                                                        <div key={index} style={{ padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
                                                            <img src={`/images/brand/${brand}`} alt={`brand ${index}`} style={{ maxHeight: '80px', objectFit: 'contain' }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                         {/* Product Collections with Sidebar - Right after brand logo */}
                        <section className="product-collections-wrapper py-5">
                            <div className="container-xxl">
                                <div className="row g-4">
                                    {/* Sidebar Navigation */}
                                    <div className="col-12 col-lg-3">
                                        <ProductSidebar 
                                            sections={productSections}
                                            activeSection={activeProductSection}
                                            onSectionChange={setActiveProductSection}
                                        />
                                    </div>

                                    {/* Products Display */}
                                    <div className="col-12 col-lg-9">
                                        <HorizontalScroller
                                            title={getSectionTitle()}
                                            items={getProductsBySection()}
                                            renderItem={(product, index) => (
                                                <ProductItemCompact
                                                    key={product._id || index}
                                                    product={product}
                                                    columnSize={12}
                                                    highlight={index === 0}
                                                    badgeText={productSections.find(s => s.id === activeProductSection)?.title}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section  >
                            <div className="icon-website mt-5">
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
                            <div className="product-shown-wrapper py-5" style={{ backgroundColor: '#ffffff', marginBottom: '3rem' }}>
                                <div className="container-xxl">
                                    <div className="row">
                                        <div className="col-12">
                                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                                <h2 style={{ 
                                                    fontSize: '4rem', 
                                                    fontWeight: '900',
                                                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                                                    letterSpacing: '2px',
                                                    color: '#111',
                                                    textTransform: 'uppercase',
                                                    marginBottom: '1rem',
                                                    lineHeight: '1.1'
                                                }}>SPOTLIGHT</h2>
                                                <p style={{
                                                    fontSize: '1.1rem',
                                                    color: '#757575',
                                                    fontWeight: '400',
                                                    maxWidth: '700px',
                                                    margin: '0 auto',
                                                    lineHeight: '1.6'
                                                }}>Classic silhouettes and cutting-edge innovation to build your game from the ground up.</p>
                                            </div>
                                            <div style={{ 
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                                gap: '1.5rem',
                                                padding: '1rem 0'
                                            }}>
                                                {[
                                                    { name: 'Electronics', display: 'Electronics', img: 'camera' },
                                                    { name: 'Cameras', display: 'Cameras', img: 'camera' },
                                                    { name: 'Laptops', display: 'Laptops', img: 'gaming' },
                                                    { name: 'Accessories', display: 'Accessories', img: 'mouse' },
                                                    { name: 'Headphones', display: 'Headphones', img: 'speaker' },
                                                    { name: 'Books', display: 'Books', img: 'programming books' },
                                                    { name: 'Sports', display: 'Sports', img: 'gaming' },
                                                    { name: 'Home', display: 'Home', img: 'home gadget' }
                                                ].map((item, index) => (
                                                    <CategoryItem key={index} title={item.display} category={item.name} count="Browse" imgSrc={`/images/youtube/home/${item.img}.png`} />
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
            </div>
        </>
    )
}

export default Home;
