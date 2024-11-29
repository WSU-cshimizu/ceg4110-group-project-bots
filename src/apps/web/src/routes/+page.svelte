<script>
  import { page } from "$app/stores";
</script>

<style>
  :global(body) {
    background-color: #1a237e;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .background-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Full height */
    width: 100vw; /* Full width */
    background-size: cover;
    background-position: center;
    background-blend-mode: overlay;
    background-image: linear-gradient(to top right, rgba(102, 187, 106, 0.6), rgba(244, 143, 177, 0.6)),
      url('https://www.beautifulworld.com/wp-content/uploads/2016/09/Aurora-borealis-1.jpg');
  }

  .header-container {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2rem; /* Responsive padding */
    border-radius: 1.25rem;
    text-align: center;
    width: 90%; /* Ensure responsiveness */
    max-width: 40rem; /* Limit width */
  }

  h1 {
    color: #f1f8e9;
    font-family: Arial, sans-serif;
    font-size: clamp(2rem, 10vw, 6rem); /* Responsive font size */
    text-shadow: 1px 0 10px white, 1px 0 30px #76ff03;
    margin: 0;
  }

  p {
    color: white;
    font-size: clamp(1rem, 2vw, 1.5rem); /* Responsive font size */
    font-family: Arial, sans-serif;
    text-shadow: 1px 0 10px white, 1px 0 30px black;
    margin: 1rem 0;
  }

  button {
    color: #f1f8e9;
    border-radius: 0.9375rem;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 1rem 1.5rem;
    border: none;
    outline: none;
    font-family: Arial, sans-serif;
    font-size: clamp(1.5rem, 5vw, 2.5rem); /* Responsive font size */
    text-shadow: 1px 0 10px white, 1px 0 30px #76ff03;
    margin-top: 1rem;
    cursor: pointer;
    transition: transform 0.2s ease, text-shadow 0.2s ease, color 0.2s ease;
  }

  button:hover {
    color: rgb(255, 194, 237);
    text-shadow: 1px 0 10px white, 1px 0 30px #f48fd2;
  }
</style>

<div class="background-container">
  <div class="header-container">
    <h1>Welcome</h1>
    <p>
      Borealis Bot is an all-in-one discord bot made to add some extra flair to your servers. It's reliable, fast, and
      easy to use, perfect for any server getting started!
    </p>
    <div>
      <a href="serverList">
        <button>Add to Discord</button>
      </a>
    </div>
  </div>
</div>