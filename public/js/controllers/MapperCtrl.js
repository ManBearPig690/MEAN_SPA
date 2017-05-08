angular.module('MapperCtrl', []).controller('MapperController', function($scope){
    $scope.map = {};
    $sope.circle = {};
    $scope.markers = [];
    $scope.circles = [];
    $scope.currentLatLng = {};
    $scope.infowindow = {};

    // sets up and loads the map map name is passed in there is to be multiple maps on a single page.
    $scope.LoadMap = function(mapName){
        var mapOptions = {
            zoom: 10,
            center: currentLatLng
        };

        $scope.map = new google.maps.Map(document.getElementById(mapId), mapOptions);
        google.maps.addDomListener($scope.map, 'click', function(e){
            $scope.currentLatLng = e.latLng;

            if ($scope.currentLatLng) {
                map.panTo($scope.currentLatLng);
                $scope.SetLatLongValue();
                $scope.SetMarker();
                $scope.GetPackageDetails();
            }
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng': e.latLng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0])
                    {
                        var address = results[0].formatted_address.split(",");
                        var temp = address[2].trim().split(" ");
                        $("#txtAddress").val(address[0].trim());
                        $("#txtCity").val(address[1].trim());
                        $("#txtState").val(temp[0]);
                        $("#txtZip").val(temp[1]);
                    }
                }
            });

        });
    };

    // sets markers on the map for all pacakges
    $scope.MarkMap = function(pacakges){
        for(var i in packages){
            var latLong = new google.maps.LatLng(packages[i].Latitude, packages[i].Longitude);
            if (latLong) {
                $scope.AddMarker(latLong, packages[i]);
            }
        }
    };

    // handles putting the marker on the map
    $scope.AddMarker = function(latLong, selectedPackage){
        var newMarker;

        newMarker = new google.maps.Marker({
            position: latLong,
            map: $scope.map
        });

        if (newMarker) {
            google.maps.event.addDomListener(newMarker, "dragend", function () {
                $scope.DrawCircle(latLong, selectedPackage.Radius, selectedPackage.PowerPlay);
            });
            $scope.DrawCircle(latLong, selectedPackage.Radius, selectedPackage.PowerPlay);
        }

        if ($scope.infowindow) {
            $scope.infowindow.close();
        }

        google.maps.event.addListener(newMarker, "click", function () {
            var data;
            var packageType;
            data = $scope.SetMarkerData(selectedPackage);

            if ($scope.infowindow) { // close other windows onclick
                $scope.infowindow.close();
            }

            $scope.infowindow = new google.maps.InfoWindow({
                content: data,
                position: latLong
            });
            $scope.infowindow.open(map);
        });

    };

    // set new marker when map is clicked
    $scope.SetMarker = function(){
        if($scope.marker){
            $scope.marker.setMap(null);
        }

        $scope.marker = new google.maps.Marker({
            position: $scope.currentLatLng,
            draggable: true,
            map: $scope.map
        });

        id = $scope.marker.__gm_id;
        $scope.markers[id] = $sope.marker;

        if($scope.marker){
            google.maps.event.addDomListener($scope.marker, "dragend", function(){
                $scope.currentLatLng = $scope.marker.getPostion();
                $scope.SetLatLongValue();
            });

            google.maps.event.addListner($scope.marker, "rightclick", function(piont){
                $scope.marker.setMap(null);
                $scope.ClearInput();
            })
        }

        if($scope.infowindow){
            $scope.infowindow.close();
        }

    };

    $scope.DrawCircle = function(latLong, radius, powerplay){
        var newCircle;
        var color = '#FF0000';

        if(powerplay){
            color = '#008000';
        }

        var options = {
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: $scope.map,
            center: latLong,
            radius: radius * 1609.344
        };
        newCircle = new google.maps.Circle(options);
    };

    $scope.SetLatLongValue = function(){
        $("#txtLat").val($scope.currentLatLng.lat());
        $("#txtLong").val($scope.currentLatLng.lng());
    };
    

    $scope.GetLatLongValue = function(){
        if (jQuery('#txtLat').val() != '' && !isNaN(jQuery('#txtLat').val()) && parseInt(jQuery('#txtLat').val()) > 0) {
            if (jQuery('#txtLong').val() != '' && !isNaN(jQuery('#txtLong').val()) && parseInt(jQuery('#txtLong').val()) > 0) {
                $scope.currentLatLng = new google.maps.LatLng(jQuery('#txtLat').val(), jQuery('#txtLong').val());
                $scope.map.panTo($scope.currentLatLng);
                setMarker();
            }
        }
    };

    // allows users to enter a valid address and have the map pan to it and captuer the lat long value.
    $scope.AddressMarker = function(){
        var address = $("#txtAddress").val() + ', ' + $("#txtCity").val() + ', ' + $("#txtState").val() + ' ' + $("#txtZip").val();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': address
        }, function(results, status){
            if(status == google.maps.GeocoderStatus.OK && status != google.maps.GeocoderStatus.ZERO_RESULTS){
                $scope.currentLatLng = results[0].geometry.location;
                $scope.map.panTo($scope.currentLatLng);
                $scope.SetMarker();
                $scope.SetLatLongValue();
            }

        });
    };

    // careate teh info window fo the details rollup
    $scope.RollupDetails = function(leadSummary){
        var data = '<table class="table"><thead><tr><th>Make</th><th>Extremely Likely</th><th>Highly Likely</th><th>Likely</th></tr></thead><tbody>';
        for (var i in leadSummary) {
            data += "<tr><td>" + leadSummary[i].VehicleMake + "</td>" +
                    "<td>" + leadSummary[i].LevelOneCount + "</td>" +
                    "<td>" + leadSummary[i].LevelTwoCount + "</td>" +
                    "<td>" + leadSummary[i].LevelThreeCount + "</td></tr>";
        }
        data += "</tbody></table>";

        google.maps.event.addListener($scope.marker, "click", function(){
            $scope.infowindow = new google.maps.InfoWindow({
                content: data,
                position: $scope.currentLatLng
            });
            $scope.infowindow.open($scope.map);
        });

        $scope.infowindow = new google.maps.InfoWindow({
            content: data,
            position: $scope.currentLatLng
        });

        $scope.infowindow.open($scope.map);
        $scope.map.setZoom(10);
        $scope.map.panTo($scope.currentLatLng);
    };

    // for clicking on a kendo grid row item and getting details
    $scope.DisplayDetails = function(arg){
        var selected = this.dataItem(this.select());

        $scope.currentLatLng = new google.map.LatLng(selected.Latitude, selected.Longitude);
        $scope.map.panTo($scope.currentLatLng);
        
        if($scope.infowindow)
            $scope.infowindow.close();

        var data = $scope.SetMarkerData(selected);
        $scope.infowindow = new google.maps.InfoWindow({
            content: data,
            position: $scope.currentLatLng
        });

        $scope.infowindow.open(map);

    };

    $scope.SetMarkerData = function(selected){
        var packageStatusText;
        var marketTypeText;

        switch(selected.PackageStatus){
            case 0: 
                break;
            case 1:
                packageStatusText = "Pending";
                break;
            case 2:
                packageStatusText = "Installed";
                break;
            case 3:
                packageStatusText = "Expired";
                break;
            case 4:
                packageStatusText = "Rejected by Dealer";
                break;
            case 5:
                packageStatusText = "Rejected by AimLogic";
                break;
        }

        switch(selected.MarketType){
            case 0:
                marketTypeText = "Domestic";
                break;
            case 1:
                marketTypeText = "Import";
                break;
            case 2:
                marketTypeText = "Luxury Domestic";
                break;
            case 4:
                marketTypeText = "Luxury Import";
                break;
            default:
                break;
        }

        var data = "<div class='form-group'>" +
                "<label>Package Name: </label>" +
                "<strong> " + selected.PackageName + "</strong>" +
                "</div>" +
                "<div class='form-group'>" +
                "<label>Package Level: </label>" +
                "<strong></strong>" +
                "</div>" +
                "<div class='form-group'>" +
                "<label>Market Type: </label>" +
                "<strong> " + marketTypeText + "</strong>" +
                "</div>" +
                "<div class='form-group'>" +
                "<label>Status: </label>" +
                "<strong> " + packageStatusText + "</strong>" +
                "</div>" +
                "<div class='form-group'>" +
                "<label>Radius (mi.): </label>" +
                "<strong> " + selected.Radius + "</strong>" +
                "</div>" +
                "<div class='form-group'>" +
                "<label>Package Price: </label>" +
                "<strong> " + selected.Amount + "</strong>" +
                "</div>"
        return data;
    };

    $scope.ClearInput = function(){
        if (!newCustomer) {
            $("#txtAddress").val("");
            $("#txtCity").val("");
            $("#txtState").val("");
            $("#txtZip").val("");
            $("#txtLat").val("");
            $("#txtLong").val("");
        }
        else {
            $("#txtNewAddress").val("");
            $("#txtNewCity").val("");
            $("#txtNewState").val("");
            $("#txtNewZip").val("");
            $("#txtLat").val("");
            $("#txtLong").val("");
        }
    };

});