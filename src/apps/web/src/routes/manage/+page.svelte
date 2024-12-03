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

    let activeTabs = []; // Track the indices of open tabs

    function toggleTab(index) {
        if (activeTabs.includes(index)) {
            // If the tab is already open, close it
            activeTabs = activeTabs.filter((i) => i !== index);
        } else {
            // Otherwise, add it to the open tabs
            activeTabs = [...activeTabs, index];
        }
    }

    function toggleMode(item) {
        item.mode = item.mode === "add" ? "manage" : "add";
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-black/50">
    {#if $page.url.pathname === '/manage'}
        <a href="/serverList">
            <button class="absolute left-4 top-4 text-green-100 bg-transparent border-none outline-none font-sans text-4xl cursor-pointer hover:text-pink-300 transition-colors z-20">
                Back to server list
            </button>
        </a>
    {/if}

    <div class="bg-black bg-opacity-75 rounded-xl shadow-lg text-center w-4/5 p-10">
        <h1 class="text-white text-5xl font-bold mb-6 drop-shadow-lg animate-custom-pulse drop-shadow-[0_0_5px_rgba(0,0,0,1)]">
            Server Name
        </h1>
        <div class="space-y-4">
            {#each tabs as tab, tabIndex}
                <div class="bg-emerald-400 font-bold text-black px-6 py-3 text-left rounded-lg cursor-pointer text-xl shadow-md hover:bg-pink-300 transition duration-300"
                     on:click={() => toggleTab(tabIndex)}>
                    <span class="underline">{tab.name}</span>
                    <span class="ml-2 text-black" style="font-size: 1.5rem;">
                        {activeTabs.includes(tabIndex) ? "-" : "+"}
                    </span>
                </div>
                <div class={`mt-4 p-4 rounded-lg bg-transparent shadow-inner ${activeTabs.includes(tabIndex) ? 'block' : 'hidden'}`}>
                    <div class="flex flex-wrap gap-4">
                        {#each tab.content as item}
                            <div class="bg-black text-white p-4 rounded-lg shadow-md w-60">
                                <p class="text-lg font-bold">{item.functionName}</p>
                                <p class="text-sm text-gray-400">{item.description}</p>
                                <button
                                    class="mt-4 bg-emerald-400 hover:bg-pink-300 text-black py-2 px-4 rounded-lg transition duration-300"
                                    on:click={() => toggleMode(item)}>
                                    {item.mode === "add" ? "Add" : "Manage"}
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
