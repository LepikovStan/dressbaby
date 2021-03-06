﻿/*
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
        this.weatherError = $('.weather .error');

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
        var hoursList = [0,3,6,9,12,15,18,21],
            timeHour = parseInt(new Date().getHours()),
            resultIndex = 0;

        hoursList.forEach(function(val, i) {
            if (timeHour <= val && timeHour >= hoursList[i-1]) {
                resultIndex = i - 1;
            }
        });

        if (timeHour >= hoursList[hoursList.length-1]) {
            resultIndex = hoursList.length - 1;
        }

		this.loadWeather(cityName,
            $.proxy(function(result) {
                this.renderWeather(result[resultIndex]);
                this.renderHint(result[resultIndex].temp);
                this.weatherError.hide();
		    }, this),
            $.proxy(function(error) {
                this.clearAll();
                this.weatherError.show();
            }, this)
        );
    },
	
	loadWeather: function(cityName, success, fail) {
        // 1baf7bd75889db55c690ceda0bb54294

        console.log(Cities[cityName.toLowerCase(), cityName.toLowerCase()]);
		$.ajax({
			type: "GET",
			url: "http://flashgamesfreeplay.org/?key=1baf7bd75889db55c690ceda0bb54294&cityId="+Cities[cityName.toLowerCase()],
			dataType: 'json',   
			cache: false,
			success: success,
            error: fail
		});
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
				if (this[val + 'El'] && this[val + 'El'].length) {
					this[val + 'El'].show();
				}
            } else {
                this[val].text('');
            }
        }, this));
		
		if (params && params.temp) {
			this.temp.text(this.temp.text() + '°C')
		}

        if (params && params.windDir) {
            this.windEl.find('.dir').text(', ' + params.windDir);
        } else {
            this.windEl.find('.dir').text('');
        }
		
		if (params && params.icon) {
			$('#icon').html('<img src="https:'+params.icon+'" alt="" />').show();
		} else {
            $('#icon').hide()
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
