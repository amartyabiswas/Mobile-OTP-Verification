# Mobile-OTP-Verification

#### My Mobile verification system is powered by Twilio. Twilio's npm package is available for Node.js app,which can be utilized for sending messages and voice calls.

### Features of Twilio account:
1) Free account generates a Twilio number which can send messages and voice calls only to the numbers that have been verified by Twilio.
2) If you want to send message to any random number, then you need to purchase a premium Twilio number.
3) Associate your twilio account with [Authy](https://dashboard.authy.com/signin).
4) Authy is a 2way authentication method, whose packages are available for Node app.

### Features of Authy:
1) Authy sends OTP in the requested number, using Twilio messeges.
2) Waits for the user to send the OTP back to the server for verification, and sets time limit at the same time.
3) If the message dies, then there is option for Resend.
4) Else the account is verified and the user is stored in the database as verified user.
  
![screenshot 145](https://user-images.githubusercontent.com/31181068/37790289-1a402b5e-2e2c-11e8-841b-101a8e0d5ef9.png)

#### The Sign-up page:
![screenshot 146](https://user-images.githubusercontent.com/31181068/37790298-1e8642fc-2e2c-11e8-806d-8482a2db4626.png)

#### The OTP entered is sent back to the server, where it is verified. If the users exceeds the time-limit of sending the OTP back, then the OTP dies and the user has to request another OTP.
![screenshot 147](https://user-images.githubusercontent.com/31181068/37790305-224667d2-2e2c-11e8-8b4d-89d8a014425d.png)

#### After verification:
![screenshot 148](https://user-images.githubusercontent.com/31181068/37790317-299c9286-2e2c-11e8-83f3-02b6601b5f01.png)

## Installation
```
1. Download the code.
2. Npm init and install all packages.
3. Insert Twilio ssid, account_id, and authy key.
4. Run Mongodb/ insert MLabs Uri.
5. nodemon server.js
```

# Copyright
#### This project is made by Amartya Biswas. All rights reserved (2018) @ Amartya Biswas.

