# rideshare-meteor
Ride sharing application using `Meteor` and `Google Maps API` using `Semantic-UI`

This is a proof of concept application to understand how ride sharing application can be implemented. 
It is a platform to find users willing to share journeys.
It connects passengers with travellers who are going in the same way as the traveller based on Google Maps Routing API.
Traveller posts his/her journey route, cost per passenger and data/time of the trip.
The passenger gets to choose the traveller and they are matched. Finally their contact details are shared.

This application uses `Meteor` framework, `MongoDB` as Database, `Semantic-UI` as UI framework and `Google Maps API` for computing route and distance


**Steps :**
- Install `meteor`
- Install `meteor` packages
- Run the app `meteor run`
- Open the app on the browser

**For rider :**
- Register yourself
- Click on `Offer Ride`
- Enter the details and select the fare (You can make it **free** as well)
- Publish

**For passenger :**
- Search for source to destination rides
- Check the results
- Select the one you want to book
- If not logged in, you will be prompted to sign in yourself
- Book the ride

Contact information will be exchanged.


