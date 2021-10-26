Allthings Node/Javascript SDK

[![Build status](https://badge.buildkite.com/0cba57805232b819e0bc2836dc96dd8314ab9165f9553623ca.svg?branch=master)](https://github.com/allthings/node-sdk)

## Contents

1.  [Installation & Usage](#installation--usage)
1.  [Configuration](#configuration)
    1.  [Options](#configuration-options)
1.  [Authentication](#authentication)
1.  [API](#api)
1.  [OAuth Implicit Grant Example](#oauth-implicit-grant-example-example)
1.  [OAuth Authorization Code Grant Example](#oauth-authorization-code-grant-example)
1.  [Release management & versioning](#release-management--versioning)

## Installation & Usage

```sh
yarn add @allthings/sdk
```

```javascript
const allthings = require('@allthings/sdk')

const client = allthings.restClient({
  accessToken: '043dab7447450772example1214b552838003522',
})

client
  .getCurrentUser()
  .then((viewer) => console.log(`Welcome back ${viewer.username}!`))
```

<!--
```javascript
const allthingsSdk = require('@allthings/sdk')

const allthings = allthingsSdk({
  accessToken: '043dab7447450772example1214b552838003522',
})

allthings.query.viewer().then(viewer =>
  console.log(`Welcome back ${viewer.username}!`)
)
```
-->

## Configuration

### Configuration Options

The available configuration options are outlined here:

| Option           | Default | Description                                                                                                                     |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **accessToken**  |         | API Access Token                                                                                                                |
| **clientId**     |         | OAuth 2.0 clientId                                                                                                              |
| **clientSecret** |         | OAuth 2.0 client secret                                                                                                         |
| **username**     |         | Username to use with OAuth 2.0 Password Grant authentication flow                                                               |
| **password**     |         | Password to use with OAuth 2.0 Password Grant authentication flow                                                               |
| **concurrency**  |         | Number of concurrent requests to perform in parallel. Default behavior is burst of 30/s, 1/s thereafter                         |
| **apiUrl**       |         | Base API url to use. Defaults to https://api.allthings.me/, respects value of the `ALLTHINGS_REST_API_URL` environment variable |

## Authentication

@TODO

process.env.ALLTHINGS_OAUTH_CLIENT_ID
process.env.ALLTHINGS_OAUTH_CLIENT_SECRET,
process.env.ALLTHINGS_OAUTH_PASSWORD,
process.env.ALLTHINGS_OAUTH_USERNAME,

## OAuth Implicit Grant Example

@TODO

```javascript
const allthings = require('@allthings/sdk')

const client = allthings.restClient({
  accessToken: '043dab7447450772example1214b552838003522',
})

client
  .getCurrentUser()
  .then((viewer) => console.log(`Welcome back ${viewer.username}!`))
```

## OAuth Authorization Code Grant Example

1. Initialize instance of `client`:

```javascript
const allthings = require('@allthings/sdk')

const client = allthings.restClient({
  clientId: '5d038ef2441f4de574005c54_example',
  clientSecret: '40f63f981ff082dbc8d273983ac3852c2e51e90856123156',
  redirectUri: 'https://example-app.com/callback',
})
```

2. Construct a URI to send authorization request to using a `state` which should be unique per request and hard to guess. It can be generated with `client.oauth.generateState()` method:

```javascript
const state = client.oauth.generateState()
const authorizationUri = client.oauth.authorizationCode.getUri(state)
```

3. Direct user's browser to the constructed URI.

4. When user completes authentication process, he is redirected to the `redirectUri` having `code` and `state` query string arguments, e.g.:

```
https://example-app.com/callback?code=ebc110bee11b2829&state=k1bt3c1d0vnfu7qk
```

At this point `state` must be validated - if it doesn't match the one generated on step 2, such request is probably malicious and should be aborted.

5. Use the code extracted from query parameters on the previous step to obtain an access token:

```javascript
await client.oauth.authorizationCode.requestToken(code)
```

6. Client is ready to make API requests:

```javascript
const user = await client.getCurrentUser()
```

## API

### Allthings SDK module

- [`restClient()`](#module-export-restClient)
  - [`client.agentCreate()`](#restclient-client-createagent)
  - [`client.agentCreatePermissions()`](#restclient-client-createagent)
  - [`client.appCreate()`](#restclient-client-createagent)
  - [`client.lookupIds()`](#restclient-client-createagent)
  - [`client.groupCreate()`](#restclient-client-createagent)
  - [`client.groupGetById()`](#restclient-client-createagent)
  - [`client.groupUpdateById()`](#restclient-client-createagent)
  - [`client.getGroups()`](#restclient-client-createagent)
  - [`client.propertyCreate()`](#restclient-client-createagent)
  - [`client.propertyGetById()`](#restclient-client-createagent)
  - [`client.propertyUpdateById()`](#restclient-client-createagent)
  - [`client.getProperties()`](#restclient-client-createagent)
  - [`client.registrationCodeCreate()`](#restclient-client-createagent)
  - [`client.unitCreate()`](#restclient-client-createagent)
  - [`client.unitGetById()`](#restclient-client-createagent)
  - [`client.unitUpdateById()`](#restclient-client-createagent)
  - [`client.getUnits()`](#restclient-client-createagent)
  - [`client.userCreate()`](#restclient-client-createagent)
  - [`client.userGetById()`](#restclient-client-createagent)
  - [`client.userUpdateById()`](#restclient-client-createagent)
  - [`client.userChangePassword()`](#restclient-client-createagent)
  - [`client.userCreatePermission()`](#restclient-client-createagent)
  - [`client.userGetPermissions()`](#restclient-client-createagent)
  - [`client.userDeletePermission()`](#restclient-client-createagent)
  - [`client.userGetUtilisationPeriods()`](#restclient-client-createagent)
  - [`client.userCheckInToUtilisationPeriod()`](#restclient-client-createagent)
  - [`client.getUsers()`](#restclient-client-createagent)
  - [`client.getCurrentUser()`](#restclient-client-createagent)
  - [`client.userRelationCreate()`](#restclient-client-createagent)
  - [`client.userRelationDelete()`](#restclient-client-createagent)
  - [`client.utilisationPeriodCreate()`](#restclient-client-createagent)
  - [`client.utilisationPeriodDelete()`](#restclient-client-createagent)
  - [`client.utilisationPeriodGetById()`](#restclient-client-createagent)
  - [`client.utilisationPeriodUpdateById()`](#restclient-client-createagent)
  - [`client.utilisationPeriodCheckInUser()`](#restclient-client-createagent)
  - [`client.utilisationPeriodAddRegistrationCode()`](#restclient-client-createagent)
  - [`client.delete()`](#restclient-client-delete)
  - [`client.get()`](#restclient-client-get)
  - [`client.post()`](#restclient-client-post)
  - [`client.patch()`](#restclient-client-patch)

---

<a name="module-export-restclient" />

### restClient(configurationOptions?): Client

Create an client instance of the SDK.

```javascript
const allthings = require('@allthings/sdk')

const client = allthings.restClient(configurationOptions)
```

---

<a name="restclient-client-createagent" />

### client.createAgent()

Create a new agent. This is a convenience function around creating a user and adding that user to a property-manager's team.

```javascript
const appId = '575027e58178f56a008b4568'
const propertyManagerId = '5a818c07ef5f2f00441146a2'
const username = 'mr.example@allthings.test'

const agent = await client.createAgent(appId, propertyManagerId, username, {
  email: 'mr.example@allthings.test',
  locale: 'en_US',
})
```

```typescript
export type MethodCreateAgent = (
  appId: string,
  propertyManagerId: string,
  username: string,
  data: PartialUser & {
    readonly email: string
    readonly locale: EnumLocale
  },
) => UserResult
```

```typescript
// Describes the API wrapper's resulting interface
export interface IAllthingsRestClient {
  readonly delete: MethodHttpDelete
  readonly get: MethodHttpGet
  readonly post: MethodHttpPost
  readonly patch: MethodHttpPatch

  // Agent

  /**
   * Create a new agent. This is a convenience function around
   * creating a user and adding that user to a property-manager's team
   */
  readonly agentCreate: MethodAgentCreate

  /**
   * Create agent permissions. This is a convenience function around
   * creating two user permission's: one "admin" and the other "pinboard"
   */
  readonly agentCreatePermissions: MethodAgentCreatePermissions

  // App

  /**
   * Create a new App.
   */
  readonly appCreate: MethodAppCreate

  // Booking

  /**
   * Get a booking by its ID
   */
  readonly bookingGetById: MethodBookingGetById

  /**
   * Update a booking by its ID
   */
  readonly bookingUpdateById: MethodBookingUpdateById

  // Group

  /**
   * Create a new group within a property
   */
  readonly groupCreate: MethodGroupCreate

  /**
   * Get a group by its ID
   */
  readonly groupGetById: MethodGroupGetById

  /**
   * Update a group by its ID
   */
  readonly groupUpdateById: MethodGroupUpdateById

  // ID Lookup

  /**
   * Map one or more externalId's to API ObjectId's within the scope of a specified App
   */
  readonly lookupIds: MethodLookupIds

  // Notification

  /**
   * Returns a collection of notifications for a given user
   */
  readonly notificationsGetByUser: MethodNotificationsGetByUser

  /**
   * Marks all notifications of a user - until a provided timestamp (or now) - as read
   */
  readonly notificationsUpdateReadByUser: MethodNotificationsUpdateReadByUser

  /**
   * Mark a notification as read
   */
  readonly notificationUpdateRead: MethodNotificationUpdateRead

  // Notification settings

  /**
   * Set all notification settings to default
   */
  readonly notificationSettingsResetByUser: MethodNotificationSettingsResetByUser

  /**
   * Change user notification-settings
   */
  readonly notificationSettingsUpdateByUser: MethodNotificationSettingsUpdateByUser

  // Property

  /**
   * Create a new property
   */
  readonly propertyCreate: MethodPropertyCreate

  /**
   * Get a property by its ID
   */
  readonly propertyGetById: MethodPropertyGetById

  /**
   * Update a property by its ID
   */
  readonly propertyUpdateById: MethodPropertyUpdateById

  // Registration Code

  /**
   * Create a new registration code
   */
  readonly registrationCodeCreate: MethodRegistrationCodeCreate

  // Unit

  /**
   * Create a unit within a group
   */
  readonly unitCreate: MethodUnitCreate

  /**
   * Get a unit by its ID
   */
  readonly unitGetById: MethodUnitGetById

  /**
   * Update a unit by its ID
   */
  readonly unitUpdateById: MethodUnitUpdateById

  // User

  /**
   * Create a new User.
   */
  readonly userCreate: MethodUserCreate

  /**
   * Get a user by their ID
   */
  readonly userGetById: MethodUserGetById

  /**
   * Update a user by their ID
   */
  readonly userUpdateById: MethodUserUpdateById

  /**
   * Get a list of users
   */
  readonly getUsers: MethodGetUsers

  /**
   * Get the current user from active session
   */
  readonly getCurrentUser: MethodGetCurrentUser

  /**
   * Change a user's password
   */
  readonly userChangePassword: MethodUserChangePassword

  /**
   * Give a user a permission/role on an given object of specified type
   */
  readonly userCreatePermission: MethodUserCreatePermission

  /**
   * Get a list of user's permissions
   */
  readonly userGetPermissions: MethodUserGetPermissions

  /**
   * Delete a user a permission/role on an given object of specified type
   */
  readonly userDeletePermission: MethodUserDeletePermission

  /**
   * Get a list of user's current utilisation - periods
   */
  readonly userGetUtilisationPeriods: MethodUserGetUtilisationPeriods

  /**
   * Checkin a user into a Utilisation-Period with userId and
   * utilisation-periodId
   */
  readonly userCheckInToUtilisationPeriod: MethodUserCheckInToUtilisationPeriod

  // User Relation

  /**
   * Creates a new user relation
   */
  readonly userRelationCreate: MethodUserRelationCreate

  /**
   * Deletes a new user relation
   */
  readonly userRelationDelete: MethodUserRelationDelete

  // Utilisation Period

  /**
   * Create a new utilisation period within a Unit
   */
  readonly utilisationPeriodCreate: MethodUtilisationPeriodCreate

  /**
   * Deletes a utilisation period by its id
   */
  readonly utilisationPeriodDelete: MethodUtilisationPeriodDelete
  /**
   * Get a utilisation period by its ID
   */
  readonly utilisationPeriodGetById: MethodUtilisationPeriodGetById

  /*
   * Update a utilisation period by its ID
   */
  readonly utilisationPeriodUpdateById: MethodUtilisationPeriodUpdateById

  /**
   * Check-in a user to a utilisation period with the users email
   */
  readonly utilisationPeriodCheckInUser: MethodUtilisationPeriodCheckInUser
}
```

## Release management & versioning

!! DO NOT `npm version` !!

The Allthings SDK makes use of [semantic-release](https://github.com/semantic-release/semantic-release) which automates the whole package release workflow including:

- determining the next version number
- generating the release notes and publishing the package.

This repository is also configured to `squash-merge` ([see here](https://github.blog/2016-04-01-squash-your-commits/)).  
When you squash merge, GitHub takes the title of the PR for the squash-merge's commit subject.

By choosing a proper PR title e.g. `feat: my new feature` your merged PR will trigger a new release.  
See semantic-releases [docs](https://github.com/semantic-release/semantic-release#how-does-it-work) for available prefixes.
