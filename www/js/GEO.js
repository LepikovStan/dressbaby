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

var GEO = {
    getCurrentCity: function(coords) {
        var url = 'https://geocode-maps.yandex.ru/1.x/?geocode='+coords.join(',')+'&format=json';

        return $.getJSON(url)
            .then($.proxy(function(result) {
                return this.parseGeolocation(result);
            }, this))
            .fail(function(error) {
                return new Error(error);
            });
    },

    parseGeolocation: function(result) {
        var resultObject = result && result.response && result.response.GeoObjectCollection && result.response.GeoObjectCollection.featureMember,
            hasResults = resultObject.length;

        if (hasResults) {
            var AdministrativeArea = resultObject[0]
                && resultObject[0].GeoObject
                && resultObject[0].GeoObject.metaDataProperty
                && resultObject[0].GeoObject.metaDataProperty.GeocoderMetaData
                && resultObject[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails
                && resultObject[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country
                && resultObject[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea,
                SubAdministrativeArea = AdministrativeArea.SubAdministrativeArea,
                cityName = SubAdministrativeArea ? SubAdministrativeArea.Locality.LocalityName : AdministrativeArea.Locality.LocalityName;

            if (cityName) {
                return cityName
            } else {
                return new Error('Не найдено населенного пункта')
            }
        } else {
            return new Error('Не найдено населенного пункта')
        }
    },

    getCurrentPosition: function(success, fail) {
        navigator.geolocation.getCurrentPosition(function(res) {
            var coords = [res.coords.longitude,res.coords.latitude];

            success(coords)
        }, fail, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    }
};