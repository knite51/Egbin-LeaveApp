# Express Blog

## Entities

- Writers
- Readers
- Articles
- Comments

## Features

- Users can sign up as writers or readers.
- Writers can publish, edit and delete articles
- Writers can delete comments
- Writers can comment
- Readers can view and save articles
- Readers can comment on articles

## New topics

- Bcrypt
- Joi
- JWT

## Glossary

### Bcrypt

Bycrpt adaptive password hashing algorithm that is designed to be slow in order to prevent against brute force attacks even with increasing computation power. .

### Salt

A salt is a random value that is generally not a secret, which is used to make some precomputed attacks harder.

### Hash

hash(salt+password)=hashed password

### JWT

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.
