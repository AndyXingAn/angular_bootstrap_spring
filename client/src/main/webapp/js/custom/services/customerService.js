'use strict';

angular.module('app.services').service('CustomerService', function ($http, $q) {
    this.getCustomers = function () {
        var d = $q.defer();

        $http.get('customer/customers/retrieve')
            .success(function (response) {
                d.resolve(response);
            })
            .error(function () {
                d.reject();
            });

        return d.promise;
    };

    this.deleteCustomer = function (id) {
        var d = $q.defer();

        $http.delete('customer/delete/' + id)
            .success(function (response) {
                d.resolve(response);
            })
            .error(function () {
                d.reject();
            });

        return d.promise;
    };

    this.saveCustomer = function (customer) {
        var d = $q.defer();

        $http.post('customer/save', customer)
            .success(function (response) {
                d.resolve(response);
            })
            .error(function () {
                d.reject();
            });

        return d.promise;
    };
});