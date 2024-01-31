$(document).ready(function () {
  var count = 0;
  pokemon(count, "");

  $("#back").click(function () {
    if (count > 0) {
      count = count - 1;
      pokemon(count, $("#search").val());
      console.log(count);
    }
  });
  $("#next").click(function () {
    count = count + 1;
    pokemon(count, $("#search").val());
    console.log(count);
  });

  $("#search").on("input", function () {
    pokemon(count, $(this).val());
  });

  function pokemon(count, searchTerm) {
    $.ajax({
      type: "GET",
      url: "api.json",
      dataType: "json",
      beforeSend: function () {
        $(".load-charts").html(
          '<div class="spinner-border text-center text-primary"></div>'
        );
      },
      success: function (retorno) {
        var filteredPokemon = retorno.pokemon.filter(function (pokemon) {
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        var poke = filteredPokemon[count];
        if (poke) {
          $("#name").html(poke.name);
          $("#type").html("Type: " + poke.type[0] + " / " + poke.type[1]);
          $("#img").html("<img src='" + poke.img + "'></div>");
          $("#height").html(poke.height);
          $("#weight").html("Weight: " + poke.weight);
          $("#next_evolution").html(
            "Next Evolution: " +
              (poke.next_evolution ? poke.next_evolution[0].name : "Final evolution")
          );
        }
      },
    });
  }
});
