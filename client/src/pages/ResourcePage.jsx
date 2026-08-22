import "./InfoPages.css";

const pageContent = {
    library: {
        label: "Library",
        title: "Your coding reference library.",
        description: "Keep useful concepts close while you practice and prepare for interviews.",
        items: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Dynamic Programming", "Sorting & Searching", "Complexity Basics"]
    },
    explore: {
        label: "Explore",
        title: "Find your next coding challenge.",
        description: "Explore problem-solving topics and build a stronger daily practice routine.",
        items: ["Beginner-friendly problems", "Popular algorithms", "String challenges", "Math challenges", "Interview preparation", "Practice streaks"]
    },
    "study-plan": {
        label: "Study Plan",
        title: "Build a plan that fits your goals.",
        description: "Start with fundamentals, solve consistently, and track your progress over time.",
        items: ["Week 1: Arrays", "Week 2: Strings", "Week 3: Linked Lists", "Week 4: Stacks & Queues", "Week 5: Trees", "Week 6: Revision"]
    },
    query: {
        label: "Question Query",
        title: "Questions, feedback, and support.",
        description: "Need help with CodeArea or have a suggestion? Visit Help & Support to contact us.",
        items: ["Ask for platform support", "Share improvement ideas", "Report an issue", "Request a topic", "Get coding guidance", "Contact the CodeArea team"]
    }
};

function ResourcePage({ type }) {
    const page = pageContent[type];

    return (
        <main className="info-page">
            <section className="info-hero">
                <span className="info-kicker">{page.label}</span>
                <h1>{page.title}</h1>
                <p>{page.description}</p>
            </section>
            <section className="feature-grid">
                {page.items.map((item) => (
                    <article className="feature-card" key={item}>
                        <h2>{item}</h2>
                        <p>More content and guided practice are coming to this section soon.</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default ResourcePage;
