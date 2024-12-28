# Pokedex App![pokeball_optimized](https://github.com/user-attachments/assets/b3fc2037-6110-4fd3-8073-ab7183d166ba)


## Overview
This project is built using [Next.js](https://nextjs.org), a React-based framework, and features GitHub OAuth integration for user authentication. The application was deployed on [Vercel](https://vercel.com) with environment configurations tailored for both local and production setups.

## Getting Started

### Installation and Running the Application
1. Clone the repository:
   ```bash
   git clone https://github.com/aaditya9899/pokedex-app.git
   cd pokedex-app
   ```

2. Install dependencies:
   ```bash
   npm install
   
   ```

3. Create an `.env.local` file for environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Features
- **Authentication**: User login with GitHub OAuth using [NextAuth.js](https://next-auth.js.org/).
- **Environment-Specific Configurations**: Local and production setups handled seamlessly.
- **Tailwind CSS for Styling**: Responsive and modern UI achieved with minimal effort.

## Technologies Used
- **Next.js**: For server-side rendering, routing, and API routes.
- **NextAuth.js**: To enable secure and scalable authentication.
- **Tailwind CSS**: For easy-to-use utility-first styling.

## Challenges and Solutions
1. **OAuth Configuration**:
   - **Challenge**: Setting up GitHub OAuth for local and production environments.
   - **Solution**: Carefully managing environment variables and referring to [NextAuth.js documentation](https://next-auth.js.org/).

2. **Styling Issues**:
   - **Challenge**: Initially faced difficulties with consistent styling across components.
   - **Solution**: Leveraged the [Tailwind CSS documentation](https://tailwindcss.com/docs) to address specific issues and streamline the styling process.

3. **Deployment Setup**:
   - **Challenge**: Managing differing environment variables between local development and Vercel deployment.
   - **Solution**: Configured Vercel environment variables through its settings dashboard and ensured compatibility with `.env.local` during local development.

## Deployment
The project is deployed on (https://pokedex-app-aadityaprasad.vercel.app/) Vercel’s integration with GitHub allowed for automated deployments upon each commit.


## Final Thoughts
This project was an enriching experience. I thoroughly enjoyed working with Next.js and NextAuth.js to implement secure authentication. While challenges arose, such as styling and deployment setup, the comprehensive documentation from Tailwind CSS and Next.js proved immensely helpful. Overall, I enjoyed building and deploying this application.

