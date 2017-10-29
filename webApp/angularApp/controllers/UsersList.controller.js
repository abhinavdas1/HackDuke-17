(function() {
    angular.module("UsersList.controller",[])
                .controller("UsersListController", userCtrl);

    function userCtrl(api, toastr) {
        var vm = this;
        vm.dropDownList = [];
        vm.borrower = {};
        vm.borrowee = {};
        vm.mapping = {};
        vm.borrower.first_name = "user1";
        vm.borrowee.first_name = "user2";

        vm.addTransactionFlag = true;

        api.Users.get(function (response) {
            vm.usersList = response.users;
            vm.dropDownList = vm.usersList.slice();
            angular.forEach(vm.usersList,function (users, i) {
                vm.mapping[users._id.toString()] = users.first_name + " " + users.last_name;
            });
            debugger
        });

        api.Transaction.getAll(function (response) {
            vm.transactions = response.transactions;
        })


        vm.toggleAddTransaction = function () {
            vm.addTransactionFlag = !vm.addTransactionFlag;
        }

        vm.selectBorrower = function (user) {
            if(vm.borrower._id)
                vm.dropDownList.push(vm.borrower);
            vm.borrower = user
            angular.forEach(vm.dropDownList,function (userFromList, i) {
                if(userFromList._id == user._id)
                    vm.dropDownList.splice(i,1);
            })
        }

        vm.selectBorrowee = function (user) {
            if(vm.borrowee._id)
                vm.dropDownList.push(vm.borrowee);
            vm.borrowee = user
            angular.forEach(vm.dropDownList,function (userFromList, i) {
                if(userFromList._id == user._id)
                    vm.dropDownList.splice(i,1);
            })
        }

        vm.commitTransaction = function() {
            var param = {
                from: vm.borrowee._id,
                to: vm.borrower._id,
                amount: vm.amount
            }

            api.Transaction.save(param, function (response) {
                toastr.success("Committed the transaction");
                vm.dropDownList = vm.usersList.slice();
                vm.borrower = {};
                vm.borrowee = {};
                vm.borrower.first_name = "user1";
                vm.borrowee.first_name = "user2";
                vm.amount = 0;
                vm.addTransactionFlag = true;
                api.Transaction.getAll(function (response) {
                    vm.transactions = response.transactions;
                })
            }, function (errResponse) {
                toastr.error(errResponse);
            })
        }

        vm.simplifyDebts = function() {
            api.SimplifyDebts.get(function (response) {
                toastr.success("Successfully simplified the debts")
                vm.transactions = response.transaction;
            })
        }
    }
})();