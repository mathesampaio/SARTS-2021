//====================ADICIONANDO O MAPA DE FUNDO===================//

     var map = L.map('mapid', {
        center: [-13, -51],
        zoom: 4.4,
        minZoom: 2.4,
        maxZoom: 100
        });
        mapLink =
        '<a href="http://www.esri.com/">Esri</a>';
        wholink =
        'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';


//====================CAMADAS===================//
//====================Maps Normal===================//
        var gmaps = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '© OpenStreetMap, <a href="https://www.ufrgs.br/hge/">Grupo de Pesquisa HGE - IPH</a>'});

    //====================NatGEO===================//
       var natgeo =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© OpenStreetMap, <a href="https://www.ufrgs.br/hge/">Grupo de Pesquisa HGE - IPH</a>',}).addTo(map);

    //====================Satélites===================//
        var satelite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© OpenStreetMap, <a href="https://www.ufrgs.br/hge/">Grupo de Pesquisa HGE - IPH</a>'});

    //====================Satélites===================//
        var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

            var scale = L.control.scale(); // Creating scale control
                scale.addTo(map);

    var baseMaps = {
        "Satelite": satelite,
        "Google Maps": gmaps,
        "NatiGeo": natgeo,
        "Topografia": OpenTopoMap
    };


        var control = L.control.layers(null, baseMaps, {position: 'bottomleft'});
        control.addTo(map);


////======================Adicionando o mapa geojson======================================//

         $.getJSON("{% static 'MDE\FIGURES\drainage_1.geojson' %}",function(data){

//==========================COLORINDO O MAPA=====================================//

//==========================Sensibilidade média===================================//

                function getColor (Sensib_med){
				if(Sensib_med<1.5){
					return '#339900';
				}else if(Sensib_med<1.6){
					return '#669900';
				}else if(Sensib_med<1.8){
					return '#99CC33';
				}else if(Sensib_med<1.95){
					return '#CCFF00';
				}else if(Sensib_med<2.15){
					return '#CC3300';
				}else{
                return '#FF0000';
                }
               }



//==========================Vazão média=====================================//

               function getColorVaz (Vaz_Med){
				if(Vaz_Med<10.0){
					return '#1E90FF';
				}else if(Vaz_Med<100.0){
					return '#1874CD';
				}else if(Vaz_Med<1000.0){
					return '#1874CD';
				}else if(Vaz_Med<10000.0){
					return '#0000CD';
				}else if(Vaz_Med<200000.0){
					return '#00008B	';
				}else{
                return '#000066';
                }
               }

//==========================LINHA MAIS GROSSA=========================//

function getweight (Upst_Area_){
    if(Upst_Area_<20000){
        return 2;
    }else if(Upst_Area_<150000){
        return 3;

    }else if(Upst_Area_<5000000){
        return 4;

    }else {
        return 6;
    }
}
//====================ESTILO FINAL (myStyle1 e myStyle2)===================//

function myStyle1(feature){
				return {
					weight : getweight (feature.properties.Upst_Area_),
					opacity : 5,
                    color :getColorVaz (feature.properties.Vaz_Med),
                    fillColor:  getColorVaz (feature.properties.Vaz_Med),
                    dashArray : 0,
					fillOpacity : 0.3
				}	}
function myStyle2(feature){
				return {
					weight : getweight (feature.properties.Upst_Area_),
					opacity : 1,
                    color : getColor (feature.properties.Sensib_med),//'#0033FF',
                    fillColor : getColor (feature.properties.Sensib_med),//'#0033FF',
                    dashArray : 0,
					fillOpacity : 0.7
				}	}

////======================RETORNO DA FUNÇÃO===================================//

            geojson = L.geoJson(data,{
            style: myStyle1,
            onEachFeature:  onEachFeature,
            }).addTo(map);

            return geojson;
         });
////======================FECHANDO AS CHAVES DO MAPA GEOJSON===================================//
////======================Adicionando o mapa geojson======================================//

         $.getJSON("{% static 'MDE\FIGURES\catchment.geojson' %}",function(data){

//==========================COLORINDO O MAPA=====================================//

//==========================Sensibilidade média===================================//

                function getColor (Sensib_med){
				if(Sensib_med<1.5){
					return '#339900';
				}else if(Sensib_med<1.6){
					return '#669900';
				}else if(Sensib_med<1.8){
					return '#99CC33';
				}else if(Sensib_med<1.95){
					return '#CCFF00';
				}else if(Sensib_med<2.15){
					return '#CC3300';
				}else{
                return '#FF0000';
                }
               }



//==========================Vazão média=====================================//

               function getColorVaz (Vaz_Med){
				if(Vaz_Med<10.0){
					return '#1E90FF';
				}else if(Vaz_Med<100.0){
					return '#1874CD';
				}else if(Vaz_Med<1000.0){
					return '#1874CD';
				}else if(Vaz_Med<10000.0){
					return '#0000CD';
				}else if(Vaz_Med<200000.0){
					return '#00008B	';
				}else{
                return '#000066';
                }
               }

//==========================LINHA MAIS GROSSA=========================//

function getweight (Upst_Area_){
    if(Upst_Area_<20000){
        return 2;
    }else if(Upst_Area_<150000){
        return 3;

    }else if(Upst_Area_<5000000){
        return 4;

    }else {
        return 6;
    }
}
//====================ESTILO FINAL (myStyle1 e myStyle2)===================//


function myStyle2(feature){
				return {
					weight : getweight (feature.properties.Upst_Area_),
					opacity : 1,
                    color : getColor (feature.properties.Sensib_med),//'#0033FF',
                    fillColor : getColor (feature.properties.Sensib_med),//'#0033FF',
                    dashArray : 0,
					fillOpacity : 0.7
				}	}

////======================RETORNO DA FUNÇÃO===================================//

            geojson2 = L.geoJson(data,{
            style: myStyle2,
            onEachFeature:  onEachFeature,
            }).addTo(map);

            return geojson2;
         });
////======================FECHANDO AS CHAVES DO MAPA GEOJSON===================================//







	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 3,
			color: '#b5b5b5',
			dashArray: '',
			fillOpacity: 0.3
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());

	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}






