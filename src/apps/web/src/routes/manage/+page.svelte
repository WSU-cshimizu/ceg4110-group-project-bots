<script>
    import "/src/app.css";
    import { page } from "$app/stores";
    let tabs = [
        {
        name: "Tab 1",
        content: [
            { functionName: "Function 1", description: "Description of Function 1", mode: "add" },
            { functionName: "Function 2", description: "Description of Function 2", mode: "manage" }
        ]
        },
        {
        name: "Tab 2",
        content: [
            { functionName: "Function 3", description: "Description of Function 3", mode: "add" },
            { functionName: "Function 4", description: "Description of Function 4", mode: "manage" }
        ]
        },
        {
        name: "Tab 3",
        content: [
            { functionName: "Function 5", description: "Description of Function 5", mode: "add" },
            { functionName: "Function 6", description: "Description of Function 6", mode: "manage" }
        ]
        }
    ];

    let openTabs = [];

    function toggleTab(index) {
        if (openTabs.includes(index)) {
        openTabs = openTabs.filter(i => i !== index);
        } else {
        openTabs.push(index);
        }
    }

    function toggleMode(item) {
        item.mode = item.mode === "add" ? "manage" : "add";
    }
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
        padding: 100px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 80%;
        max-width: 800px;
    }

    .title {
        color: white;
        font-size: 100px;
        font-family: Arial, sans-serif;
        margin-bottom: 20px; 
        text-shadow: 1px 0 10px white, 1px 0 30px #76ff03;
        animation: colorChange 20s infinite alternate;
    }

    .tabs {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .tab {
        font-family: Arial;
        background-color: #69f0ae;
        color: black;
        padding: 15px;
        border-radius: 10px;
        cursor: pointer;
        text-align: left;
        font-size: 20px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
    }

    .tab:hover {
        background-color: rgb(255, 194, 237);
    }

    .tab-content {
        display: none;
        margin-top: 10px;
        background-color: #69f0ae;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .tab-content.open {
        display: block;
    }

    .box {
        background-color: black;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        text-align: center;
    }

    .function-name {
        font-family: Arial;
        font-size: 18px;
        color: #333;
        margin: 10px 0;
    }

    .description {
        font-family: Arial;
        font-size: 14px;
        color: #666;
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
        margin-top: 10px;
    }

    .button:hover {
        background-color: rgb(255, 194, 237);
    }
</style>

<div class="content-wrapper">
    <div class="title">Server Name</div>
    <div class="tabs">
        {#each tabs as tab, tabIndex}
            <div class="tab" on:click={() => toggleTab(tabIndex)}>
                {tab.name}
            </div>
            <div class="tab-content {openTabs.includes(tabIndex) ? 'open' : ''}">
                {#each tab.content as item}
                    <div class="box">
                        <p class="function-name" style="color: white">{item.functionName}</p>
                        <p class="description" style="color: white">{item.description}</p>
                        <button class="button" on:click={() => toggleMode(item)}>
                            {item.mode === "add" ? "Add" : "Manage"}
                        </button>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
