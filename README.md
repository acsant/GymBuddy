#Gym Buddy - API Documentation
###### An application that helps people connect with local gym goers

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/acsant/GymBuddy)

### 1. Introduction
The purpose of this API documentation is to allow developers and designers of
this application better understand the structure of the backend services. This
would allow the developers to easily contribute to the project as well as
consume the API for the GymBuddy android app.

#### Technology Stack
Node.js will be used to write a communications server and MongoDB for the data store.

### 2. Authentication
An authentication layer must be provided as a gateway to the application. The authentication will be a local authentication where user information will be collected on sign-up and stored or future login.
##### User:
```
User: {
	first_name:,
	last_name:,
	age:,
	weight:,
	body_fat:,
	bio:,
	gym_goals:,
	gym_attended:,
}
```
### 3. Data store
#### User:
```
User: {
	id: {UUID},
	first_name: {string},
	last_name: {string},
	age: {short int},
	weight: {short int},
	body_fat:{short int},
	bio: {string},
  	objectives: [String]
}
```

#### Locally registered gyms:
```
Gym: {
	id: {UUID},
	common_name: {string},
	location: {string}
}
```

#### User-Gym (Gym that the user is registered to):
There can be a many-to-many relationship between users and the gym that they attend. To improve performance and space complexity of the backend system, a bridge table will be used that maps a user to the gym that they attend.

```
User-Gym: {
	user-id: {UUID},
	gym-id: {UUID}
}
```

#### User-Goal:
Every user has an objective/goal that they want to achieve from their workout. Matching users to a local gym partner would require this information. The matching algorithm would utilize this information to suggest better matches for registered users. To simplify the process, the objectives can be selected from a set of predefined goals.
```
Goals: {
	LEAN, 		// Achieve a lean athletic body
	BODYFAT, 	// Maintain/Reduce body fat
	GAIN, 		// Gain muscle mass
	STRENGTH,	// Improve mental and physical strength
	ENDURANCE	// Endurance training
}
```

The mapping mentioned below would allow a user to have multiple training goals. NOTE: Developers may decide to restrict the maximum number of goals a user may pick during registration/sign-up.

```
User-Goal: {
	user-id: {UUID},
	goal: {GOAL}
}
```

### 4. API Calls

#### Authentication [POST] - /login

| Parameters | Response 	 						|
|:-----------|:------------------------------------:|
|'email'     | Return user information and          |
|'password'  | authenticates the user               |

#### User [GET] - /user

| Parameters | Response                            |
|:-----------|:-----------------------------------:|
|`email`     |Returns a user by `email`            |


#### User [POST] - /user/register
###### Request Body
```
{
	first_name:,
  	last_name:,
  	age:,
  	weight:,
  	body_fat:,
  	bio:,
  	objectives:,
 	email:,
	password:,
}
```

#### User [POST] - /user/edit

Edits the current user information and returns the updated
user

| Parameters | Field Description	        		|
|:-----------|:------------------------------------:|
|'email'     | Returns a user if information was    |
|'firstName' | updated successfully                 |
|'lastName'  |                                      |
|'phone'     |										|
|'age'		 |										|
|'weight'	 |										|
|'bodyFat'	 |										|
|'bio'		 |										|
|'goals'	 | Comma seperated string of objectives	|

#### Communities [GET] - /communities/users
| Parameters | Response                             |
|:-----------|:------------------------------------:|
|'email'	 | Returns a list of users who can be 	|
|			 | matched based on objectives			|

#### Introducing GridFS ( Option 1 for direct uploads )
Part of the application is to store user profiles, which include larger than usual data files, for instance user image ( Profile Picture ). Two storage options were considered to achieve this. BLOB storage, as well as GridFS. Blob storage refers to binary large objects. This is helpful in storing smaller files. Images usually involve large file size hence GridFS is chosen. A file in GridFS can be represented as such:

```
file: {
  "_id" : <ObjectId>,
  "length" : <num>,
  "chunkSize" : <num>,
  "uploadDate" : <timestamp>,
  "md5" : <hash>,
  "filename" : <string>,
  "contentType" : <string>,
  "aliases" : <string array>,
  "metadata" : <dataObject>,
}
```

Initially, only one image will be supported per user. So an image can be linked to the user through a `file_id` attribute in the user object.

#### Amazon S3 ( Option 2 for direct uploads )
Another option considered for user file storage is AWS S3. AWS S3 would be cost
efficient, easy in terms of replication and with failsafe mechanisms. GridFS means storing files in a DB, which is most likely not the ideal option. Amazon S3 was designed for file storage hence it is also a well-managed option.

```
Meta-Data: {
  "bucket_name": "gymbuddies-bucket",
  "access_key_id": "******************",
  "secret_access_key": "*****************"
}
```

### Note: This documentation is a rough version and may change with the project
