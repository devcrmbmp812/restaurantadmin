/**
 * Created by Shahrukh on 3/6/2018.
 */
  
var totalUsers=0;
var countUsers=0;
var lastOrderCount=0;
var orders= new Array();

var myApp=angular.module("pizza",["firebase"])
    .controller("ordersController",function($scope,$firebaseArray)        {



        var ref=firebase.database().ref().child('ORDERS');
            ref.on('value',function(snap){
                var obj=document.getElementById('ordersBody');
                obj.innerHTML ="";
                totalUsers=snap.numChildren();

                angular.forEach(snap.val(), function(value, key) {


                    var userKey=key;
                    this.user='';
                    var userRef=firebase.database().ref('USERS').child(userKey);
                    userRef.on('value',function(userSnap){
                        countUsers++;

                        this.user=userSnap.val();
                        var uKey= userSnap.key;

                        populateUi(value,this.user,obj,uKey,"Pending");

                    });


                });


            });


      ////////////////////

      /////////



    }).controller("usersController",function($scope,$firebaseArray)        {



        var ref=firebase.database().ref("USERS");
        $scope.users = $firebaseArray(ref);


       $scope.displayProfile= function(user){
            $("#profileModal").modal();
           document.getElementById('pName').innerHTML=user.name;
           document.getElementById('pEmail').innerHTML=user.email;
           document.getElementById('pCellPhone').innerHTML=user.cellPhone;
           document.getElementById('pPhone').innerHTML=user.phone;
           document.getElementById('pAddress').innerHTML=user.address+' | '+user.city + ' | '+user.state;
           document.getElementById('pZip').innerHTML='ZIP: '+user.zipcode;


        }






    }).controller("acceptedOrdersController",function($scope,$firebaseArray)        {



        var ref=firebase.database().ref().child('ORDERS');
        ref.on('value',function(snap){
            var obj=document.getElementById('ordersBody');
            obj.innerHTML ="";
            totalUsers=snap.numChildren();
            angular.forEach(snap.val(), function(value, key) {
                var userKey=key;
                this.user='';
                var userRef=firebase.database().ref('USERS').child(userKey);
                userRef.on('value',function(userSnap){
                    countUsers++;
                    this.user=userSnap.val();
                    var uKey= userSnap.key;

                    populateUi(value,this.user,obj,uKey,"Accepted");
                });








            });

        });

        ////////////////////

        /////////



    }).controller("deliveredOrdersController",function($scope,$firebaseArray)        {



        var ref=firebase.database().ref().child('ORDERS');
        ref.on('value',function(snap){
            var obj=document.getElementById('ordersBody');
            obj.innerHTML ="";
            totalUsers=snap.numChildren();
            angular.forEach(snap.val(), function(value, key) {
                var userKey=key;
                this.user='';
                var userRef=firebase.database().ref('USERS').child(userKey);
                userRef.on('value',function(userSnap){
                    countUsers++;
                    this.user=userSnap.val();
                    var uKey= userSnap.key;

                    populateUi(value,this.user,obj,uKey,"Delivered");
                });








            });

        });

        ////////////////////

        /////////



    }).controller("productsController",function($scope,$firebaseArray)        {



        var ref=firebase.database().ref("PRODUCTS");
        $scope.products = $firebaseArray(ref);

        $scope.delItem=$scope.products;

        $scope.deleteProduct= function(product){



            $scope.delItem=product;

            $("#deleteModal").modal();
        }
        $scope.confirmDelete=function(){

            firebase.database().ref('PRODUCTS').child($scope.delItem.$id).remove();

            $("#deleteSuccessModal").modal();

        }

        $scope.showProductModal= function(){
            document.getElementById('addProd').style.display='block';
            document.getElementById('successMessage').style.display='none';

            $("#addProductModal").modal();


        }

        $scope.addProduct= function(){
            var name=document.getElementById('name');
            var price=document.getElementById('price');
            var description=document.getElementById('description');
            var file= document.getElementById('pic').files[0];


            if(name.value==""||price.value==""||description.value==""){

                document.getElementById('errorMsg').style.display='block';

            }
            else{
                var storageRef=firebase.storage().ref(''+(Math.floor(Date.now())));
                var downloadUrl='';
                storageRef.put(file).then(function(snapshot){
                    downloadUrl=snapshot.downloadURL;
                    insertProduct();

                });






              function insertProduct(){
                  var ref=firebase.database().ref("PRODUCTS");
                  $firebaseArray(ref).$add({ description: description.value, imageUrl: downloadUrl, name: name.value,price: price.value})
                      .then(function (ref) {
                      $.ajax({
  url: "push.php",
  type: "get", //send it through get method
  data: { 
    description: description.value, 
    name: name.value
    
  },
  success: function(response) {
    //Do Something
  
  },
  error: function(xhr) {
    //Do Something to handle error
  }
});
                          document.getElementById('productForm').reset();
                          document.getElementById('addProd').style.display='none';
                          document.getElementById('successMessage').style.display='block';
                          
                          

                      },function(error){

                          console.log(error);
                      }


                  )


              }






            }



        }






    });

