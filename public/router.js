/**
 * Created by tevonial on 7/3/2017.
 */

angular.module("ilitate", ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
            rewriteLinks: false
        });

        $urlRouterProvider.otherwise('/client/detail');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'view/login.html',
                controller: 'login'
            })

            .state('client', {
                abstract: true,
                url: '/client',
                reloadOnSearch: false,
                views: {
                    '': {
                        templateUrl:  'view/client/client.html',
                        controller: 'client'
                    },
                    'child-nav': {
                        templateUrl: 'view/client/client.nav.html'
                    }
                }
            })

            .state('client.detail', {
                url: '/detail',
                params: {
                    id: null
                },
                templateUrl: 'view/client/client.detail.html',
                controller: 'client.detail'
            })

            .state('client.note', {
                url: '/note',
                templateUrl: 'view/client/client.note.html',
                controller: 'client.note'
            })

            .state('client.contact', {
                url: '/contact',
                templateUrl: 'view/client/client.contact.html',
                controller: 'client.contact'
            })

            .state('client.file', {
                url: '/file',
                templateUrl: 'view/client/client.file.html',
                controller: 'client.file'
            })

            .state('client.edit', {
                url: '/edit',
                params: {
                    client: null
                },
                views: {
                    '@': {
                        templateUrl: 'view/client/client.edit.html',
                        controller: 'client.edit'
                    },
                    'child-nav@': {
                        templateUrl: 'view/client/client.edit.nav.html'
                    }
                }

            })

            .state('note', {
                url: '/note',
                views: {
                    '': {
                        templateUrl:  'view/note/note.html',
                        controller: 'note'
                    },
                    'child-nav': {
                        templateUrl: 'view/note/note.nav.html'
                    }
                }
            })

            .state('note.detail', {
                url: '/:id',
                views: {
                    '@': {
                        templateUrl:  'view/note/note.detail.html',
                        controller: 'note.detail'
                    },
                    'child-nav@': {
                        templateUrl: 'view/note/note.detail.nav.html'
                    }
                }
            })

            .state('note.edit', {
                url: '/edit/:id',
                params: {
                    id: null,
                    note: null
                },
                views: {
                    '@': {
                        templateUrl:  'view/note/note.edit.html',
                        controller: 'note.edit'
                    },
                    'child-nav@': {
                        templateUrl: 'view/note/note.edit.nav.html'
                    }
                }
            })

            .state('calendar', {
                url: '/calendar',
                views: {
                    '': {
                        templateUrl:  'view/calendar/calendar.html',
                        controller: 'calendar'
                    },
                    'child-nav': {
                        templateUrl: 'view/calendar/calendar.nav.html'
                    }
                }
            })

            .state('settings', {
                url: '/settings',
                views: {
                    '': {
                        templateUrl:  'view/settings/settings.html',
                        controller: 'settings'
                    },
                    'child-nav': {
                        templateUrl: 'view/settings/settings.nav.html'
                    }
                }
            });


    })

    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });