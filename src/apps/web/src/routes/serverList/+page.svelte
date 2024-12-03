<script lang="ts">
  import { page } from "$app/stores";
  export let userGuilds = [];

  let items = userGuilds
    .filter((guild) => 3 >> guild.permissions === 0)
    .map((guild) => ({
      name: guild.name,
      imageUrl: guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
        : "https://via.placeholder.com/150", // Default placeholder image
      mode: guild.permissions & (1 << 3) ? "manage" : "add",
    }));

  items.sort((a, b) => (b.mode === "manage" ? 1 : -1));

  function toggleMode(item) {
    item.mode = item.mode === "add" ? "manage" : "add";
  }
</script>

<div class="min-h-screen bg-black/50 flex items-center justify-center">
  <div class="bg-black bg-opacity-75 rounded-2xl shadow-lg p-10 w-4/5 md:w-3/5 lg:w-2/5 text-center">
    <div class="text-white text-6xl md:text-8xl font-bold mb-8 drop-shadow-md animate-custom-pulse drop-shadow-[0_0_5px_rgba(0,0,0,1)]">
      Servers
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each items as item}
        <div class="bg-gray-900 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            class="w-24 h-24 rounded-full mb-4 border-2 border-green-400"
          />
          <p class="text-lg font-semibold mb-4 drop-shadow-[0_0_5px_rgba(0,0,0,1)]">{item.name}</p>
          <a href={item.mode === "manage" ? "/manage" : "#"}> 
            <button
              class="bg-green-400 hover:bg-pink-300 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
              on:click={(event) => {
                if (item.mode === "add") {
                  event.preventDefault(); // Prevent the action for "add" mode
                } else {
                  toggleMode(item); // Allow action for "manage" mode
                }
              }}
              disabled={item.mode === "add"} 
            >
              {item.mode === "add" ? "Add" : "Manage"}
            </button>
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>