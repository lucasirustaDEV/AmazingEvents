const form = document.getElementById('form');

const sendMessage = (event) => {
    event.preventDefault();
    /* console.log(event.target.name.value); */
    const {name, email, message} = event.target;

    if (name.value === ''){
        alert("Please enter a name");
        document.getElementById("name").focus();
    } else if (email.value === '') {
        alert("Please enter a email address");
        document.getElementById("email").focus();
    } else if (message.value === ''){
        alert("Please enter a message");
        document.getElementById("message").focus();
    } else {
        console.log(name.value, email.value, message.value);
        
        const myFormData = new FormData(event.target);
        const formDataObj = Object.fromEntries(myFormData.entries());
        console.log(formDataObj);
        const JSONData = JSON.stringify(formDataObj);
        console.log(JSONData);

        alert("Message sent successfully");
        document.getElementById("form").reset();
    }
}

form.addEventListener('submit', sendMessage);
