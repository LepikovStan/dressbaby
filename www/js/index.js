/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
	
	start: function() {
		document.addEventListener('deviceready', $.proxy(this.initialize, this), false);
	},
	
    // Application Constructor
    initialize: function() {
        this.initElems();
        this.bindEvents();
		this.initLocation();
		this.initSavedLocalities();
    },
	
	initSavedLocalities: function() {
		this.getLocalitiesFromPrefs()
			.then($.proxy(function(result) {
				this.savedLocalities = result;
				for (var cityName in result) {
					this.savedCities.append('<li>'+cityName+'</li>');
				}
			}, this));
	},
	
	initLocation: function() {
		this.getCurrentLocalityFromPrefs()
			.then($.proxy(function(value) {
				if (value) {
					this.changeCityName(value);
				} else {
					this.getLocationFromGeolocation();
				}
			}, this), function(error) {
				Err.handle(error);
			});
	},
	
	getLocationFromGeolocation: function(callback) {
		GEO.getCurrentPosition(
            $.proxy(function(coords) {
                GEO.getCurrentCity(coords)
                    .then($.proxy(function(res) {
                        if (res instanceof Error) {
                            Err.handle(res)
                        } else {
							this.saveLocation(res, coords)
                            this.changeCityName(res);
                        }
                    }, this))
					.fail(function(error) {
						Err.handle(error)
					});
            }, this),
            function(error) {
                Err.handle(error);
            }
        );
	},
	
	getCurrentLocalityFromPrefs: function() {
		return this.prefs.fetch('currentLocality');
	},
	
	getLocalitiesFromPrefs: function() {
		return this.prefs.fetch('locality')
			.then(function(result) {
				return JSON.parse(result);
			});
	},
	
	saveLocation: function(locality, coords) {
		return this.getLocalitiesFromPrefs()
			.then($.proxy(function(result) {
				if (!result) {
					result = {}
				}
				result[locality] = {locality: locality, coords: coords}
				result = JSON.stringify(result);
				this.prefs.store('locality', result)
					.then($.proxy(function() {
						this.prefs.store('currentLocality', locality);
					}, this));
			}, this));
	},

    initElems: function() {
        this.menu = $('#menu');
        this.openMenuEl = $('#open-menu');
        this.buttonMenu = $('#button-menu');
		this.savedCities = $('#savedCities');
        this.savedCitiesItem = $('#savedCities li');
        this.cityName = $('#cityName');
		
		this.prefs = plugins.appPreferences;
    },

    bindEvents: function() {
        this.buttonMenu.on('tap', $.proxy(this.openMenu, this));
        this.savedCities.on('tap', 'li', $.proxy(function(e) {
            var $target = $(e.target),
                opts = {
                    cityName: $target.text()
                };

            this.loadCityWeather(opts);
        }, this));

        this.menu.on('swipeleft', $.proxy(this.closeMenu, this));
        this.openMenuEl.on('swiperight', $.proxy(this.openMenu, this));
    },
	
    loadCityWeather: function(params) {
		this.saveLocation(params.cityName, this.savedLocalities[params.cityName].coords)
			.then($.proxy(function() {
				this.changeCityName(params.cityName);
			}, this));
        this.closeMenu()
    },

    changeCityName: function (cityName) {
        if  (cityName) {
            this.cityName.text(cityName);
        } else {
            Err.handle(new Error('Не указано название населённого пункта для отображения'))
        }
    },

    openMenu: function() {
        this.menu.addClass('open');
    },
    closeMenu: function() {
        this.menu.removeClass('open');
    }
};

$(function() {
    app.start();
});
