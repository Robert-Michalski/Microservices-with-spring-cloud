Right now backend propablly will not compile because I am adding via liquibase photos  which you do not have.
Solution - from product-service population remove all <column name image />
I will work on solution which will work without you move a finger but now it is what it is.


### LITTLE DEMO 
https://www.youtube.com/watch?v=8FBAgQ5497M&ab_channel=RobertM

## HOW TO RUN BACKEND
1. Have JDK installed
2. Clone repository
3. Make sure you have any MySQL service running on port 3306, password set in project is **root**
4. Add JWT_SECRET environmental variable to api-gateway and user-service
5. Download all dependencies
6. Run in order Eureka -> config-server -> user-service -> product-service -> order-service -> api-gateway
## HOW TO RUN FRONTEND
1. Have node.js installed
2. Run backend
3. Inside orderms using terminal type
> npm install 
4. Inside orderms using terminal type 
> npm start 

# Order Management System Application
This is a fullstack application with primary goal being to learn microservice architecture.


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
I use bit of Bootsrap mostly because I like it's utility classes.
