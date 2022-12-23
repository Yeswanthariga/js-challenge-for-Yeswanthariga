
  $(document).ready(() => {

    var sl_no = 11;

    jQuery.validator.addMethod("alphanumeric", function (value, element) {
        return this.optional(element) || /^[\w.]+$/i.test(value);
    }, "Letters, numbers, and underscores only please");

    jQuery.validator.addMethod("phoneFormat", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/[1-9]\d{2}-\d{3}-\d{4}/);
    }, "Invalid phone number");


    $('#usersForm').validate({
        rules: {
            firstName: {
                required: true,
                minlength: 3,
                alphanumeric: true
            },
            lastName: {
                required: true,
                minlength: 3,
                alphanumeric: true
            },
            userName: {
                required: true,
                alphanumeric: true
            },
            email: {
                email: true,
            },
            phone: {
                required: true,
                phoneFormat: true
            }
        },
        messages: {

        },
        submitHandler: ()=>{
            let firstName = $("#firstName").val()
            let lastName = $("#lastName").val()
            let userName = $("#userName").val()
            let email = $("#email").val()
            let phone = $("#phone").val()
            let website = $("#website").val()
            let address = $("#address").val()
            let companyName = $("#companyName").val()

            $("#tBody").append(`
                <tr>
                <td>${sl_no}</td>
                <td>${firstName} ${lastName}</td>
                <td>${userName}</td>
                <td>${email}</td>
                <td>${address}</td>
                <td>${phone}</td>
                <td><a href="${website}" target="_blank">${website}</a></td>
                <td>${companyName}</td>
                </tr>
            `)
            sl_no++;
            $("#firstName").val("")
            $("#lastName").val("")
            $("#userName").val("")
            $("#email").val("")
            $("#phone").val("")
            $("#website").val("")
            $("#address").val("")
            $("#companyName").val("")
        }
    })



    
})
const myTableBody = document.getElementById('tBody')
fetch("https://jsonplaceholder.typicode.com/users")
.then((res)=>res.json())
.then((res)=>{
    
    res.map((val,i)=>{
        myTableBody.innerHTML += `

    <tr>
        <td>${val.id}</td>
        <td>${val.name}</td>
        <td>${val.username}</td>
        <td>${val.email}</td>
        <td>${val.address.street}, ${val.address.suite}, ${val.address.city}, ${val.address.zipcode}</td>
        <td>${val.phone}</td>
        <td>${val.website}</td>
        <td>${val.company.name}</td>

    </tr>

    ` 
    })


}).catch((err)=>{
    console.log(err)
    alert("Something went wrong while fetching the users.")
})