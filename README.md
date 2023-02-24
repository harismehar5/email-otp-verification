# OTP Verification API

This is a Node.js application that generates and verifies OTPs (One-Time Passwords) using the [speakeasy](https://github.com/speakeasyjs/speakeasy) library and sends the OTPs to users via email using the [SendGrid API](https://sendgrid.com/docs/API_Reference/api_v3.html).

## Installation

1. Clone the repository:

`git clone https://github.com/harismehar5/email-otp-verification`


2. Install the dependencies:

`npm install`


3. Set your SendGrid API key in a `.env` file:

`SEND_GRID_API_KEY=<your_api_key>`


4. Run the application:

`npm start`


## Usage

### Generate OTP

To generate an OTP for a user, send a `POST` request to the `/generate-otp` endpoint with the user's email address:

`{
"email": "user@example.com"
}`


The server will generate an OTP based on a secret key and send it to the user's email address using the SendGrid API.

### Validate OTP

To validate an OTP entered by a user, send a `POST` request to the `/validate-otp` endpoint with the OTP and the secret key used to generate it:

`{
"otp": "123456",
"secretKey": "JBSWY3DPEHPK3PXP"
}`


The server will verify the OTP using the secret key and return a response indicating whether the OTP is valid or not.

