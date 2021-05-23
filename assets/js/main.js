$(document).ready(function(){
    //alert("Funcionaa!"); 

    //Se agrega evento al botón Buscar
    //$('form').submit(funtion(event){
        //event.preventDefault();
    //});
    $('.btn').click( () => {
        var heroe = $('.heroe').val(); //Se captura el dato ingresado
        
        let resultado = validacion(heroe); //Se manda lo ingresado por el usuario

        console.log(resultado);
        if(resultado == true){
            $('.resultados').toggle(700); //En caso de ser true, se despliega la información del héroe
            peticionApi(heroe);
        }
    });

    //Función para validar que sea número entre 1 y 731
    function validacion(heroe){
        let validado = true;

        const patron = new RegExp(/^[0-9]+$/, "gm");

        if(patron.test(heroe) == false || heroe < 1 || heroe > 731){
            validado = false;
            alert('Debe ser un númerp entre 1 y 731');
        }

        return validado;
    }
    
    //Una vez validado el número, se hace la petición a la API
    function peticionApi(heroe){
        //console.log(heroe);

        $.ajax({
            type: 'GET',
            url: `https://superheroapi.com/api.php/10226909369863490/${heroe}`,
            dataType: 'json',
            success: function(data){
                console.log(data.name);
                //console.log(data[2]);
                $('.imagen').html(`<img src="${data.image.url}" class="card-img" alt="hero">`);
                $('.hero-nombre').text(data.name);
                $('.hero-conexiones').text(`Conexiones: ${data.connections['group-affiliation']}`);
                $('.hero-publisher').text(`Publicado por: ${data.biography.publisher}`);
                $('.hero-ocupacion').text(`Ocupación: ${data.work.occupation}`);
                $('.hero-aparicion').text(`Primera aparición: ${data.biography['first-appearance']}`);
                $('.hero-altura').text(`Altura: ${data.appearance.height}`);
                $('.hero-peso').text(`Peso: ${data.appearance.weight}`);
                $('.hero-alianzas').text(`Alianzas: ${data.biography.aliases}`);
                //document.querySelector(".hero-nombre").innerHTML = `${data.name}`;

                //Se crea el gráfico de pastel
                let chart = new CanvasJS.Chart("chartContainer", {
                        title:{
                            text: `Estadísticas de Poder para ${data.name}`
                        },
                        data: [
                            {
                                type: "pie",
                                showInLegend: true,
                                legendText: "{indexLabel}",
                                dataPoints: [
                                    { y: `${data.powerstats.intelligence}`, indexLabel: "Inteligencia" },
                                    { y: `${data.powerstats.strength}`, indexLabel: "Fuerza" },
                                    { y: `${data.powerstats.speed}`, indexLabel: "Velocidad" },
                                    { y: `${data.powerstats.durability}`, indexLabel: "Durabilidad"},
                                    { y: `${data.powerstats.power}`, indexLabel: "Energía" },
                                    { y: `${data.powerstats.combat}`, indexLabel: "Combate"}
                                ]
                            }
                        ]
                });
                chart.render();
            },
            error: function(error){
                alert(`Error: ${error}`);
            }
        });
    }
});