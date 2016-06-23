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
    // Application Constructor
    initialize: function() {
        this.initElems();
        this.bindEvents();
        GEO.getCurrentPosition(
            $.proxy(function(coords) {
                console.log('coords', coords);
                GEO.getCurrentCity(coords)
                    .then($.proxy(function(res) {
                        if (res instanceof Error) {
                            Err.handle(res)
                        } else {
                            this.changeCityName(res);
                        }
                    }, this));
            }, this),
            function(error) {
                Err.handle(error);
            }
        );
    },

    initElems: function() {
        this.menu = $('#menu');
        this.openMenuEl = $('#open-menu');
        this.buttonMenu = $('#button-menu');
        this.savedCities = $('#savedCities li');
        this.cityName = $('#cityName');
    },

    bindEvents: function() {
        this.buttonMenu.on('tap', $.proxy(this.openMenu, this));
        this.savedCities.on('tap', $.proxy(function(e) {
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
        this.changeCityName(params.cityName);
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
    app.initialize();
});