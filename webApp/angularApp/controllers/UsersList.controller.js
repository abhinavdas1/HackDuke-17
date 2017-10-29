(function() {
    angular.module("UsersList.controller",[])
                .controller("UsersListController", userCtrl);

    function userCtrl(api) {
        var vm = this;
        vm.borrower = {};
        vm.borrowee = {};
        vm.dropDownList = [];
        vm.borrower.first_name = "user1";
        vm.borrowee.first_name = "user2";

        vm.addTransactionFlag = true;

        api.Users.get(function (response) {
            vm.usersList = response.users;
            vm.dropDownList = vm.usersList.slice();
            debugger
        });


        vm.toggleAddTransaction = function () {
            vm.addTransactionFlag = !vm.addTransactionFlag;
        }

        vm.selectBorrower = function (user) {
            if(vm.borrower._id)
                vm.dropDownList.add(vm.borrower);
            vm.borrower = user
            angular.forEach(vm.dropDownList,function (userFromList, i) {
                if(userFromList._id == user._id)
                    vm.dropDownList.splice(i,1);
            })
        }

        vm.selectBorrowee = function (user) {
            if(vm.borrower._id)
                vm.dropDownList.add(vm.borrower);
            vm.borrowee = user
            angular.forEach(vm.dropDownList,function (userFromList, i) {
                if(userFromList._id == user._id)
                    vm.dropDownList.splice(i,1);
            })
        }
    }
})();