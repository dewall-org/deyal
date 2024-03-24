import React from 'react';
import Posts from '../components/Posts/Posts';

const Home = () => {
    return (
        <div className="site-container">
            <main className="content-wrap">
                <section className="home">
                    <div className='container py-5'>
                        <div className="heading py-3">
                            <h2 className='section-heading lang-ban'>দেয়াল</h2>
                            <h4 className='section-sub-heading lang-ban'> অনুভুতি গুলো দেয়ালে তুলুন... </h4>
                        </div>
                        <div className="posts">
                            <Posts />
                        </div>
                    </div>
                </section>
            </main>
            <footer className="footer py-2" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center text-md-start">All Rights Reserved &copy; 2024</div>
                        <div className="col-md-3 text-center text-md-end pe-0 pe-md-3">Crafted By Xayed and Uthsob</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
