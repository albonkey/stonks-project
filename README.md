# Stonks Project

### Env requirements
- [x] Frontend : NextJS
- [x] Backend: use your own with next or use supabase (free)
- [x] Deploy on vercel (free)
- [x] For emails we recommend using Resend or nodemailer.

### Scenario
#### Guests:
- [x] Can see a list of channels (profiles)
- [x] Can go on channel page and follow the channel
- [x] If user click on follow and is not connected will ask login

#### Connected users (eddy)
- [x] Eddy connect with his google account
- [x] Eddy need to complete his profile by setting his username and notification preferences
- [x] Once connected and profile completed
eddy goes to his channel and start streaming (no need to do encoding stuff - just put a button that trigger a boolean and integrate an iframe of this video https://www.youtube.com/watch?v=jfKfPfyJRdk when the boolean is true for frontend)

#### Connected users (Nico)
- [x] Nico follow eddy
- [x] If eddy start a streaming, Nico receive a push notification or an email if he’s not connected to the website.
  - [x] Email Notification
  - [ ] Push Notification
- [x] Nico can go on Eddy’s stream and start chatting (basic)

We except the fullstack engineer to be confortable with Websockets, push notifications and 3rd libraries.

### Bonus:

- i18n integration
- Emojis linked to a channel: if a user follow the channel he also have access to the channel’s emojis.
