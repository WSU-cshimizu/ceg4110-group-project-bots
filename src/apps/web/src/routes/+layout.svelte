<script>
  import { page } from "$app/stores";
  import "../app.css";
</script>

<div
  class="relative h-screen w-screen bg-cover bg-center bg-no-repeat"
  style="background-image: url('https://www.beautifulworld.com/wp-content/uploads/2016/09/Aurora-borealis-1.jpg');"
>
  <div class="absolute top-0 left-0 w-full bg-black bg-opacity-100 p-4 flex items-center z-10">
    <ul class="flex space-x-4 list-none m-0 p-0">
      <li>
        <a href="/">
          <button class="text-green-100 bg-transparent border-none outline-none font-sans text-4xl cursor-pointer animate-custom-pulse drop-shadow-[0_0_5px_rgba(0,0,0,1)]">
            Borealis Bot
          </button>
        </a>
      </li>
    </ul>
  </div>

  {#if $page.url.pathname === '/manage'}
    <a href="/serverList">
      <button class="absolute left-4 top-20 text-green-100 bg-transparent border-none outline-none font-sans text-2xl cursor-pointer hover:text-pink-300 transition-colors z-20">
        Back to server list
      </button>
    </a>
  {/if}

  <main class="absolute top-0 left-0 w-full h-full z-0 overflow-y-auto">
    <slot />
  </main>
</div>
