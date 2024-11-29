<script>
    import "/src/app.css";
    import { page } from "$app/stores";
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    let items = [
        { name: "Placeholder Name 1", mode: "add" },
        { name: "Placeholder Name 2", mode: "manage" },
        { name: "Placeholder Name 3", mode: "add" },
        { name: "Placeholder Name 4", mode: "manage" },
        { name: "Placeholder Name 5", mode: "add" },
        { name: "Placeholder Name 6", mode: "add" },
        { name: "Placeholder Name 7", mode: "manage" },
        { name: "Placeholder Name 8", mode: "add" },
        { name: "Placeholder Name 9", mode: "manage" }
    ];

    function toggleMode(item) {
        item.mode = item.mode === "add" ? "manage" : "add";
    }

    items.sort((a, b) => (b.mode === "manage" ? 1 : -1));
</script>

<style>
    body {
        background-color: #1a237e;
        display: flex;
        justify-content: center;
        align-items: center;    
        height: 100vh;    
        margin: 0;
    }

    .content-wrapper {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        padding: 10vh 10vw;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 80%;
        transform: translateY(-50%)
        position: relative;
        top: 50%;
        margin: auto;
        height: 100%;
    }

    .title {
        color: white;
        font-size: 100px;
        font-family: Arial, sans-serif;
        margin-bottom: 20px;
        text-shadow: 1px 0 10px white, 1px 0 30px #76ff03;
        animation: colorChange 20s infinite alternate;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        justify-items: center;
        max-width: 80%;
        margin: 0 auto;
        padding-top: 20px; /* Space to push grid content down */
    }

    .box {
        background-color: black;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 200px;
    }

    .name {
        font-size: 18px;
        font-family: Arial, sans-serif;
        color: #333;
        margin: 10px 0;
    }

    .button {
        color: black;
        border-radius: 15px;
        background-color: #69f0ae;
        padding: 10px 20px;
        border: none;
        font-family: Arial, sans-serif;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: rgb(255, 194, 237);
    }
</style>

<div class="content-wrapper">
    <div class="title">Servers</div>
    <div class="container">
        {#each items as item}
            <div class="box">
                <p class="name" style="color:white">{item.name}</p>
                <a href="/manage">
                    <button class="button" on:click={() => toggleMode(item)}>
                        {item.mode === "add" ? "Add" : "Manage"}
                    </button>
                </a>
            </div>
        {/each}
    </div>
</div>