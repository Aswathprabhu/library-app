'use strict';

define('library-app/tests/adapters/application.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('library-app/tests/app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('library-app/tests/controllers/admin/details.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/admin/details.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/admin/details.js should pass jshint.');
  });
});
define('library-app/tests/controllers/list.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/list.js should pass jshint.');
  });
});
define('library-app/tests/controllers/login.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.');
  });
});
define('library-app/tests/controllers/secure/list.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/secure/list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/secure/list.js should pass jshint.');
  });
});
define('library-app/tests/controllers/secure/reserved.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/secure/reserved.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/secure/reserved.js should pass jshint.\ncontrollers/secure/reserved.js: line 31, col 9, Missing semicolon.\n\n1 error');
  });
});
define('library-app/tests/controllers/signup.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/signup.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/signup.js should pass jshint.');
  });
});
define('library-app/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createOfflineRef;


  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */
  function createOfflineRef(initialData) {
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://emberfire-tests-2c814.firebaseio.com';
    var apiKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o';


    if (!_firebase.default._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    var config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    var app = void 0;

    try {
      app = _firebase.default.app();
    } catch (e) {
      app = _firebase.default.initializeApp(config);
    }

    var ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('library-app/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('library-app/tests/helpers/destroy-app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('library-app/tests/helpers/destroy-firebase-apps', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyFirebaseApps;
  var run = Ember.run;


  /**
   * Destroy all Firebase apps.
   */
  function destroyFirebaseApps() {
    var deletions = _firebase.default.apps.map(function (app) {
      return app.delete();
    });
    Ember.RSVP.all(deletions).then(function () {
      return run(function () {
        // NOOP to delay run loop until the apps are destroyed
      });
    });
  }
});
define('library-app/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'library-app/tests/helpers/start-app', 'library-app/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var Promise = Ember.RSVP.Promise;
});
define('library-app/tests/helpers/module-for-acceptance.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('library-app/tests/helpers/number.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/number.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/number.js should pass jshint.');
  });
});
define('library-app/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */
  function replaceAppRef(app, ref) {
    var model = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'application';

    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('library-app/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */
  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('library-app/tests/helpers/resolver', ['exports', 'library-app/resolver', 'library-app/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('library-app/tests/helpers/resolver.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('library-app/tests/helpers/start-app', ['exports', 'library-app/app', 'library-app/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var application = void 0;

    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    Ember.run(function () {
      application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('library-app/tests/helpers/start-app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('library-app/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = stubFirebase;


  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */
  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase.default._unStub) {
      var originalSet = _firebase.default.database.Reference.prototype.set;
      var originalUpdate = _firebase.default.database.Reference.prototype.update;
      var originalRemove = _firebase.default.database.Reference.prototype.remove;

      _firebase.default._unStub = function () {
        _firebase.default.database.Reference.prototype.set = originalSet;
        _firebase.default.database.Reference.prototype.update = originalUpdate;
        _firebase.default.database.Reference.prototype.remove = originalRemove;
      };

      _firebase.default.database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('library-app/tests/helpers/torii', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.stubValidSession = stubValidSession;
  function stubValidSession(application, sessionData) {
    var session = application.__container__.lookup('service:session');
    var sm = session.get('stateMachine');
    Ember.run(function () {
      sm.send('startOpen');
      sm.send('finishOpen', sessionData);
    });
  }
});
define('library-app/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = unstubFirebase;
  function unstubFirebase() {
    if (typeof _firebase.default._unStub === 'function') {
      _firebase.default._unStub();
      delete _firebase.default._unStub;
    }
  }
});
define('library-app/tests/models/book.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | models/book.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/book.js should pass jshint.');
  });
});
define('library-app/tests/models/booking.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | models/booking.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/booking.js should pass jshint.');
  });
});
define('library-app/tests/models/feeds.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | models/feeds.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/feeds.js should pass jshint.');
  });
});
define('library-app/tests/models/returned.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | models/returned.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/returned.js should pass jshint.');
  });
});
define('library-app/tests/models/user.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass jshint.');
  });
});
define('library-app/tests/resolver.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('library-app/tests/router.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('library-app/tests/routes/about.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/about.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass jshint.');
  });
});
define('library-app/tests/routes/account.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/account.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/account.js should pass jshint.');
  });
});
define('library-app/tests/routes/admin/add.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/admin/add.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/add.js should pass jshint.');
  });
});
define('library-app/tests/routes/admin/books.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/admin/books.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/books.js should pass jshint.');
  });
});
define('library-app/tests/routes/admin/details.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/admin/details.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/details.js should pass jshint.');
  });
});
define('library-app/tests/routes/admin/feeds.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/admin/feeds.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/feeds.js should pass jshint.');
  });
});
define('library-app/tests/routes/admin/users.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/admin/users.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/users.js should pass jshint.');
  });
});
define('library-app/tests/routes/application.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('library-app/tests/routes/feedback.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/feedback.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/feedback.js should pass jshint.');
  });
});
define('library-app/tests/routes/index.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('library-app/tests/routes/login.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/login.js should pass jshint.\nroutes/login.js: line 9, col 42, \'transition\' is defined but never used.\n\n1 error');
  });
});
define('library-app/tests/routes/secure.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/secure.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/secure.js should pass jshint.');
  });
});
define('library-app/tests/routes/secure/index.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/secure/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/secure/index.js should pass jshint.');
  });
});
define('library-app/tests/routes/secure/list.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/secure/list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/secure/list.js should pass jshint.');
  });
});
define('library-app/tests/routes/secure/reserved.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/secure/reserved.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/secure/reserved.js should pass jshint.');
  });
});
define('library-app/tests/routes/secure/returned.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/secure/returned.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/secure/returned.js should pass jshint.');
  });
});
define('library-app/tests/routes/signup.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/signup.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/signup.js should pass jshint.\nroutes/signup.js: line 4, col 42, \'transition\' is defined but never used.\n\n1 error');
  });
});
define('library-app/tests/test-helper', ['library-app/tests/helpers/resolver', 'ember-qunit'], function (_resolver, _emberQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
});
define('library-app/tests/test-helper.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('library-app/tests/torii-adapters/application.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | torii-adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'torii-adapters/application.js should pass jshint.');
  });
});
define('library-app/tests/unit/controllers/admin/details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:admin/details', 'Unit | Controller | admin/details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('library-app/tests/unit/controllers/admin/details-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/controllers/admin/details-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/admin/details-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/controllers/feedback-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:feedback', 'Unit | Controller | feedback', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('library-app/tests/unit/controllers/feedback-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/controllers/feedback-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/feedback-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/controllers/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:index', 'Unit | Controller | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('library-app/tests/unit/controllers/index-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/controllers/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/controllers/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('library-app/tests/unit/controllers/login-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/controllers/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/controllers/secure/list-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:secure/list', 'Unit | Controller | secure/list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('library-app/tests/unit/controllers/secure/list-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/controllers/secure/list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/secure/list-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/controllers/secure/reserved-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:secure/reserved', 'Unit | Controller | secure/reserved', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('library-app/tests/unit/controllers/secure/reserved-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/controllers/secure/reserved-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/secure/reserved-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/controllers/signup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:signup', 'Unit | Controller | signup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('library-app/tests/unit/controllers/signup-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/controllers/signup-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/signup-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/helpers/number-test', ['library-app/helpers/number', 'qunit'], function (_number, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | number');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _number.number)([42]);
    assert.ok(result);
  });
});
define('library-app/tests/unit/helpers/number-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/helpers/number-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/number-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/models/book-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('book', 'Unit | Model | book', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('library-app/tests/unit/models/book-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/models/book-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/book-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/models/booking-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('booking', 'Unit | Model | booking', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('library-app/tests/unit/models/booking-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/models/booking-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/booking-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/models/feeds-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('feeds', 'Unit | Model | feeds', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('library-app/tests/unit/models/feeds-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/models/feeds-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/feeds-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/models/returned-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('returned', 'Unit | Model | returned', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('library-app/tests/unit/models/returned-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/models/returned-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/returned-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/models/user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('library-app/tests/unit/models/user-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/models/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/about-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/about-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/about-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/account-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:account', 'Unit | Route | account', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/account-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/account-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/account-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/add-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:add', 'Unit | Route | add', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/add-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/add-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/add-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/admin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin', 'Unit | Route | admin', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/admin-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/admin-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/admin/add-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin\add', 'Unit | Route | admin\add', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/admin/add-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/admin/add-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/add-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/admin/books-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/books', 'Unit | Route | admin/books', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/admin/books-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/admin/books-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/books-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/admin/details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/details', 'Unit | Route | admin/details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/admin/details-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/admin/details-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/details-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/admin/feeds-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/feeds', 'Unit | Route | admin/feeds', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/admin/feeds-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/admin/feeds-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/feeds-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/admin/users-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/users', 'Unit | Route | admin/users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/admin/users-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/admin/users-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/users-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/application-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/feedback-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:feedback', 'Unit | Route | feedback', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/feedback-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/feedback-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/feedback-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/index-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/login-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/new-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new', 'Unit | Route | new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/new-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/secure-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:secure', 'Unit | Route | secure', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/secure-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/secure-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/secure-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/secure/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:secure/index', 'Unit | Route | secure/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/secure/index-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/secure/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/secure/index-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/secure/list-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:secure/list', 'Unit | Route | secure/list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/secure/list-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/secure/list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/secure/list-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/secure/reserved-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:secure/reserved', 'Unit | Route | secure/reserved', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/secure/reserved-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/secure/reserved-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/secure/reserved-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/secure/returned-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:secure/returned', 'Unit | Route | secure/returned', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/secure/returned-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/secure/returned-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/secure/returned-test.js should pass jshint.');
  });
});
define('library-app/tests/unit/routes/signup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:signup', 'Unit | Route | signup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('library-app/tests/unit/routes/signup-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/routes/signup-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/signup-test.js should pass jshint.');
  });
});
require('library-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
