<script lang="ts">
    import type { RepoModel } from "../models/RepoModel";
    import snarkdown from "snarkdown";

    export let repo: RepoModel;

    const updatedDate = repo.updated.toLocaleDateString(
        new Intl.Locale("nl-BE")
    );

    const getReadme = async () => {
        const res = await fetch(
            `https://raw.githubusercontent.com/dewaeq/${repo.name}/${repo.defaultBranch}/README.md`
        );
        const data = await res.text();

        if (!res.ok) {
            throw new Error(data);
        }

        return snarkdown(data);
    };

    const getCommits = async () => {
        const res = await fetch(
            `https://api.github.com/repos/dewaeq/${repo.name}/commits?sha=${repo.defaultBranch}&per_page=1&page=1`,
            {
                headers: {
                    Authorization: "token " + import.meta.env.VITE_AUTH_TOKEN,
                },
            }
        );

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const header = res.headers.get("link");
        const start = header.lastIndexOf("&page=");
        const end = header.lastIndexOf(">");
        const value = header.substring(start + 6, end);

        try {
            return parseInt(value);
        } catch (e) {
            console.error(e);
            return 0;
        }
    };

    let readmeContainer: HTMLDivElement;
    let expand = false;
    const toggleExpand = () => {
        expand = !expand;
        readmeContainer.classList.toggle("collapsed");
    };

    const readmePromise = getReadme();
    const commitsPromise = getCommits();
</script>

<div class="card">
    <header>
        <div class="title">
            <h3>{repo.name}</h3>
            {#if repo.homepage}
                <a href={repo.homepage} target="_blank" rel="noreferrer"
                    >Visit</a
                >
            {/if}
        </div>
        <div class="details">
            <div class="commits">
                {#await commitsPromise then commits}
                    <img class="commit-icon" src="commit.svg" alt="" />
                    <p>{commits}</p>
                {/await}
            </div>

            <p>Updated: {updatedDate}</p>
        </div>
    </header>
    <div class="content">
        {#if repo.description}
            <p>{repo.description}</p>
        {:else}
            <p>No description available</p>
        {/if}
        <button class="readme-btn" on:click={toggleExpand}>
            {expand ? "Hide" : "Show readme"}
        </button>

        <div bind:this={readmeContainer} class="readme collapsed">
            {#await readmePromise then data}
                {@html data}
            {:catch error}
                <p>{error}</p>
            {/await}
        </div>

        <div class="sources">
            <a href={repo.htmlUrl} target="_blank" rel="noreferrer">
                <img class="source-icon" src="github.svg" alt="" />
            </a>
        </div>
    </div>
</div>

<style>
    .card {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0 1rem;
        margin: 1rem;
        background-color: #f9f9f9;
    }

    .readme-btn {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.4em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        transition: border-color 0.25s;
        background-color: #ffffff;
    }

    .readme-btn:hover {
        border-color: #646cff;
    }

    .content .readme {
        max-height: 100vh;
        overflow: hidden;
        transition: max-height 1200ms ease;
    }

    .content .readme.collapsed {
        max-height: 0;
        transition: max-height 500ms ease;
    }

    header {
        display: flex;
        justify-content: space-between;
    }

    .details {
        display: flex;
        place-items: center;
    }

    .details > p {
        white-space: nowrap;
        width: min-content;
    }

    .commits {
        display: flex;
        place-items: center;
        padding-right: 15px;
    }

    .sources {
        display: flex;
        justify-content: end;
    }

    .source-icon {
        height: 3em;
    }

    .commit-icon {
        height: 1em;
        width: 2em;
    }

    @media (orientation: landscape) {
        .card {
            width: 40%;
        }
    }
    @media (orientation: portrait) {
        .card {
            width: 95%;
        }

        .details > p {
            white-space: normal;
        }
    }
</style>
