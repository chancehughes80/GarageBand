# Mechanics Database
The Mechanics Database is a basic application used for the management of information regarding a mechanic garage. This application gives information on vehicles and customers that enter the garage. It also gives information on employees, repairs, and parts. This application allows employees to create, read, update, and delete all information regarding the database. Customers can view repair status and update their own personal and vehicle information.

## Setup
1. Using the method of your choice Install the latest version of [Postgres](https://www.postgresql.org/download/macosx/), [Node.js](https://nodejs.org/en/download/package-manager/#windows) and [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
2. Clone the repository
3. Enter the root folder: ` cd mechanics-database`<br>
In the mechanics-database folder you should see two folders, backend and frontend
1. Start first with running the command: `yarn install` 
4. Now enter into the backend folder: `cd backend` and run the command: `npm install`
    * This ensures that the packages needed to run the login and backend api are installed.
5. Now enter into the frontend folder and run the command: `yarn install`
    * This ensures what’s needed for the frontend is installed
6. You are now ready to use the application


## Running Locally and Testing:
1. Enter into mechanics-database folder and run the command: `yarn start`
    * This will run the three parts needed for the application concurrently
2. Open up your browser and go to localhost:3000 to see the application


### Using the Application
1. At localhost:3000 you'll be greeted with a login screen giving you the option to log in as an employee or a customer
  * Enter any of the following ID and password pairs to log in as an employee:
    * You'll be able to see more pairings for the employees and customer login once logged in as an employee
  * | Employee Id | Password |
    | ------------| ---------|
    | 111         | magic    |
    | 123         | nickoberg|
  * Enter any of the following ID and password pairs to log in as a customer:
  * | Customer Id | Password |
    | ------------| ---------|
    | 399         | guessit  |
    | 455         | airjordan|
### Employee Side
1. Once logged in as an employee you'll be redirected to the employee home page where you'll be presented with the options to go to the Employee, Vehicle, Parts, Customer or Repair views either by clicking on their image or through the navigation bar <img width="500" alt="Screen Shot 2021-08-07 at 7 49 26 PM" src="https://user-images.githubusercontent.com/70956807/128617350-39983b52-d2b9-422b-a17b-a3abd37eed08.png">
2. In each of these views, you'll see their corresponding information in tables, like so: <img width="500" alt="Screen Shot 2021-08-07 at 7 57 52 PM" src="https://user-images.githubusercontent.com/70956807/128617396-fd165d2a-7d2c-4c63-83e3-073d5be8ac69.png">
3. Each of these tables function the same way, with the ability to search for specific entries, sort by the column categories, add new entries, update and delete
    * Search for entries with the search bar at the top right
      * <img width="500" alt="Screen Shot 2021-08-07 at 8 01 58 PM" src="https://user-images.githubusercontent.com/70956807/128617495-62653fdd-697d-420e-b4f1-cb881c7e6281.png">
    * To add new entries click the button next to the search bar <img width="263" alt="Screen Shot 2021-08-07 at 8 02 24 PM" src="https://user-images.githubusercontent.com/70956807/128617565-11c68bc6-78b6-4679-9c97-00b30378ad53.png">
      * Enter the corresponding information and then click save <img width="500" alt="Screen Shot 2021-08-07 at 8 03 04 PM" src="https://user-images.githubusercontent.com/70956807/128617582-f33751bc-b64a-4bf1-bd7c-cae695ac639a.png"> <br> The page will reload and your new entry should be present in the table
    * To update and entry click on the edit button on the far left of a row <img width="263" alt="Screen Shot 2021-08-07 at 8 17 24 PM" src="https://user-images.githubusercontent.com/70956807/128617714-51578a7c-6da1-4891-bc92-4914d2c1388d.png">

      * Enter the corresponding information and then click save <img width="500" alt="Screen Shot 2021-08-07 at 8 17 33 PM" src="https://user-images.githubusercontent.com/70956807/128617720-0ead2faa-a625-4733-84bb-f7510064d1a6.png">
<br> The page will reload and the updated info will now be present 
        * *Note: some of the values are not editable due to being a key*
    * To delete an entry simply click the delete button next to edit and confirm <img width="202" alt="Screen Shot 2021-08-07 at 8 21 33 PM" src="https://user-images.githubusercontent.com/70956807/128617769-9c0f8ac6-4eb1-4c94-a9a0-737cb7fb6971.png">
4. Click the logout button in the navigation bar when done
### Customer Side 
1. A customer sees a similar but more restricted view, showing information soley for them <img width="500" alt="Screen Shot 2021-08-07 at 8 25 45 PM" src="https://user-images.githubusercontent.com/70956807/128617834-a3a45ed3-5bfa-4b29-ae82-7e81d99186f4.png">

### Remarks
1. In case there are any errors with the start or login of the app, clear your cookies and/or delete the token found in localstorage
    * localstorage is accesible in your browser's developer tools

 
















