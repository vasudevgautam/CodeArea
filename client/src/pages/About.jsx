import "./InfoPages.css";

const features = [
    ["Practice Coding", "Solve a wide range of programming problems."],
    ["Improve Your Skills", "Strengthen your DSA and problem-solving abilities."],
    ["Track Your Progress", "Keep track of your submissions and coding activity."],
    ["Bookmark Problems", "Save important problems for future practice."],
    ["Submit & Learn", "Submit your solutions and learn from your results."],
    ["Built for Developers", "A simple and focused platform for coding practice."]
];

function About() {
    return (
        <main className="info-page">
            <section className="info-hero">
                <span className="info-kicker">About CodeArea</span>
                <h1>Practice with purpose. Grow with every solution.</h1>
                <p>
                    CodeArea is a focused coding-practice platform built to help
                    developers learn, solve, and improve every day.
                </p>
            </section>

            <section className="feature-grid">
                {features.map(([title, description]) => (
                    <article className="feature-card" key={title}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default About;
