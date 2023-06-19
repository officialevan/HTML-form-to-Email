function validateForm(){
    // Naming variables 
    var firstName = document.getElementById("firstName").value.trim();
    var lastName = document.getElementById("lastName").value.trim();
    var address = document.getElementById("address").value.trim();
    var city = document.getElementById("city").value.trim();
    var state = document.getElementById("state").value;
    var zipCode = document.getElementById("zipCode").value.trim();
    var areaCode = document.getElementById("areaCode").value.trim();
    var phoneNumber = document.getElementById("phoneNumber").value.trim()
    var email = document.getElementById("email").value.trim();
    var confirmEmail = document.getElementById("confirmEmail").value.trim();
    var mealPreference = document.querySelector('input[name="mealPreference"]:checked');
    var contactMethod = document.querySelectorAll('input[name="contactMethod"]:checked');
    var comments = document.getElementById("comments").value.trim();

    // Validations 
    var errors = []
    // Validate first name 
    if (firstName === "") {
        // Check if the first name field is empty
        errors.push("First Name is required");
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
        // Check if the first name contains non-alphabetical characters
        errors.push("First Name must not contain alphanumeric characters");
    }

    // Validate last name 
    if (lastName === "") {
        // Check if the last name field is empty
        errors.push("Last Name is required");
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
        // Check if the last name contains non-alphabetical characters
        errors.push("Last Name must not contain alphanumeric characters");
    }

    // Validate Address 
    if (address === "") {
        // Check if the address field is empty
        errors.push("Address is required");
    } else if (!/^[a-zA-Z0-9\s]+$/.test(address)) {
        // Check if the address contains non-alphanumeric characters
        errors.push("Address must contain alphanumeric characters only");
    }

    // Validate City 
    if (city === "") {
        // Check if the city field is empty
        errors.push("City is required");
    } else if (!/^[a-zA-Z]+$/.test(city)) {
        // Check if the city contains non-alphabetical characters
        errors.push("City must not contain alphanumeric characters");
    }

    // Validate State 
    if (state === "") {
        // Check if the state field is empty
        errors.push("State Required");
    }

    // Validate zipcode 
    if (zipCode === "") {
        // Check if the zip code field is empty
        errors.push("Zip Code is required");
    } else if (!/^\d{5}$/.test(zipCode)) {
        // Check if the zip code is not a 5-digit number
        errors.push("Zip Code Must be a 5-Digit Number");
    }

    // Validate Area Code 
    if (areaCode === "") {
        // Check if the area code field is empty
        errors.push("Area Code is required");
    } else if (!/^\d{3}$/.test(areaCode)) {
        // Check if the area code is not a 3-digit number
        errors.push("Area Code Must be a 3-Digit Number");
    }

    // Validate Phone Number 
    if (phoneNumber === "") {
        // Check if the phone number field is empty
        errors.push("Phone Number is required");
    } else if (!/^\d{7}$/.test(phoneNumber)) {
        // Check if the phone number is not a 10-digit number
        errors.push("Phone Number Must be a 10-Digit Number");
    }
    // Validation successful, process the phone number
    var fullPhoneNumber = areaCode + phoneNumber;
    console.log("Valid Phone Number: " + fullPhoneNumber);

    // Validate Email
    if (email === "") {
        // Check if the email is empty
        errors.push("Email is required");
    } else {
        // Create a regular expression pattern for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Use the test() method to check if the email matches the pattern
        if (!emailRegex.test(email)) {
        // If the email does not match the pattern, it is considered invalid
        errors.push("Invalid Email Address");
        }
    }
  
    // Confirm Email 
    if (confirmEmail === "") {
        // Check if the confirm email field is empty
        errors.push("Confirm Email is required");
    } else if (confirmEmail !== email) {
        // Check if the confirm email does not match the entered email
        errors.push("Emails don't match");
    }

    // Validate Meal Preferences 
    if (mealPreference === "") {
        // Check if the meal preference field is empty
        errors.push("Meal preferences required");
    }

    // Validate contact methods 
    if (contactMethod.length < 2) {
        // Check if less than 2 contact methods are selected
        errors.push("[IMPORTANT] Please select at least 2 contact methods");
    }

    // Display errors if there are any; otherwise, submit the form
    if (errors.length > 0) {
        // Show an alert with the accumulated errors
        alert("Errors: \n" + errors.join("\n"));
    } else {
        // Call the sendMail() function to submit the form
        sendMail();
    }

    // Prevent form submission by returning false
    return false;

}

function validateEmail(){
    var re = /^[^\s@]+@[^\s@].[^\s@]+$/;
    return re.test(email)
}

function sendMail(){
    var templateParams ={
        firstName:document.getElementById("firstName").value.trim(),
        lastName:document.getElementById("lastName").value.trim(),
        address : document.getElementById("address").value.trim(),
        city : document.getElementById("city").value.trim(),
        state : document.getElementById("state").value,
        zipCode : document.getElementById("zipCode").value.trim(),
        areaCode : document.getElementById("areaCode").value.trim(),
        phoneNumber : document.getElementById("phoneNumber").value.trim(),
        email : document.getElementById("email").value.trim(),
        confirmEmail : document.getElementById("confirmEmail").value.trim(),
        mealPreference : document.querySelector('input[name="mealPreference"]:checked').value,
        contactMethod : Array.from(document.querySelectorAll('input[name="contactMethod"]:checked')).map(function(input){
            return input.value;
        }),
        comments : document.getElementById("comments").value.trim()
    };

    // Send email using emailjs
    emailjs.send('service_u0warqa', 'template_uys435c', templateParams).then(function(response) {
        // If the email sending is successful, log the success response and show a success alert
        console.log("SUCCESS", response.status, response.text);
        alert("Email Sent Successfully");
        
        // Reset the contact form by clearing its input fields
        document.getElementById("contactForm").reset();
    }, function(error) {
        // If there is an error in sending the email, log the error and show an error alert
        console.log("FAILED", error);
        alert("Failed to send email. Please try again later");
    });

}