function findLength(object){
    var length=0;
    angular.forEach(object, function(value, key) {
        length++;
    });
    return length;
}



function populateUi(value,user,obj,uKey,status){
    var count=0;
    var lastIndex=0;

    if(countUsers==totalUsers){
   lastIndex=findLength(value);

    }

    angular.forEach(value, function(value, key) {

        count++;


        if(value.orderStatus==status) {

            
            var ket = "'" + key + "'" + ",'" + user.email + "'" + ",'" + user.name + "'" + ",'" + user.phone + "'" + ",'" + user.address  + "'" + ",'" + user.city + "'" + ",'" + uKey + "'"+ ",'" +status + "'" + ",'" +user.cellPhone + "'"+ ",'" +user.state + "'"+ ",'" +user.zipcode + "'" + ",'" +user.username + "'"+ ",'" +user.cpf + "'";
   
            var data = calQuantity(value.orderProducts);

            var  order={
                userKey: uKey,
                orderkey: key,
                email: user.email,
                orderDate: value.orderDate,
                quantity: data.quantity,
                total: data.total,
                ket: ket



            };
            orders.push(order);
            //
            //var html = '<tr> ' +
            //    '<td>' + user.email + '</td>' +
            //    '<td>' + value.orderDate + '</td>' +
            //    '<td>' + data.quantity + '</td>' +
            //    '<td>$' + data.total + '</td>' +
            //    '<td>' + '<button type="button"  id="myBtn" onclick="orderDetail(' + ket + ')" style="background-color: green; color: white">Details</button>' + '</td>' +
            //
            //    '</tr>';
            //obj.innerHTML = html+obj.innerHTML;
        }
        if(countUsers==totalUsers && count==lastIndex ){


            populateUiNew(obj);
        }


    },user,orders);


}

function populateUiNew(obj){


    sortOrderByDate();


    angular.forEach(orders, function(value, key) {

        var html = '<tr> ' +
            '<td>' + value.email + '</td>' +
            '<td>' + value.orderDate + '</td>' +
            '<td>' + value.quantity + '</td>' +
            '<td>$' + value.total + '</td>' +
            '<td>' + '<button type="button"  id="myBtn" onclick="orderDetail(' + value.ket + ')" style="background-color: green; color: white">Details</button>' + '</td>' +

            '</tr>';
       obj.innerHTML = html+obj.innerHTML;





    });
    totalUsers=0;
    countUsers=0;
    lastOrderCount=0;
    orders=[];


}

function sortOrderByDate(){

    for(i=0 ; i<orders.length; i++ ){

        for(j=i;j<orders.length;j++){

       if(sortDate(orders[i].orderDate,orders[j].orderDate)==1){


           var temp=orders[i];
           orders[i]=orders[j];
           orders[j]=temp;

       }



        }


    }




}

function sortDate(a,b){
    a= a.split("/");
    b= b.split("/");
    if(a[2]>b[2]){

        return 1;
    }
    else if(a[2]==b[2]){

        if(a[1]>b[1]){
            return 1;
        }
        else if(a[1]==b[1]){
            if(a[0]>b[0]){
                return 1;

            }
            else
            return 0;
        }
        else
            return 0;

    }
    else
    return 0;

}



