# OrderMyFood

An online food ordering system developed using MEAN (MongoDB, ExpressJS, Angular, NodeJS) with jwt authentication enabled and password encrypted.
  
Live Demo: https://order-my-food-online.herokuapp.com/

## Screenshots

- **Minimalist Registration and Login Page**
  ![image](https://user-images.githubusercontent.com/36665975/100368451-9cf49880-3029-11eb-8444-d4ac1ba00cce.png)

  ![image](https://user-images.githubusercontent.com/36665975/100368481-a5e56a00-3029-11eb-9a19-524131dc7e4e.png)

- **Home Page having list of hotels**
![image](https://user-images.githubusercontent.com/36665975/99675575-61902200-2a9d-11eb-94b4-a8f753e4e5b7.png)

- **Searching - We can search for hotel names, cuisines, location, etc**
![image](https://user-images.githubusercontent.com/36665975/99675651-78cf0f80-2a9d-11eb-8b42-9afc7dfb4efb.png)

- **Sorting - We can sort them by Name(default), Reviews and Ratings**
![image](https://user-images.githubusercontent.com/36665975/99675703-8c7a7600-2a9d-11eb-9c31-038b08be0e0a.png)

- **Individual Hotel Page having list of menus - we can add the menus to the cart**
![image](https://user-images.githubusercontent.com/36665975/99896454-c2467700-2cb6-11eb-9280-d253339afa64.png)

- **Adding menus to the basket/cart**
![image](https://user-images.githubusercontent.com/36665975/99896466-d5594700-2cb6-11eb-92e3-6acadfaae6d5.png)

- **Adding duplicate menu to the basket/cart**
![image](https://user-images.githubusercontent.com/36665975/99896471-e43ff980-2cb6-11eb-97a5-c57a59aa8553.png)

- **Basket of menus**
![image](https://user-images.githubusercontent.com/36665975/99896533-77792f00-2cb7-11eb-8211-ff4b054d800e.png)

- **Payment acknowledgement**
![image](https://user-images.githubusercontent.com/36665975/99896541-7fd16a00-2cb7-11eb-8157-ebcbce443bd8.png)

## How to run the application?

  ### Prerequisites:
  - Node LTS version
  - git
  - Angular CLI

  1. Clone the repository in your local machine.
  2. Navigate to `client` directory and run the command `npm i`. Do the same for `server` directory.
  3. Navigate to `server` directory , create a file named `.env`.
  4. Inside the `.env` file, add your mongodb remote string as `DB_CONNECTION` and a secret key (any string) for your jwt token as `SECRET_KEY` (refer this file - https://github.com/kishan0725/order-my-food-MEAN/blob/main/server/.env.example).
  5. Go to your atlas mongodb, create a new collection called `hotels` under the database that you created and copy the contents of the hotel details from here - https://github.com/kishan0725/order-my-food-MEAN/blob/main/client/src/assets/api/data.json and insert it in your `hotels` collection.
  6. Run the command `node server` and navigate to your localhost url.
  7. Now, you should see the application running in your browser.

## How to make any changes in the UI?

  1. Navigate to `client` directory. 
  2. Do whatever changes you want in the application and save it.
  3. Run the command `ng build --prod`.
  4. Once the build is done, copy the contents of 'dist/order-my-food' in the `client` directory and paste it under the `public` folder in `server` directory.
  5. Run the command `node server` and navigate to your localhost url.
  6. Now, you should see the changes that you made in the application.

Please do ⭐ the repository, if it helped you in anyway.
