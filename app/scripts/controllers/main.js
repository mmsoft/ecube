'use strict';

/**
 * @ngdoc function
 * @name yoAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoAngularApp
 */
angular.module('yoAngularApp')
  .controller('MainCtrl', function ($scope, Restangular, uuid2, ngDialog, dialogs) {

    $scope.gridOpts = {
      columnDefs: [
        {
          name: '',
          field: 'id',
          width: 200,
          pinnedRight: true,
          cellTemplate: ' <button type="button" class="btn btn-primary" ng-click="grid.appScope.edit(row.entity.id)">编辑</button> <button type="button" class="btn btn-danger" ng-click="grid.appScope.toRemove(row.entity.id, row.entity.name)">删除</button>'
        },
        {
          name: '厂家名称', field: 'name', width: 150
        },
        {name: '采集器目标安装数', field: 'planned', width: 150},
        {name: '采集器实际安装数', field: 'installed', width: 150},
        {
          name: '详细地址', field: 'address', width: 500
        },
        {name: '邮编', field: 'zip', width: 100},
        {name: '负责人', field: 'contact', width: 100},
        {name: '电话', field: 'phone', width: 200},
        {name: '邮箱', field: 'email', width: 200}
      ],
      data: []
    };

    var companies = Restangular.all('customers');
    companies.getList().then(function (companies) {
      $scope.gridOpts.data = companies;
    });

    $scope.company = {};
    $scope.add = function () {

      ngDialog.open({
        template: 'views/new.html',
        className: 'ngdialog-theme-default newTaskDialog',
        scope: $scope,
        preCloseCallback: function (customer) {

        }
      });
    };

    $scope.edit = function (id) {
      var company = _($scope.gridOpts.data).find(function (com) {
        return com.id == id;
      });
      if (company !== null) {
        $scope.company = company;
        ngDialog.open({
          template: 'views/new.html',
          className: 'ngdialog-theme-default newTaskDialog',
          scope: $scope,
          preCloseCallback: function (customer) {

          }
        });
      }
    };

    $scope.save = function () {
      $('#newCustomerForm').validator();
      if ($scope.company.id) {
        $scope.company.put().then(function () {
          ngDialog.closeAll();
        });
      }
      else {
        companies.post($scope.company).then(function (company) {
          $scope.gridOpts.data.push(company);
          ngDialog.closeAll();
        });
      }
    };

    $scope.cancel = function () {
      ngDialog.closeAll();
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
