#Gym Buddy - API Documentation
###### An application that helps people connect with local gym goers

### Introduction
The purpose of this API documentation is to allow developers and designers of
this application better understand the structure of the backend services. This
would allow the developers to easily contribute to the project as well as
consume the API for the GymBuddy android app.

### Authentication
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
### Data store
#### User:
```
User: {
	id: {UUID},
	first_name: {string},
	last_name: {string},
	age: {short int},
	weight: {short int},
	body_fat:{short int},
	bio: {string}
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

### Note: This documentation is a rough version and may change with the project


