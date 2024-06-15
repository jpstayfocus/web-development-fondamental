//Code de la demo est utilisé dans cette partie



function genereTableau(donnees, id){
    var nb = donnees.length;
    if(nb>0){
        var htmltable="<tr>";
        for(var attr in donnees[0]){
            htmltable=htmltable+"<th>"+attr+"</th>";
        };
        htmltable=htmltable+"</tr>";
        for(var x=0;x<nb;x++){
            htmltable=htmltable+"<tr>";
            for(var a in donnees[x]){
                htmltable=htmltable+"<td>"+donnees[x][a]+"</td>";
            }
            htmltable=htmltable+"</tr>";
        }
        $("#"+id).html(htmltable);
    }else{
        alert("La réponse à la requête est vide.");
        $("#"+id).html("");
    }
};

function requete(requete){
    var postData = {};
    postData["db"] = "dift6800_baseball";
    postData["query"] = requete;	
    //La requête AJAX suivante, fait appel au backend db.php
    $.post(
      "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
      postData,
      function(reponse,status){
         console.log(status);
         var obj = JSON.parse(reponse);
        if(obj.error==""){  
            genereTableau(obj.data, "table");
        }else{
          alert("Erreur:"+obj.error);
        }
      }
    );
};

function chargeDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         alert("status:"+this.status);
         //document.getElementById("demo").innerHTML = this.responseText;
         $("#demo").text = this.responseText;
      };
    };
    xhttp.open("GET", "LoremIpsum.txt", true);
    xhttp.send();
   
}


//var s = "CC.yearId, CC.MaxCC, Master.nameFirst, Master.nameLast from Batting, (select yearID, max(HR) as MaxCC from Batting where lgID='NL' GROUP BY yearId HAVING yearId>=";
//var r = ") as CC, Master where Master.playerId=Batting.playerId and Batting.HR=CC.MaxCC AND Batting.yearId=CC.yearId ORDER BY CC.yearId DESC";
$(document).ready(function(){
$("#lance").click(function(event){
        
    //document.getElementById("titre").innerHTML = "Requete SQL en Javascript";
    $("#titre").text("Requete SQL en Javascript");
    // poste("playerID, max(salary) FROM Salaries WHERE yearID=1985");
    requete("nameLast as nom, nameFirst as prenom, Salaries.teamID, Salaries.salary FROM Salaries, Master, (SELECT max(salary) as maximum FROM Salaries WHERE yearID="+$("#year").val()+") as fetchdata WHERE Salaries.salary = fetchdata.maximum and yearID="+$("#year").val()+" and Salaries.playerID=Master.playerID");
    
});
});
