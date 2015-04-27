'use strict';

/**
 * @ngdoc function
 * @name yoAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoAngularApp
 */
angular.module('yoAngularApp')
  .controller('MainCtrl', function ($scope, $timeout, Restangular, $modal, dialogs) {

    $scope.gridOpts = {
      columnDefs: [
        {
          name: '',
          field: 'id',
          width: 200,
          pinnedRight: true,
          enableColumnMenu: false,
          cellTemplate: '  <button type="button" class="btn btn-primary" ng-click="grid.appScope.edit(row.entity.id)">编辑</button><button type="button" class="btn btn-danger" ng-click="grid.appScope.toRemove(row.entity.id, row.entity.name)">删除</button>'
        },
        {
          name: '厂家名称',
          field: 'name',
          width: 150,
          enableHiding: false,
          enablePinning: false
        },
        {name: '目标安装', field: 'planned', width: 100, enableHiding: false, enablePinning: false},
        {name: '实际安装', field: 'installed', width: 100, enableHiding: false, enablePinning: false},
        {
          name: '详细地址', field: 'address', width: 150, enableHiding: false, enablePinning: false
        },
        {name: '邮编', field: 'zip', width: 100, enableHiding: false, enablePinning: false},
        {name: '负责人', field: 'contact', width: 100, enableHiding: false, enablePinning: false},
        {name: '电话', field: 'phone', width: 150, enableHiding: false, enablePinning: false},
        {name: '邮箱', field: 'email', width: 150, enableHiding: false, enablePinning: false}
      ],
      data: []
    };

    var companies = Restangular.all('customers');
    companies.getList().then(function (companies) {
      $scope.gridOpts.data = companies;
    });

    $scope.company = {};
    $scope.add = function () {

      $scope.addModal = $modal.open({
        templateUrl: 'views/new.html',
        windowClass: 'editDialog',
        scope: $scope
      });
    };

    $scope.edit = function (id) {
      var company = _($scope.gridOpts.data).find(function (com) {
        return com.id == id;
      });
      if (company !== null) {
        $scope.company = company;
        $scope.editModal = $modal.open({
          templateUrl: 'views/new.html',
          windowClass: 'editDialog',
          scope: $scope
        });

      }
    };

    $scope.save = function () {

      if ($scope.company.id) {
        $scope.company.put().then(function () {
          $scope.cancel();
        });
      }
      else {
        companies.post($scope.company).then(function (company) {
          $scope.gridOpts.data.push(company);
          $scope.cancel();
        });
      }
    };


    $scope.cancel = function () {
      if ($scope.addModal)
        $scope.addModal.close();

      if ($scope.editModal)
        $scope.editModal.close();
    };

    $scope.toRemove = function (id, name) {
      var dlg = dialogs.confirm('删除 ' + name, '确认删除？');
      dlg.result.then(function (btn) {
        $scope.remove(id);
      }, function (btn) {

      });
    };

    $scope.remove = function (id) {

      var company = _($scope.gridOpts.data).find(function (com) {
        return com.id == id;
      });
      if (company !== null) {

        var index = _($scope.gridOpts.data).indexOf(company);
        company.remove().then(function () {
            $scope.gridOpts.data.splice(index, 1);
          },
          function () {

          });
      }
    };
  });
