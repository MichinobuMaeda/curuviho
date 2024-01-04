# Curuviho

## Data structure

```mermaid
classDiagram
    Auth "1" -- "1" Account
    Account "*" -- "0..1" User
    User "*" -- "*" Group
```

## Create this project

<https://console.firebase.google.com/>

- Add project
    - Project name: curuviho
    - Configure Google Analytics
        - Create a new account: curuviho
        - Analytics location: Japan
- Projects: curuviho
    - Project Overview
        - Project settings
            - Default GCP resource location: asia-northeast2 (Osaka)
            - Environment Type: Production
            - Public-facing name: Curuviho
            - </> ( Web )
                - App nickname: Curuviho
                - [v] Also set up Firebase Hosting for this app.
                - o Use npm -- Save code
        - Usage and billing
            - Details & settings
                - Firebase billing plan: Blaze
    - Build
        - Authentication
            - Sign-in method
                - Email/Password: Enable
                    - Email link (passwordless sign-in): Enable
                - Google: Enable
                - Identity Platform: Upgrade to enable
            - Templates
                - Template language: Japanese
        - Firestore database
            - Location: asia-northeast2 (Osaka)
            - o Start in production mode
        - Storage
            - o Start in production mode

I failed to put firestore into native mode.

```bash
$ gcloud config set project curuviho 
$ gcloud firestore databases update --type=firestore-native

$ java --version
openjdk 20.0.2 2023-07-18

$ node --version
v18.16.0

$ fvm --version          
2.4.1

$ fvm list     
stable
3.16.5 (global)

$ fvm flutter create -t app --platforms web curuviho
$ cd curuviho
$ fvm use 3.16.5

$ npm init
$ npm i firebase-tools -D
$ npx firebase init

? Which Firebase features do you want to set up for this directory?
Firestore: Configure security rules and indexes files for Firestore,
Functions: Configure a Cloud Functions directory and its files,
Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys,
Hosting: Set up GitHub Action deploys, 
Storage: Configure a security rules file for Cloud Storage,
Emulators: Set up local emulators for Firebase products
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: curuviho (curuviho)
? What file should be used for Firestore Rules? firestore.rules
? What file should be used for Firestore indexes? firestore.indexes.json
? What language would you like to use to write Cloud Functions? JavaScript
? Do you want to use ESLint to catch probable bugs and enforce style? Yes
? Do you want to install dependencies with npm now? Yes
? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? Yes
? For which GitHub repository would you like to set up a GitHub workflow?  MichinobuMaeda/curuviho
? Set up the workflow to run a build script before every deploy? Yes
? What script should be run before every deploy? npm ci && npm run build
? Set up automatic deployment to your site's live channel when a PR is merged? Yes
? What is the name of the GitHub branch associated with your site's live channel? main
i  Action required: Visit this URL to revoke authorization for the Firebase CLI GitHub OAuth App:
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
? What file should be used for Storage Rules? storage.rules
? Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices. Authentication Emulator, Functions Emulator, Firestore Emulator, Storage Emulator
? Which port do you want to use for the auth emulator? 9099
? Which port do you want to use for the functions emulator? 5001
? Which port do you want to use for the firestore emulator? 8080
? Which port do you want to use for the storage emulator? 9199
? Would you like to enable the Emulator UI? Yes
? Which port do you want to use for the Emulator UI (leave empty to use any available port)? 4040
? Would you like to download the emulators now? Yes
```

Create icons by <https://realfavicongenerator.net>.

<https://www.google.com/recaptcha/admin/create>

- Register a new site
    - Label: curuviho.web.app
    - Domains: curuviho.web.app
    - Google Cloud Platform: curuviho

Set site key to `webRecaptchaSiteKey` in `lib/env.dart`.

<https://console.firebase.google.com/>

- Projects: curuviho
    - Build
        - App check
            - Apps
                - Curuviho
                    - reCAPTCHA
                        - reCAPTCHA secret key: ********
        - Firestore database
            - add `service/deployment` with timestamp field `createdAt`
