describe('CustomerController Tests', function() {
    var $rootScope, $controller, mockCustomerService, deferred, spyPromise, customerData;

    beforeEach(function() { module('app'); });

    beforeEach(
        inject(function(_$rootScope_, _$controller_, _$q_) {

            $rootScope = _$rootScope_.$new();

            //create a promise for the spy to return to mock the async calls to the service
            deferred = _$q_.defer();
            spyPromise = deferred.promise;

            //create spy for the service being called so it is mocked out
            mockCustomerService = jasmine.createSpyObj('CustomerService',['getCustomers', 'deleteCustomer', 'saveCustomer']);

            // initialize controller
            $controller = _$controller_('CustomerController', {'$scope': $rootScope, CustomerService : mockCustomerService });

            // define initial customer data
            customerData = [
                {"id": 1, "firstName": "Foo", "lastName": "Bar"},
                {"id": 2, "firstName": "Jim", "lastName": "Sunny"},
                {"id": 3, "firstName": "Peter", "lastName": "Prone"},
                {"id": 4, "firstName": "Sam", "lastName": "Sully"}
            ];
        })
    );
});

describe('CustomerController Tests', function () {
    beforeEach(module('app.controllers'));
    beforeEach(module(function ($provide) {

            $provide.value('$scope', {
                remove: jasmine.createSpy('$scope.remove'),
                save: jasmine.createSpy('$scope.save')
            });

            $provide.factory('customerService', function ($jasmine) {
                return $jasmine.createPromiseSpyObj(
                    'customerService', [ 'getCustomers', 'deleteCustomer', 'saveCustomer' ]
                );
            });

            $provide.factory('messageService', function ($jasmine) {
                return $jasmine.createPromiseSpyObj(
                    'messageService', [ 'error' ]
                );
            });
        })
    );

    describe('CustomerController Structural Tests', function () {
        it('should have an remove function in scope', inject(function ($scope) {
            expect(angular.isFunction($scope.remove)).toBe(true);
        }));

        it('should have an save function in scope', inject(function ($scope) {
            expect(angular.isFunction($scope.save)).toBe(true);
        }));

    });

    describe('CustomerController Save Tests', function () {
        it('should have not saved any data with service call returning true', inject(function ($controller, $scope, customerService, messageService) {
            $controller('CustomerController');

            var customer = {"id": 2, "firstName": "Jim", "lastName": "Sunny"};

            $scope.save(2);

            customerService.saveCustomer.$resolve(true);

            expect(customerService.saveCustomer).toHaveBeenCalledWith(customer);
            expect(messageService.error).not.toHaveBeenCalled();
        }));

    });
});