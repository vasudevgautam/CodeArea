import "./InfoPages.css";

function Help() {
    return (
        <main className="info-page">
            <section className="info-hero">
                <span className="info-kicker">Help &amp; Support</span>
                <h1>Need help with CodeArea?</h1>
                <p>Contact us for help, feedback, or suggestions to improve the platform.</p>
            </section>

            <section className="contact-card">
                <h2>Contact Vasudev</h2>
                <p>Built for developers who want a simple, focused coding-practice experience.</p>
                <div className="contact-list">
                    <a href="tel:+917678971445"><span>Phone</span>+91 76789 71445</a>
                    <a href="mailto:vasudevkumar1445@gmail.com"><span>Email</span>vasudevkumar1445@gmail.com</a>
                </div>
            </section>
        </main>
    );
}

export default Help;
