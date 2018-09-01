# Flight todo

- write unit tests/snapshots for smaller components

# create 1.0 expectations and feature Set

- logging solution
  - connect golang logs with elk stack running in docker-compose
- testing
  - add in tests
- CI/CD
  - explore some options once tests are in place
- deployment
  - attach these things to the llc
  - get an app store developer account
  - deploy/test

## 1.0.1

- suggestions should have a TTL that checks date if it's after 4am local time. If the saved date is yesterday, ask for a new date.

## 1.1

- a user should be able to subscribe to specific tags
  - client: modal on settings page (linked to all tags endpoint)
  - server: add tags to User Object
  - server: endpoint to update user tags on user object: UpdateUserTagPUT
  - server: endpoint to get random user suggestions: UserRandomSuggestionGET
- a user should be able to register, login, and logout
- a user should be able to change their password or email
  - client: modal for change password

### Authorization

- Add oAuth (2.0)

### Settings for users

- preferred tags

## 1.2

- a user should be able to make a suggestion from within the app

  - client: settings page addition, or extra card for adding suggestions.
  - server: endpoint to receive user created suggestions: UserAddSuggestionPOST
  - add is validated to Suggestion Object and checks to prevent unvalidated suggestions from populating into the app.
  - web: create admin page to check incoming suggestions and validate them or remove them from the library.
    - at this time, we are not giving users the ability to know whether their suggestion went through or not.

  DONE!!

  - TURN OFF THE EFFING CSRF PROTECTION. probably useful for some things. not EFFING EVERYTHING.
    - activate middleware selectively, maybe.
  - add protections into the router
  - about page
    - figure out what the hell to put on it.
  - a user should be able to register, login, and logout from the app
    _login route_
    _logout route_
    _client: set up and test each of those screens_
    _add redux state storage for authentication_
  - a users should be able to update their email and password
    - client: modal for change email
  - server: add update user endpoint, locked by auth: UpdateUserAuthPUT
  - a user should be able to use swipe gestures to navigate
    - this works for this.props.navigation.goBack()
  - deployment
    - dockerize the server
    - add prometheus like [so](https://github.com/brancz/prometheus-example-app/blob/master/main.go)
  - a user should be able to have 1 suggestion for a 24 hour period, resetting at 4am for their local time.
    - this should be handled client side via a TTL, stored in asyncStorage
    - put async checking logic in the action, which still fires off of componentDidMount
    - client: local storage for a user's suggestions, as well as a TTL for fetching addtional suggestions.
  - splash page!
    - craft it and name app.js
  - a user needs an about page
    - style and put copy in it.
  - general UI overhaul/streamlining.
