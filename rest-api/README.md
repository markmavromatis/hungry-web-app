# Hungry Web App RestAPI

This RestAPI service is a Proof of Concept project which HungryApp features such as:

1. User registration and authentication
2. Restaurants Search (via Yelp Fusion)
3. Adding and Removing Favorites

All APIs, other than user registration and login, require authentication via JWT token.


## Installation

This project is implemented using NodeJS and Express. The web server should run on any operationg system with NodeJS and NPM installed.

The following environment variables must be setup before launching the REST API:

Postgres Database credentials:

- POSTGRES_USERNAME
- POSTGRES_PASSWORD
- POSTGRES_DATABASE
- POSTGRES_HOST

JWT Secret for user tokens:

- JWT_SECRET

Yelp Fusion API key:

- YELP_FUSION_KEY

Host Port:

- PORT - This will default to 8080 if not set.

After setting these environment variables up, clone this project into a local folder and run the dev server as follows:

1. Install NPM dependencies: ```npm install```
2. Start up the dev server: ```npm run dev```

## NPM Modules

The project is built using several well known Node packages:

- bcrypt - hashing and salt features for password encyrption
- email-validator - Validate email address in the UserID input field
- express - Lightweight web server for hosting rest APIs
- jsonwebtoken - Create and decode JSON web tokens
- pg - Postgres database connector
- sequelize - Object Relational Mapping utility enabling database access without direct SQL queries
- typescript - Language extensions on JavaScript to support static typing.
- yelp-fusion - Wrapper for Yelp Fusion API

## Database

This project uses a Postgres database to store users and their favorite restaurants. There are two tables that support these operations:

1. HungryAppUsers - User email addresses and their hashed passwords.
2. Favorites - Users' favorite restaurants.




## File Storage

No files are stored in this application.

## External Dependencies

This REST API uses the [Yelp Fusion API](https://www.yelp.com/fusion) to search for restaurants. 

## Endpoints

There are 5 endpoints included in this project:

Favorites:

- (GET) http://{{host}}/api/v0/favorites/:email - This endpoint retrieves favorite restaurants for a user account.
- (POST) http://{{host}}/api/v0/favorites - This endpoint adds a new favorite restaurant for a user. Restaurant details are provided in the request body.
- (DELETE) http://{{host}}/api/v0/favorites - This endpoint deletes all favorites for a user. The user email address is provided in the request body.

Restaurants:

- (GET) http://\{\{host\}\}/api/v0/restaurants?distanceInMiles\=<distance in miles>&address=\<address\> - Searches for open restaurants within a distance range from the query address.

Users:

- {POST} http://{{host}}/api/v0/users/auth/ - Registers a new user. User details (email, password, etc.) are provided in the request body.

- {POST} http://{{host}}/api/v0/users/auth/login - Authenticate a user based on the username / password credentials. If authentication is successful, returns a JWT token.

## Example endpoint responses


### Get Favorites

(GET) http://{{host}}/api/v0/favorites/mark@example2.com

Response:

```
[
    {
        "email": "mark@example2.com",
        "restaurantId": "2-z6dRAkKupCyz1LF251pQ",
        "name": "Jintana Thai Farmhouse",
        "url": "https://www.yelp.com/biz/jintana-thai-farmhouse-brooklyn?adjust_creative=BbRLT92KiIE8O5eC2_hVAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BbRLT92KiIE8O5eC2_hVAw",
        "latitude": "40.6665799",
        "longitude": "-73.98211",
        "address1": "344 7th Ave",
        "city": "Brooklyn",
        "state": "NY",
        "createDate": "2020-06-13T01:19:36.106Z",
        "updateDate": "2020-06-13T01:19:36.106Z"
    }
]
```

### Create a new favorite
(POST) {{host}}/api/v0/favorites
Body: {"email":"mark@example2.com","restaurantId":"mStkEcVeXv1HXlGqoYQx2A","name":"The Brisket House","url":"https://www.yelp.com/biz/the-brisket-house-houston?adjust_creative=BbRLT92KiIE8O5eC2_hVAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BbRLT92KiIE8O5eC2_hVAw","latitude":29.7601024211866,"longitude":-95.482542514801,"address1":"5775 Woodway","city":"Houston","state":"TX","zip":"77057"}

Response:
```
{
    "favorite": {
        "email": "mark@example2.com",
        "restaurantId": "mStkEcVeXvHXlGqoYQx2A",
        "name": "The Brisket House",
        "url": "https://www.yelp.com/biz/the-brisket-house-houston?adjust_creative=BbRLT92KiIE8O5eC2_hVAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BbRLT92KiIE8O5eC2_hVAw",
        "latitude": "29.7601024211866",
        "longitude": "-95.482542514801",
        "address1": "5775 Woodway",
        "city": "Houston",
        "state": "TX",
        "updateDate": "2020-06-15T03:55:08.492Z",
        "createDate": "2020-06-15T03:55:08.492Z"
    }
}
```

### Delete Favorites

(DELETE) http://{{host}}/api/v0/favorites
Body: {"email": "mark@example2.com"}

Response: Empty

### Search Restaurants

(GET) http://{{host}}/api/v0/restaurants?distanceInMiles=5&address=101 Avenue of Americas, New York, NY

Response:

```
[
    {
        "id": "jnHbdsqlTKlPcmJ8BCP9-g",
        "alias": "via-carota-new-york",
        "name": "Via Carota",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/5EHi8MhocoDkXwMtL7o_ug/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/via-carota-new-york?adjust_creative=BbRLT92KiIE8O5eC2_hVAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BbRLT92KiIE8O5eC2_hVAw",
        "review_count": 543,
        "categories": [
            {
                "alias": "italian",
                "title": "Italian"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 40.7331,
            "longitude": -74.00369
        },
        "transactions": [],
        "price": "$$$",
        "location": {
            "address1": "51 Grove St",
            "address2": "",
            "address3": "",
            "city": "New York",
            "zip_code": "10014",
            "country": "US",
            "state": "NY",
            "display_address": [
                "51 Grove St",
                "New York, NY 10014"
            ]
        },
        "phone": "+12122551962",
        "display_phone": "(212) 255-1962",
        "distance": 7779.175147034358
    },
    ...
]
```
### Register User

(POST) http://{{host}}/api/v0/users/auth/
Body: {"email": "mark@example5.com", "password": "123", "fullName": "Mark Mavromatis"}

Response: 

```
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmtAZXhhbXBsZTExLmNvbSIsInBhc3N3b3JkSGFzaGVkIjoiJDJiJDEwJGMvL2QyS3BoWlVROTdiQVFIZExXWWVPaVI4NjR4YUNWbUNBaXRuQnlYT3h0MGk4Ni94cGxLIiwiZnVsbE5hbWUiOiJNYXJrIE1hdnJvbWF0aXMiLCJ1cGRhdGVEYXRlIjoiMjAyMC0wNi0xNVQwMzo1MjowOS45NTBaIiwiY3JlYXRlRGF0ZSI6IjIwMjAtMDYtMTVUMDM6NTI6MDkuOTUwWiIsImlhdCI6MTU5MjE5MzEyOX0.0q9z3sCrSJWkeFJ-y0PZwfYWg1kKXSBSKps-Xumxhdg",
    "user": "mark@example11.com"
```

### 



## License

This project is freely distributed under the MIT license.
