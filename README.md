## HOW TO RUN BACKEND
1. Clone repository
2. Make sure you have any MySQL service running on port 3306, password set in project is **root**
3. Add JWT_SECRET environmental variable to api-gateway and user-service
4. Download all dependencies
5. Run in order Eureka -> config-server -> user-service -> product-service -> order-service -> api-gateway
## HOW TO RUN FRONTEND
1. Run backend
2. Inside orderms using terminal type >npm install 
3. Inside orderms using terminal type >npm start 

# Order Management System Application
This is a fullstack application with primary goal being to learn microservice architecture.
I was modeling this project https://1000projects.org/order-management-system-for-steel-fabrication-factory-java-project.html

# TECH STACK

| Database | Backend       | Fronted | Testing      |
|----------|---------------|---------|--------------|
|MySQL     |Spring         |React    |Junit 5       |
|Liquibase |Spring boot*   |Axios    |Testcontainers|
|          |Spring cloud*  |Bootstrap|              |
|          |Jwt            |         |              |

Spring boot: JPA, Security, Web, Webflux 
Spring cloud: Gateway, Eureka, Config server 

## Backend

Backend is a Spring application. It consists of different modules.
If possible, I try to make use of shared properties with Spring Cloud Config Server via GitHub
Every web server in application is being discovered by Eureka Discovery Server, then routes are being redirected thanks to Spring cloud gateway.

Authentication is done in user-service. Here JWT is generated and passed as a header.

## Frontend

Frontend is made with React. To connect with backend I use Axios library.
CSS is heavily dependent on Bootstrap
