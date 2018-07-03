/**
 * Created by Shahrukh on 3/1/2018.
 */


var myApp=angular.module("myModule",[])
    .controller("myController",function($scope){


        var employees = [{

            firstName: "Hassan",
            lastName: "Hastings",
            likes: 0
        },{

            firstName: "Ali",
            lastName: "Hastings",
            likes: 0
        },{

            firstName: "David",
            lastName: "Hastings",
            likes: 0
        },{

            firstName: "Nomi",
            lastName: "Hastings",
            likes: 0
        },{

            firstName: "Numan",
            lastName: "Hastings",
            likes: 0
        },
        ];
        
        $scope.employees=employees;

           $scope.incrementLikes= function (technology) {
               technology.likes++;
           }


        var person={

            name: "saeed",
            age: "30",
            image: "images/zoomed.jpg"

        }
        $scope.person=person;

        $scope.message="Hello world";


    });
/*
var myController =function($scope){

    $scope.message="Hello world";
}

myApp.controller("myController",myController);
*/


/*
myApp.controller("myController",function($scope){

    var empployee = {

        firstName: "David",
        lastName: "Hastings",
        gender: "male"

    }


    $scope.employee=empployee;

    $scope.message="Hello world";

});


*/
var myApp=angular.module("myModule",[])
    .controller("webServiceController",function($scope,$http){

       $http.get("http://rest-service.guides.spring.io/greeting").then(function(response){

           $scope.cities=response.data;


       });


    });



var myApp=angular.module("myModule",["firebase"])
    .controller("fireController",function($scope,$firebaseObject){

    var ref=firebase.database().ref();
        $scope.name=$firebaseObject(ref);

    });


var myApp=angular.module("myModule",["firebase"])
    .controller("addController",function($scope,$firebaseArray){

    $scope.addPerson=function(){

        var ref=firebase.database().ref("Person");
        $firebaseArray(ref).$add($scope.Person)
            .then(function (ref) {
                $scope.Person.first="";
                $scope.Person.last="";
            },function(error){

                  console.log(error);
            }


        )

    }


    });


var myApp=angular.module("myModule",["firebase"])
    .controller("listController",function($scope,$firebaseArray){



            var ref=firebase.database().ref("Person");
            $scope.Person = $firebaseArray(ref);




    });
















