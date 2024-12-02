<script lang="ts">
  import { actions } from './+page.server'; // Make sure actions are imported correctly.

  // The function that handles the login
  const loginToDiscord = async () => {
    // Initiate the OAuth login flow
    window.location.href = `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=identify+guilds`;
  };
</script>

<div class="flex items-center justify-center h-screen bg-indigo-900">
  <div
    class="relative flex flex-col items-center justify-center h-screen w-screen bg-cover bg-center bg-blend-overlay"
    style="background-image: linear-gradient(to top right, rgba(102, 187, 106, 0.6), rgba(244, 143, 177, 0.6)), url('https://www.beautifulworld.com/wp-content/uploads/2016/09/Aurora-borealis-1.jpg');"
  >
    <div class="bg-black bg-opacity-75 p-8 rounded-xl text-center w-11/12 max-w-2xl">
      <h1 class="text-green-100 text-4xl md:text-6xl font-sans font-bold drop-shadow-lg">
        Welcome
      </h1>
      <p class="text-white mt-4 text-lg md:text-xl font-sans drop-shadow-lg">
        Borealis Bot is an all-in-one discord bot made to add some extra flair to your servers. 
        It's reliable, fast, and easy to use. Perfect for any server getting started!
      </p>
      <div class="mt-6">
        <button
          on:click={loginToDiscord}
          class="text-green-100 bg-black bg-opacity-75 px-6 py-3 rounded-lg text-xl md:text-2xl font-sans font-bold transition transform hover:scale-105 hover:text-pink-200 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
        >
          Login to Discord
        </button>
      </div>
    </div>
  </div>
</div>
