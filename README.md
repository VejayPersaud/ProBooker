ProBooker
ProBooker is a dynamic booking system designed to connect customers with local service providers seamlessly. The platform allows users to register as either service providers or customers, enabling them to book services or offer their services.
Table of Contents
•	Project Overview
•	Technologies Used
•	Getting Started
o	Prerequisites
o	Installation
o	Running the Application
•	Features
•	Roadmap
•	Contributing
•	License
Project Overview
ProBooker is a web application that facilitates the booking of services from local providers. Users can create accounts as service providers or customers. Service providers can manage their services and bookings through a dedicated dashboard.
Technologies Used
•	Frontend: React, Next.js, TypeScript, Tailwind CSS
•	Backend: Node.js, Express
•	Database: PostgreSQL (managed via Prisma)
•	Deployment: Docker, Heroku
•	CI/CD: GitHub Actions
•	Code Quality: ESLint, Prettier
Getting Started
Prerequisites
•	Node.js (v14 or higher)
•	npm or yarn
•	PostgreSQL
•	Docker (optional, for deployment)
Installation
1.	Clone the repository:
git clone https://github.com/OzPol/probooker.git
cd probooker
1.	Install dependencies:
npm install

2.	Set up environment variables:
Create a .env file in the root of the project and add the following environment variables:
.env

DATABASE_URL=your_database_url
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

3.	Set up the database:
Run Prisma migrations to set up the database schema:

npx prisma migrate dev --name init
npx prisma generate
4.	Seed the database (optional):
Seed the database with initial data:
npx ts-node prisma/seed.ts
Running the Application
1.	Start the development server:
npm run dev
The application will be available at http://localhost:3000

2.	Running with Docker:
Build and run the Docker container:

docker build -t probooker .
docker run -p 3000:3000 probooker
 
Features
•	User Registration: Users can create an account as a customer or a service provider.
•	Service Provider Registration: Service providers can register and list their services.
•	Service Provider Dashboard: A dashboard for service providers to manage their services and bookings.
•	Email Notifications: Set up email notifications using Nodemailer.
Roadmap
1.	User Registration Page
2.	Service Provider Registration Page
3.	Service Provider Dashboard
4.	Database Setup and Seeding
Contributing
Contributions are welcome! Please follow these steps:
1.	Fork the repository.
2.	Create a new branch (git checkout -b feature-branch).
3.	Make your changes.
4.	Commit your changes (git commit -m 'Add some feature').
5.	Push to the branch (git push origin feature-branch).
6.	Open a pull request.
License
This project is licensed under the MIT License.

