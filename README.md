# guild-hall
Hosted at https://guild-hall.herokuapp.com currently

Still to do:
- Responsive chat screen css
- Add name and character img to messages sent in chat
- Store chat in DB and display last ten messages when logging in
- Add "rooms", for different chats
- - New DB collection for rooms with socket.io namespace details
- - Go to a /rooms route that makes database calls to populate the page with a list of user created rooms
- - Navigating to /rooms/:id will connect to that namespace 
- Page to view all previous chat
- Dedicated New Character page rather than two forms on one page
- Add email address to new characters
- Password reset
- Refactor so there is a single "account" login, with multiple characters assigned to that account so people don't have to log in more than once to chat with more than one character
