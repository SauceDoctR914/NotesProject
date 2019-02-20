## Notiz

Notiz is a note taking app and note organization app. Users signup and then login to bring them to their notebooks page, where they can create a new notebook and then create notes within that notebook for organization. 

<img width="1110" alt="screen shot 2019-02-18 at 11 43 56 am" src="https://user-images.githubusercontent.com/32119313/52965824-ba380580-3373-11e9-90de-c102a42ec42c.png">



## Available Scripts

Backend built with Ruby on Rails API using Postgres. Endpoints for users, user tokens, notebooks, and notes.

Frontend built with React.Js and Redux for state management. User Interface designed with custom CSS styling.

Ruby Knock Gem on the backend and bcrypt on the frontend for JWT Authentication. Google Cloud Translation Api for translating notes into foreign languages. Notebooks and notes stored on the backend, with the date created for notes formatted using Moment.js. Multi-page and dynamic links created using React Router and WithRouter.

Backend
Run the rails API from https://github.com/SauceDoctR914/mod6project-Backend-api/ on port 3002 with

bundle install
rails db:create
rails db:migrate
rails s -p 3002
Frontend

# To install frontend dependencies run

npm install

# To open in browser run
npm start

## Usage Example
<img width="1118" alt="screen shot 2019-02-18 at 11 44 13 am" src="https://user-images.githubusercontent.com/32119313/52966383-2404df00-3375-11e9-8e1a-5a595a8a962a.png">

After creating a notebook a user can click the notebook link to display that particular notebook's page. Once there, they can create a new note which is initialized with a title, the date created from a drop down, a brief description of the note, and the note content. After a note is created, the user may edit that note, delete the note or even translate that note into over 100 different languages!

<img width="1133" alt="screen shot 2019-02-18 at 12 04 00 pm" src="https://user-images.githubusercontent.com/32119313/52966441-50b8f680-3375-11e9-95d4-ce50fc93f020.png">

Here the note is translated into greek. At any time, the User may hit logout at the top left of the page and it will remove their JWT token, log them out, and return them to the login page where they may log back in or signup as different user.


## Contact
Gavin Sokolof - sokolofg@gmail.com
