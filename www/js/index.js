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
		this.initTempBorders();
		
		if (navigator.onLine) {
			this.getLocationFromGeolocation();
			this.statusEl.text('online');
		} else {
			this.clearAll();
			this.statusEl.text('offline');
		}

		$('.ui-loader-default').remove();
		
		document.addEventListener('online', $.proxy(this.onDeviceOnline, this), false);
		document.addEventListener('offline', $.proxy(this.onDeviceOffline, this), false);
    },
	
	getWeather: function() {
		$.ajax({
			type: "GET",
			url: "http://flashgamesfreeplay.org/",
			dataType: 'json',   
			cache: false,
			success: function(data) {
				console.log(data);
			} 
		});
	},
	
	onDeviceOnline: function() {
		this.getLocationFromGeolocation();
		this.statusEl.text('online');
	},
	
	onDeviceOffline: function() {
		this.clearAll();
		this.changeCityName('Местоположение не найдено');
		this.statusEl.text('offline');
	},
	
	initTempBorders: function() {
		this.tempMin = -5;
		this.tempMax = 25;
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
	
	getLocationFromGeolocation: function(callback) {
		GEO.getCurrentPosition(
            $.proxy(function(coords) {
                GEO.getCurrentCity(coords)
                    .then($.proxy(function(res) {
                        if (res instanceof Error) {
                            Err.handle(res)
                        } else {
                            this.changeCityName(res);
							this.loadCityWeather(res);
							this.tempValContainer.hide();
                        }
                    }, this))
					.fail(function(error) {
						Err.handle(error)
					});
            }, this),
            $.proxy(function(error) {
                Err.handle(error);
                this.changeCityName('Местоположение не найдено');
				this.clearAll();
            }, this)
        );
	},
	
	clearAll: function() {
        this.renderWeather();
		this.renderHint();
		this.windEl.hide();
        this.humidityEl.hide();
        this.pressureEl.hide();
		this.tempValContainer.show();
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

    initElems: function() {
        this.cityName = $('#cityName');

        this.temp = $('#temp ins');
        this.tempValContainer = $('#temp fieldset');
        this.tempVal = $('#tempVal');
        this.wind = $('#wind ins');
        this.humidity = $('#humidity ins');
        this.pressure = $('#pressure ins');
		
        this.windEl = $('#wind');
        this.humidityEl = $('#humidity');
        this.pressureEl = $('#pressure');
		this.statusEl = $('#status');
		
		this.hint = $('#hint');

        if (window.plugins) {
            this.prefs = plugins.appPreferences;
        }
    },

    bindEvents: function() {
		this.tempVal.on('input', $.proxy(function() {
			this.renderHint(this.tempVal.val());
		}, this));
    },
	
    loadCityWeather: function(cityName) {
		this.loadWeather(cityName)
			.then($.proxy(function(result) {
				this.renderWeather(result);
				this.renderHint(result.temp);
			}, this));
    },
	
	loadWeather: function(cityName) {
		return {
			then: function(cb) {
				cb({
					temp: 11,
					wind: 2
				});
			}
		}
	},
	
	renderHint: function(temp) {
		temp = parseFloat(temp);
		
		if (!temp || isNaN(temp)) {
			this.hint.text('');
			return;
		}
		var hint = '';
		
		if (temp < this.tempMin) {
			hint = 'Одевать теплее, сокращать время прогулки, щупать носик. Помните что ребёнок не двигается!';
		}
		else if (temp > this.tempMax) {
			hint = 'Горячо!';
		}
		else {
			for (var i in data) {
				var tempBorders = i.split(':');
				
				if (temp >= tempBorders[0] && temp <= tempBorders[1]) {
					hint = data[i];
				}
			}
		}
		this.hint.text(hint);
	},

    renderWeather: function(params) {
        var weatherParams = ['temp', 'wind', 'humidity', 'pressure'];

        weatherParams.forEach($.proxy(function(val) {
            if (params && params[val]) {
                this[val].text(params[val]);
				this[val].show();
            } else {
                this[val].text('');
            }
        }, this));
		
		if (params && params.temp) {
			this.temp.text(this.temp.text() + '°C')
		}
    },

    changeCityName: function (cityName) {
        if  (cityName) {
            this.cityName.text(cityName);
        } else {
            Err.handle(new Error('Не указано название населённого пункта для отображения'))
        }
    }
};

$(function() {
    app.start();
});
