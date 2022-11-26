<script lang="ts">
    import { Router, Link, Route } from "svelte-navigator";
    import About from "./routes/About.svelte";
    import Home from "./routes/Home.svelte";
    import Privacy from "./routes/Privacy.svelte";
</script>

<Router>
    <header>
        <h1>History</h1>

        <nav>
            <Link to="home">Home</Link>
            <Link to="about">About</Link>
            <Link to="privacy">Privacy</Link>
        </nav>
    </header>

    <main>
        <Route path="/" component={Home} />
        <Route path="privacy" component={Privacy} />
        <Route path="about" component={About} />

        <Route>
            <h3>Default</h3>
            <p>No Route could be matched.</p>
        </Route>
    </main>
</Router>