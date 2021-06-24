import './styles.scss';
import React from 'react';

export const Styles = () => {
    return (
        <main>
            <div className="container">
                <h1>General Styles</h1>
                <section>
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <h4>Heading 4</h4>
                    <h5>Heading 5</h5>
                    <h6>Heading 6</h6>

                </section>
                <section>
                    <h2>Colors</h2>
                    <p>Does it still look like a Ninja-Turtle-Color-Theme? :-)</p>
                    <div>
                        <div className="card">
                            <div className="color bg-primary"></div>
                            <h5>$primary</h5>
                            <pre>
                                className="bg-primary"
                            </pre>
                        </div>

                        <div className="card">
                            <div className="color bg-primary-light"></div>
                            <h5>$primary-light</h5>
                            <pre>
                                className="bg-primary-light"
                            </pre>
                        </div>

                        <div className="card">
                            <div className="color bg-secondary"></div>
                            <h5>$secondary</h5>
                            <pre>
                                className="bg-secondary"
                            </pre>
                        </div>

                        <div className="card">
                            <div className="color bg-secondary-light"></div>
                            <h5>$secondary-light</h5>
                            <pre>
                                className="bg-secondary-light"
                            </pre>
                        </div>

                        <div className="card">
                            <div className="color bg--black"></div>
                            <h5>$black</h5>
                            <pre>
                                className="bg--black"
                            </pre>
                        </div>

                        <div className="card">
                            <div className="color bg--white"></div>
                            <h5>$white</h5>
                            <pre>
                                className="bg--white"
                            </pre>
                        </div>
                    </div>
                    
                </section>
            </div>
        </main>
    );
  }