![>_trackerbot](/client/public/logo512.png)

# >_trackerbot

This is a tool for keeping track of where you leave those little things that you don't use very often. It's a very simple interface that was a lot of fun to build. I designed it to look like an early and simple user interface of the 80's and to accomplish a very simple task. It is a Rails API style server for a React app that lives in the '/client' directory.  
<br>
Features of this project include...<br>
client-side routing<br>
"redux" and "thunk" to manage and dispatch to state <br>
Rails session and user authentication via API<br>
audible user confirmations<br>
both presentational and container components<br>
hot reloading deployment of both servers for developement<br>
both functional and class components<br>
"REST-ful" routing

### Prerequisites
ruby 2.6.5
<br>rails (~> 5.2.4, >= 5.2.4.2)
<br>BUNDLED WITH 2.1.2

### Deployment instructions
After cloning you will need to run `bundle install` and create and migrate the datbase. It is configured for postgersql. I used the gem 'dot-env' so that you can store the databsae password in a '.env' file in the top directory. It is designed to be deployed using the 'foreman' gem. In the top level directory you can run `rake start`. This initiates comands in 'Procfile' that start the Rails server and deploy the React app as a proxy for the Rails API. It is not a true API in that it uses cookies for 'sessions_controller.rb' to login and validate users.

### License
This project is licensed under the MIT License - see the LICENSE.md file for details
