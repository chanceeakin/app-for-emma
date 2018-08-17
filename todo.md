# Authorization

- Add oAuth (2.0)

# Settings for users

- preferred tags

# Create the Content

# create 1.0 expectations and feature Set

- a user should be able to use swipe gestures to navigate
- a user should be able to change their password or email
  - client: modal for change password
- a user should be able to subscribe to specific tags
  - client: modal on settings page (linked to all tags endpoint)
  - server: add tags to User Object
  - server: endpoint to update user tags on user object: UpdateUserTagPUT
  - server: endpoint to get random user suggestions: UserRandomSuggestionGET
- a user should be able to have 1 suggestion for a 24 hour period, resetting at 4am for their local time.
  - client: local storage for a user's suggestions, as well as a TTL for fetching addtional suggestions.
- a user should be able to make a suggestion from within the app
  - client: settings page addition, or extra card for adding suggestions.
  - server: endpoint to receive user created suggestions: UserAddSuggestionPOST
  - add is validated to Suggestion Object and checks to prevent unvalidated suggestions from populating into the app.
  - web: create admin page to check incoming suggestions and validate them or remove them from the library.
    - at this time, we are not giving users the ability to know whether their suggestion went through or not.
- splash page!
  - and general UI overhaul/streamlining.
- logging solution
  - add prometheus like [so](https://github.com/brancz/prometheus-example-app/blob/master/main.go)
- testing
  - add in tests
- CI/CD
  - explore some options once tests are in place
- deployment

  - dockerize the server
  - attach these things to the llc
  - get an app store developer account
  - deploy/test

  DONE!!

  - TURN OFF THE EFFING CSRF PROTECTION. probably useful for some things. not EFFING EVERYTHING.
    - activate middleware selectively, maybe.
  - add protections into the router
  - a user should be able to register, login, and logout from the app
    _login route_
    _logout route_
    _client: set up and test each of those screens_
    _add redux state storage for authentication_
  - a users should be able to update their email and password
    - client: modal for change email
  - server: add update user endpoint, locked by auth: UpdateUserAuthPUT
