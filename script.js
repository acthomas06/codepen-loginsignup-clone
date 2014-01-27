/*

############## API ##############

codepen.api.signup(user_object)
	description: to sign up a new user
	parameters: user object, which contains properties: name, email, username, password
	returns: response object

codepen.login(user_object)
	description: to login an existing user
	parameters: user object, which contains properties: username, password
	returns: response object


Reponse Objects:

{
	success: true/false,
	error: (string)
}


##users already signed up (can log in)
	('suzy', 'I@msoawesome')
	('conan', 'gingertastic')
	('jerry', '@#!$%@')
*/


$('document').ready(function() {

	codepen.objects.User = {
		name: null,
		email: null,
		username: null,
		password: null,
		is_logged_in: false
	};

	var NewUser = Object.create(codepen.objects.User, {
		firstname: {
			writable: true,
			enumerable: true,
			value: ''
		},
		lastname: {
			writable: true,
			enumerable: true,
			value: ''
		}
	});

	//Hide the signup on load
	$('.signup-form').hide();
	//Bring up the signup element if you click signup, and hide the login element.

	$('.signup-form-btn').click(function() {		//Click signup form button on nav bar
		$(this).addClass('active');					//Add 'active' class
		$('.signup-form').show();					//Show the signup form
		$('.login-form-btn').removeClass('active'); //Remove 'active' class from login button
		$('.login-form').hide();					//Hide the login form
	});

	$('.login-form-btn').click(function() {			//Click login form button on nav bar
		$(this).addClass('active');					//Add 'active' class
		$('.login-form').show();					//Show the login form
		$('.signup-form-btn').removeClass('active');//Remove active class from signup button
		$('.signup-form').hide();					//Hide the signup form
	});

	$('.btn-login').click(function() {						//Click login button

		var user = Object.create(NewUser);
		user.username = $('#login-username-field').val();	//Add username input to user object
		user.password = $('#login-password-field').val();	//Add password input to user object
		
		
		var response = codepen.api.login(user);

		if(response.success == true)
		{
			$('.login-form .form-feedback').html("You're logged in!");
			user.is_logged_in = true;
		}
		else
		{
			$('.login-form .form-feedback').html("Login didn't work correctly.");
		}
	});

	$('.btn-signup').click(function() {

		var user = Object.create(NewUser);

		user.firstname = $('#signup-firstname-field').val();
		user.lastname = $('#signup-lastname-field').val();
		user.email = $('#signup-email-field').val();
		user.username = $('#signup-username-field').val();
		user.password = $('#signup-password-field').val();

		if($('#signup-password-field').val() && $('#signup-again-field').val() == '')
		{
			alert('Please provide your password again.');
		}

		if($('#signup-password-field').val() != $('#signup-again-field').val())
		{
			alert('Your passwords do not match. Please provide the correct passwords.');
		}
	
		else
		{
			var response = codepen.api.signup(user);
			if(response.success == true) 
			{
				$('.signup-form .form-feedback').html("Congratulations! You're signed up!");
				user.is_logged_in = true;
			}
			else
			{
				$('.signup-form .form-feedback').html("Sorry, there was an error.");
			}
		}

	});
});