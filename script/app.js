var angularApp = angular.module('travelLog', ['ngMaterial', 'ngRoute', 'firebase', 'ngMdIcons']);
var firebaseRef = new Firebase("https://mytravelog.firebaseio.com/");
//var loggedIn = false;
var user;
 angularApp.config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('blue-grey')
    .primaryPalette('light-blue')
    .accentPalette('orange')
});

angularApp.config(function($routeProvider){
   $routeProvider
   .when('/', {
       templateUrl: 'templates/welcome.html',
       controller: 'welcomeController'
   })
   
   .when('/login', {
       templateUrl: 'templates/login.html',
       controller: 'loginController'
   })
   
   .when('/home', {
       templateUrl: 'templates/home.html',
       controller: 'homeController'
   })
   
   .when('/profile', {
       templateUrl: 'templates/profile.html',
       controller: 'profileController'
   })
   
   .when('/signup', {
       templateUrl: 'templates/signup.html',
       controller: 'signupController'
   })
   
   .otherwise({
       redirectTo: '/'
   });
});

//CONTROLLERS ///////////////////////////////////////////////////////////



//LOGIN CONTROLLER

angularApp.controller('loginController', function($scope, $firebaseObject, $firebaseArray, $mdDialog){
    $scope.message = "Login";
    var memberRef = new Firebase("https://mytravelog.firebaseio.com/members");
    var members = $firebaseArray(memberRef);
    $scope.loggedIn = false;
    
    $scope.authLogin = function(){
        firebaseRef.authWithPassword({
        email: $scope.email,
        password: $scope.password
        }, function(error, authData){
            if(error) {
                alert("Login failed");
            } else {
                console.log(members);
                loggedIn = true;
                $scope.loggedIn = true;
                $scope.$root.loggedIn = true;
                dataEmail = $scope.email;
                user = getUsername(members, dataEmail);
                console.log("Username = " + user);
                location.href = "#home";
            }
        })
    };
    
    
     $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/login-form.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
      };
    
});

//MAIN CONTROLLER
angularApp.controller('mainController', function($scope, $firebaseObject, $firebaseArray, $mdSidenav, $interval){
    $scope.toggleSidenav = function() {
        $mdSidenav('left').toggle();
    }
    
    $scope.unAuthLogout = function(){
        firebaseRef.unAuth;
        loggedIn = false;
        location.href = "#/";
        alert(user + " logged out");
        $scope.$root.loggedIn = false;
        $mdSidenav('left').toggle();
    }
    
    
    


    

    $scope.$root.loggedIn = false;
    
    
});
// -/MAIN CONTROLLER

angularApp.controller('welcomeController', function($scope, $interval){
        $scope.slideParts = [
        {
            title: 'Welcome to TraveLog'
        },
        {
            title: 'Create and log your trips'
        },
        {
            title: 'Share with your friends'
        },
        {
            title: 'Join now!'
        }
                  
    ];
    
    $scope.title = $scope.slideParts[0].title;
    
    $interval(slideText, 5000);
    

    function slideText(){
        console.log("Running");
        var slide = document.getElementById("slide");
        
        if($scope.title == $scope.slideParts[0].title) {
            console.log("init");
            $scope.title = $scope.slideParts[1].title;
            //slide.style.backgroundColor = "#8cd579";
            
        } else if($scope.title == $scope.slideParts[1].title) {
            $scope.title = $scope.slideParts[2].title;
           // slide.style.backgroundColor = "#aa4747";
            
        } else if($scope.title == $scope.slideParts[2].title) {
            $scope.title = $scope.slideParts[3].title;
           // slide.style.backgroundColor = "#d6bd5b";
            
        } else if($scope.title == $scope.slideParts[3].title) {
            $scope.title = $scope.slideParts[0].title;
           // slide.style.backgroundColor = "dodgerblue";
        }
        

    };
});

//SIGNUP CONTROLLER
angularApp.controller('signupController', function($scope, $firebaseObject, $firebaseArray, $mdSidenav){
    
    var memberRef = new Firebase("https://mytravelog.firebaseio.com/members");
    
    $scope.members = $firebaseArray(memberRef);
    
    $scope.newUser = function(){
       firebaseRef.createUser({
           email: $scope.email,
           password: $scope.password
       }, function(error, userData){
           if(error){
               console.log(error);
               alert("Sorry, " + error);
           } else {
               $scope.members.$add({
                   firstname: $scope.firstName,
                   lastname: $scope.lastName,
                   username: $scope.username,
                   email: $scope.email
               });
               
               console.log("You are now a member: ");
               alert("Welcome! You can now login");
               location.href = "#/";
               console.log(userData);
           }
       });
        
        
    }
    
    
});
// -/SIGNUP CONTROLLER

//HOME CONTROLLER
angularApp.controller('homeController', function($scope, $firebaseObject, $firebaseArray, $mdSidenav){
    if(!user){
        console.log("Unauthorized, please log in");
        location.href = "#/";
    }
    $scope.user = user;
    $scope.message = "Home";
    
    $scope.unAuthLogout = function(){
        firebaseRef.unAuth;
        loggedIn = false;
        location.href = "#/";
    }
    
   
    var personRef = new Firebase("https://mytravelog.firebaseio.com/persons");
    
    $scope.persons = $firebaseArray(personRef);
    
    $scope.addPerson = function(){
        var firstname = $scope.firstName;
        var firstname = $scope.lastName;
        if(firstname){
            $scope.persons.$add({
            firstname: $scope.firstName,
            lastname: $scope.lastName
        });
            } else {
                alert("You didnt enter any names");
            }
    };
    
    

});
// -/HOME CONTROLLER
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}



/*

*/
