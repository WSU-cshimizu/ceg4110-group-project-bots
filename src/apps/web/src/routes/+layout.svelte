<script>
    import "../app.css";
    import { page } from "$app/stores";
</script>


<style lang="postcss">
    html, body {
        height: 100%;
        margin: 0;
    }

    .background-container {
        position: relative;
        height: 100vh;
        width: 100vw;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url('https://www.beautifulworld.com/wp-content/uploads/2016/09/Aurora-borealis-1.jpg');
        overflow: hidden;
    }

    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 1);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        z-index: 10;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    button {
        color: #f1f8e9;
        background-color: transparent;
        border: none;
        outline: none;
        font-family: Arial;
        font-size: 50px;
        text-shadow: white 1px 0 10px, #76ff03 1px 0 30px;
        cursor: pointer;
        animation: colorChange 20s infinite alternate;
    }
</style>

<div class="background-container">
    <div class="header">
        <ul>
            <a href="/">
                <button>Borealis Bot</button>
            </a>
            {#if $page.url.pathname === '/manage'}
                <a href="/serverList">
                    <button>Server List</button>
                </a>
            {/if}
        </ul>
    </div>
    <slot />
</div>