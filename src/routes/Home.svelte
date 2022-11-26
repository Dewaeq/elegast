<script lang="ts">
    import Repo from "../components/Repo.svelte";
    import { RepoModel } from "../models/RepoModel";

    const getRepos = async () => {
        const res = await fetch("https://api.github.com/users/dewaeq/repos", {
            headers: {
                Authorization: "token " + import.meta.env.VITE_AUTH_TOKEN,
            },
        });
        const data = await res.json();

        if (!res.ok) {
            throw Error(data);
        }

        const repos = data.map((repo) => RepoModel.fromJson(repo));

        repos.sort((a, b) => b.updated.getTime() - a.updated.getTime());
        return repos;
    };

    const promise = getRepos();
</script>

<header>
    <h1>Projects:</h1>
</header>

<main>
    {#await promise}
        <h1>Loading</h1>
    {:then data}
        {#each data as repo}
            <Repo {repo} />
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</main>

<footer>
    <p>Dewaeq 2022</p>
</footer>

<style>
</style>
