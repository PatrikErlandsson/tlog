function getUsername(array,data){
    for(i = 0; i < array.length; i++){
                
        if(array[i].email == data){
            console.log("USERNAME : " + array[i].username);         
            username = array[i].username;
            break
        }
        
    }
    return username;
}







/*

var user;
function newGet(array, data){
    array.forEach( function (arrayItem){
        var x = arrayItem.email;
        console.log(x);
        if(x == data){
            user = data;
            console.log("USER IS " + user);
            return user;
        }
        return user;
});
}


var testArray = [
    {
        email: "Hej"
    }, 
    {
        email: "apa"
    },
    {
        email: "ola"
    }
];


var name = "gun";
var apa = getUsername(testArray, name);
*/