function orderDetail(key,email,name,phone,address,city,uKey,status,cellPhone,state,zip,username,cpf){


               $("#myModal").modal();
        var order='';
        var orderRef=firebase.database().ref('ORDERS').child(uKey).child(key);
        orderRef.on('value',function(orderSnap){
            order=orderSnap.val();



        });


        var productsList=document.getElementById('detailsLowerTable');

        var totalQuantity=document.getElementById('totalQuantity');
        var totalAmount=document.getElementById('totalAmount');

        var productsHtml='';
        var quantiyHtml='';
        var priceHtml='';
        var totalQ=0;
        var totalA=0;

    angular.forEach(order.orderProducts, function(value, key) {
        productsHtml+='<tr><td style="width: 40%;">'+value.description+'</td>'
        +'<td style="margin-left: 40%">'+value.quantity+'</td>'
        +'<td>$'+(value.price*value.quantity).toFixed(2)+'</td></tr>';
        totalQ+=value.quantity;
        totalA+=value.quantity*value.price;

    });





        var obj=document.getElementById('detailsBody');

      var html='<tr>   ' +
          '<td> <b>Name </b> </td>' +
          '  <td>'+name+'  </td> '
             +
          '<td> <b>Email </b> </td>' +
          '  <td>'+email+'  </td> ' +
          '</tr>' +
          '<tr> <td> <b>Phone </b> </td>' +
          '  <td>'+phone+'  </td> '
          +
          '<td> <b>Address </b> </td>' +
          '  <td>'+address+'  </td> ' +
          '</tr>' +
          '<tr >' +
          '  <td><b> Cell Phone </b></td><td>'+cellPhone+' </td> <td> <b>City </b> </td> <td>'+ city +  '</td> </tr>'
          +
              '<tr >' +
          '  <td><b> Username </b></td><td>'+username+' </td> <td> <b>State </b> </td> <td>'+ state +  '</td> </tr>' +

              '<tr >' +
          '  <td><b> CPF </b></td><td>'+cpf+' </td> <td> <b>ZIP </b> </td> <td>'+ zip +  '</td> </tr>'

           +
          '<tr><td> <b>Order Date </b> </td>' +
          '  <td>'+order.orderDate+'  </td> ' +

          '<td> <b>Order Method </b> </td>' +
          '  <td>'+order.orderMethod+'  </td> ' +
          '</tr>';


    var ket="'"+key+"'"+",'"+uKey+"'";

          obj.innerHTML=html;
        productsList.innerHTML=productsHtml;
        totalQuantity.innerHTML=totalQ;
        totalAmount.innerHTML=totalA;
    if(status=="Pending") {

        document.getElementById('buttonsDiv').innerHTML = ' <div class="col-sm-4"> ' +
            '<button  data-dismiss="modal" type="button" onclick="acceptOrder('+ket+')" class="btn" style="background-color: #129621; color: white" >Accept</button> ' +
            '</div> ' +
            '<div class="col-sm-3"> ' +
            '<button type="button" class="btn" style="background-color: #d12923; color: white">Reject</button></div> ' +
            '<div class="col-sm-3"><button type="button" onclick="printDetails()" class="btn" style="background-color:#96999e; color: white">Print</button> '+
            '</div>';
    }
    if(status=="Accepted"){
        document.getElementById('deliverBtnDiv').innerHTML ='<div class="col-sm-4 col-sm-offset-4"> ' +
            '<button data-dismiss="modal" type="button" onclick="deliverOrder('+ket+')"  class="btn btn-success" style="background-color: #129621; color: white; width: 100%" >Deliver Now</button> ' +
            '</div>'

    }




    }

function acceptOrder(key,uKey){

   
    firebase.database().ref().child('ORDERS').child(uKey).child(key)
        .update({ orderStatus: "Accepted" });

    $("#successModal").modal();
}
function deliverOrder(key,uKey){
    

    firebase.database().ref().child('ORDERS').child(uKey).child(key)
        .update({ orderStatus: "Delivered" });

    $("#deliverModal").modal();
}

function calQuantity (products){

    this.data={
        quantity:0,
        total:0
    };
    angular.forEach(products, function(value, key) {

        this.data.quantity+=value.quantity;
        this.data.total+=value.quantity*value.price;

    },this);


    return this.data;


}

function printDetails(){
    window.print();


}




