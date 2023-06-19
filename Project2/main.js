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
    if(firstName === ""){
        errors.push("First Name is required")
    }else if(!/^[a-zA-Z]+$/.test(firstName)){
        errors.push("First Name must not contain alphanumerical characters")
    }

    // Validate last name 
    if(lastName === ""){
        errors.push("Last Name is required")
    }else if(!/^[a-zA-Z]+$/.test(lastName)){
        errors.push("Last Name must not contain alphanumerical characters")
    }
    // Validate Address 
    if(address === ""){
        errors.push("Address is required")
    }else if(!/^[a-zA-Z0-9\s]+$/.test(address)){
        errors.push("Address must contain alphanumerical characters only")
    }
    // Validate City 
    if(city === ""){
        errors.push("City is required")
    }else if(!/^[a-zA-Z]+$/.test(city)){
        errors.push("City must not contain alphanumerical characters")
    }
    // Validate State 
    if (state === ""){
        errors.push("State Required")
    }

    // Validate zipcode 
    if (zipCode === ""){
        errors.push("Zip Code is required")
    }else if(!/^\d{5}$/.test(zipCode)){
        errors.push("Zip Code Must be a 5-Digit Number")
    }

    // Validate Area Code 
    if (areaCode === ""){
        errors.push("Area Code is required")
    }else if(!/^\d{3}$/.test(areaCode)){
        errors.push("Area Code Must be a 3-Digit Number")
    }
    // Validate Phone Number 
    if (phoneNumber === ""){
        errors.push("Phone Number is required")
    }else if(!/^\d{10}$/.test(phoneNumber)){
        errors.push("Phone Number Must be a 10-Digit Number")
    }
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
    if (confirmEmail===""){
        errors.push("Confirm Email is required")
    }else if(confirmEmail !== email){
        errors.push("Emails don't match")
    }
    // Validate Meal Preferences 
    if(mealPreference === ""){
        errors.push("Meal preferences required")
    }
    // Validate contact methods 
    if(contactMethod.length<2){
        errors.push("[IMPORTANT] Please select atleast 2 contact methods")
    }
    // // Validate comments section to be less than 250 characters 
    // if (comments.length<250){
    //     errors.push("Comments should not exceed 250 words")
    // }
    // Display errors if there is one or submit form if there is'nt 
    if (errors.length > 0){
        alert("Errors: \n" +errors.join("\n"))
    }else{
        sendMail();
    }
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
    emailjs.send('service_u0warqa','template_uys435c',templateParams).then(function(response){
        console.log("SUCCESS", response.status, response.text)
        alert("Email Sent Succesfully");
        document.getElementById("contactForm").reset();
    },function(error){
        console.log("FAILED", error)
        alert("Failed to send email. Please try again later");
    });
}