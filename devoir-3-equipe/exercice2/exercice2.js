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

function requete2(requete){
    var postData = {};
    postData["db"] = "dift6800_baseball";
    postData["query"] = requete;	
    //La requête AJAX suivante, fait appel au backend db.php
    $.post(
      "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
      postData,
      function(reponse,status){
         console.log(status);
         console.log(reponse);
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
<<<<<<< Updated upstream
        requete2("Master.nameGiven AS 'Nom Complet', G, W, SV, W+SV, L, SO, H, BB, IPouts, Salaries.salary FROM Pitching, Master INNER JOIN Salaries ON Master.playerID = Salaries.playerID WHERE Pitching.playerID = Master.playerID AND Pitching.yearID=1996 AND Salaries.yearID=1996 AND Pitching.GS=0 AND Pitching.teamID LIKE 'MON' AND Salaries.teamID LIKE 'MON' ORDER BY Pitching.W+SV DESC");
=======
        requete2("Master.nameLast AS 'Nom Complet', G, W, SV, W+SV, L, SO, H, BB, IPouts, Salaries.salary FROM Pitching, Master INNER JOIN Salaries ON Master.playerID = Salaries.playerID WHERE Pitching.playerID = Master.playerID AND Pitching.yearID=1996 AND Salaries.yearID=1996 AND Pitching.GS=0 AND Pitching.teamID LIKE 'MON' AND Salaries.teamID LIKE 'MON' ORDER BY Pitching.W+SV DESC");
>>>>>>> Stashed changes
        
    });
    });

// Master : playerID - nameGiven
// Pitching : playerID - G, W, SV, W+SV, L, SO, H, BB, IPouts,
// Salaries : playerID salary
