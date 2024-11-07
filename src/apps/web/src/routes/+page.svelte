<script>
    import "../app.css";
    import { page } from "$app/stores";
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

    .background-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: center;
        background-blend-mode: overlay;
        background-image: linear-gradient(to top right, rgba(102, 187, 106, 0.6), rgba(244, 143, 177, 0.6)),
            url('https://www.beautifulworld.com/wp-content/uploads/2016/09/Aurora-borealis-1.jpg');
    }

    .header-container {
        background-color: rgba(0, 0, 0, 0.5);
        padding: 20px 40px;
        border-radius: 20px;
        text-align: center;
    }

    p {
        color: white;
        font-size: 17px;
        font-family: Arial, sans-serif;
        text-shadow: 1px 0 10px white, 1px 0 30px black;
    }

    h1 {
        color: #f1f8e9;
        font-family: Arial, sans-serif;
        font-size: 300px;
        text-shadow: 1px 0 10px white, 1px 0 30px #76ff03;
        margin: 0;

    }

    button {
        color: #f1f8e9;
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.75);
        padding:20px 20px;
        border: none;
        outline: none;
        font-family: Arial, sans-serif;
        font-size: 50px;
        text-shadow: 1px 0 10px white, 1px 0 30px #76ff03;
        margin-top: 1rem;
        transform: translateX(450px);
        cursor: pointer;
    }


    button:hover {
        color: rgb(255, 194, 237);
        text-shadow: 1px 0 10px white, 1px 0 30px #f48fd2;
    }
</style>

<body>
    <div class="background-container">
        <div class="header-container">
            <h1>Welcome</h1>
            <p>Borealis Bot is an all-in-one discord bot made to add some extra flair to your servers. It's reliable, fast, and easy to use, perfect for any server getting started!</p>
            <div class>
                <!--<a href="https://discord.com/api/oauth2/authorize?client_id=1296491638973268055&redirect_uri=https%3A%2F%2Fyourdomain.com%2FserverList&response_type=code&scope=identify%20guilds">-->
                <a href="serverList">
                    <button>Add to Discord</button>
                </a>
            </div>
        </div>
    </div>
</body>
