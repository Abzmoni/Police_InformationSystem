let criminal_id = document.querySelector('.data1');
let first_name = document.querySelector('.data2');
let last_name = document.querySelector('.data3');
let criminal_email = document.querySelector('.data4');
let criminal_address = document.querySelector('.data5');
let criminal_address_city = document.querySelector('.data6');
let criminal_address_state = document.querySelector('.data7');
let criminal_mobile = document.querySelector('.data8');
let crime_id = document.querySelector('.data9');
let crime_name = document.querySelector('.data10');
let crime_description = document.querySelector('.data11');
//let inp = document.querySelector('.joshc');

// let crime_name = document.querySelector('.data10');
// let crime_description = document.querySelector('data11');

let input = document.querySelector('input')

async function getCriminal(){
    let response = await fetch('/criminal')
    let data = await response.json();
    data.forEach((val, index) => {
        if(input.value.toLowerCase() == val.first_name.toLowerCase()) {
            criminal_id.innerHTML = `Criminal ID : ${val.criminal_id}`;
            first_name.innerHTML = `First Name : ${val.first_name}`;
            last_name.innerHTML = `Last Name : ${val.last_name}`;
            criminal_email.innerHTML = `Criminal Email : ${val.criminal_email}`;
            criminal_address.innerHTML = `Criminal Address : ${val.criminal_address}`;
            criminal_address_city.innerHTML = `Criminal Address City : ${val.criminal_address_city}`;
            criminal_address_state.innerHTML = `Criminal Address State : ${val.criminal_address_state}`;
            criminal_mobile.innerHTML = `Criminal Mobile : ${val.criminal_mobile}`;
            crime_id.innerHTML = `Crime ID : ${val.crime_id}`;
        }
    }) 
    // data.forEach((val, index) => {
    //     if(inp.value.toLowerCase() == val.first_name.toLowerCase()) {
    //         crime_id.innerHTML = data[index].criminal_id;
    //         first_name.innerHTML = data[index].first_name;
    //         last_name.innerHTML = data[index].last_name;
    //         criminal_email.innerHTML = data[index].criminal_email;
    //         criminal_address.innerHTML = data[index].criminal_address;
    //         criminal_address_city.innerHTML = data[index].criminal_address_city;
    //         criminal_address_state.innerHTML = data[index].criminal_address_state;
    //         criminal_mobile.innerHTML = data[index].criminal_mobile;
    //         crime_id.innerHTML = data[index].crime_id;
    //     }
    // })
}

async function getCrime(){
    let response = await fetch('/crime')
    let data = await response.json();
    data.forEach((val, index) => {
        if(input.value == val.crime_id) {
            crime_id.innerHTML = `Crime ID : ${val.crime_id}`;
            crime_name.innerHTML = `Crime Name : ${val.crime_name}`;
            crime_description.innerHTML =  `Description : ${val.crime_description}`;
            criminal_id.innerHTML = `Criminal ID : ${val.criminal_id}`;
        }
    })
}