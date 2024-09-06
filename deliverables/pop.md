# Project Overview Proposal

## Name of the Proposed Project

**Multi-Purpose Discord Bot**

## Elevator Pitch

We're excited to create the Multi-Purpose Discord Bot for the Esports Club at Wright State University. Our goal is to make event management and communication easier and more efficient. The bot will handle role management, assist with event registration, and send real-time alerts. By bundling these features into one platform, we hope to boost member engagement and simplify administrative tasks, letting the club focus more on gaming and less on the logistics.

## Team and Responsibilities

Our team is made up of four members, each bringing their expertise to different parts of the bot:

1. **Frontend Development: Jared**

   - Jared will build the user interface using Svelte. This means he’ll create an easy-to-use web interface where members can log in with their Discord accounts, manage roles, sign up for events, and see alerts.

2. **Backend Development: Josh**

   - Josh will work on connecting the backend of our system with the Discord bot. He’ll handle the data exchange between the bot and the frontend, manage user logins, and make sure everything communicates smoothly with the Discord API.

3. **Discord Bot Implementation: Ishan**

   - Ishan will develop the core features of the Discord bot using discord.js. He’ll set up functionalities for managing roles, processing event registrations, and sending out automated alerts and notifications.

4. **Database Management: Gani**
   - Gani will manage our MongoDB database. This includes setting up the database schema, handling data storage and retrieval, and making sure everything stays consistent. This will support features like event registrations and user profiles.

## Components of the Bot

1. **Frontend Interface**

   - We’ll use Svelte to create a web interface where users can log in with their Discord accounts. From here, they’ll manage roles, register for events, and view alerts. We want the interface to be intuitive and responsive, making it easy for everyone to use.

2. **Backend Integration**

   - The backend, also built with Svelte, will link the web interface with the Discord bot and the MongoDB database. It will handle tasks like user authentication and data processing, ensuring smooth interactions between the different parts of our system.

3. **Discord Bot**

   - Using discord.js, the bot will manage all the Discord-specific tasks. This includes role assignments, event registration, and sending alerts and notifications to users in Discord servers.

4. **Database**
   - MongoDB will be our choice for managing data. It will store user details, event info, and bot settings, providing a reliable and scalable solution to support all of the bot’s features.

## System Architecture

We’re planning a client-server setup where users interact with the bot through a web-based frontend. The frontend, created with Svelte, will let users log in with their Discord accounts and manage their interactions with the bot. The backend, also in Svelte, will connect the frontend with the Discord bot and MongoDB database. The Discord bot, implemented using discord.js, will handle requests and commands from Discord servers and communicate with the backend to update or retrieve information. This setup will ensure that everything works together smoothly, creating a seamless user experience.

## Technology Stack

- **Frontend:** Svelte

  - **Why Svelte:** Svelte is perfect for creating interactive user interfaces. It’s efficient and allows us to build a dynamic, responsive web experience.

- **Backend:** SvelteKit (Full-stack)

  - **Why Svelte:** SvelteKit is made by the same organization that made Svelte and it is the perfect pair to use with Svelte for the backend of the bot. Using SvelteKit for keeps our development consistent and streamlined, as we’re working with a single technology stack.

- **Discord Bot:** discord.js

  - **Why discord.js:** This popular library is great for interacting with the Discord API. It offers solid functionality for building and managing bots with ease.

- **Database:** MongoDB
  - **Why MongoDB:** MongoDB is flexible and scalable, handling a wide range of data types and supporting complex queries. It’s a great fit for our needs.

## Development Approach

We’ll use Agile methodology for this project, with sprints lasting between one week and ten days. Each sprint will focus on specific features and deliverables, allowing us to iterate and adjust our goals as needed. This approach will help us stay flexible, incorporate feedback, and continuously improve the project. Regular meetings and sprint reviews will keep the team aligned and address any challenges, ensuring we stay on track and refine the project as we go.
