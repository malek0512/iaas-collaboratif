// Define a Collection
Machines = new Mongo.Collection("Machines", {
  transform: function (doc) { return new Machine(doc); }
});

/**
 * The machines inserted in the database will have to follow the schema described
 */
Schemas.Machines = new SimpleSchema({
	user_id : {
		type: String,
		regEx : SimpleSchema.RegEx.Id
	},
	ressource_id : {
		type: String,
		regEx : SimpleSchema.RegEx.Id
	},
	machinetype : {
		type: String
	},
	machinename : {
		type: String,
		optional : true
	},
	cpu : {
		type: Number, // in GHz
		decimal: true
	},
	cpunumber : {
		type: Number,
		decimal: false
	},
	ram : {
		type: Number, // in Gb
		decimal: true
	},
	storage :{
		type: Number, // in Gb
		decimal: true
	},
	bandwidth:{
		type: Number, // in Gbit/s
		decimal: true
	},
	dns : { 
		type: String,
		optional: true,
		regEx: SimpleSchema.RegEx.Domain
	},
	elapse_time : {   // in seconds
		type: Number, 
		optional: true	
	},
	state : {
		type: String, 
		allowedValues: ["providerdown", "up", "down"],
		optional: true	
	},
});

/**
 * Set the restrictions for Machines database modifications
 */
Machines.attachSchema(Schemas.Machines,  {transform: true, replace:true});

	Machines.allow({
		insert: function(userId,doc) {return userId && doc.user_id === userId;},
    	update: function(userId, doc, fieldNames, modifier) {return userId && doc.user_id === userId;},
    	remove: function(userId,doc) {return userId && doc.user_id === userId;},
    	fetch: ["user_id"]
	})

/**
 * Machines obtained from the database contains all the Machine functions
 */
Machine = function (opts) {
	_.extend(this, opts);
}


// Publishing to move to independants files
if (Meteor.isServer) {
  // Only publish infos that are public or belong to the current user
  Meteor.publish("machines", function () {
    return Machines.find({ user_id: this.userId });
  });
}

// The client gets the machines published
if (Meteor.isClient) {
	Meteor.subscribe("machines");
}