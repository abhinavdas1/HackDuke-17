(function () {
    angular.module('api.service',[
        'ngResource'
    ])
        .factory('api',['$resource',function ($resource) {
            return{
                SignUp: $resource('/sign-up',{},{}),

                Session: $resource('/sign-in',{},{}),

                Venues: $resource('/venues/:id', {id: '@id'}, {
                    reviews: {
                        method: 'GET',
                        url: '/venues/:id/review'
                    },
                    like: {
                        method : 'POST',
                        url: '/venues/:id/like'
                    }
                }),

                Me: $resource('/me',{},{
                    myReviews: {
                        method:'GET',
                        url: '/me/reviews'
                    }
                }),

                Users: $resource('/api/v1/getAllUsers'),

                Transaction: $resource('/api/v1/addtransaction',{},{
                    getAll: {
                        url: '/api/v1/getTransactions',
                        method: 'GET'
                    }
                }),

                SimplifyDebts: $resource('/api/v1/getSimplifiedDebts')
            };
        }])
})();