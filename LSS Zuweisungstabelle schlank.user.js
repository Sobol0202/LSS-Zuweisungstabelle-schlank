// ==UserScript==
// @name         LSS Zuweisungstabelle schlank
// @namespace    www.leitstellenspiel.de
// @version      0.9
// @description  Macht die Personalzuweisungstabelle in den Fahrzeugen etwas schlanker
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/vehicles/*/zuweisung
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Füge den Button-Styling-CSS hinzu
    GM_addStyle(`
        .btn-xs {
            margin-right: 5px;
        }
    `);

    // Funktion zum Aktualisieren des Button-Stylings
    function updateButtonStyling() {
        //console.log("Update Button Styling");

        // Wähle die Tabelle mit der id "personal_table"
        var personalTable = document.getElementById("personal_table");

        // Überprüfe, ob die Tabelle existiert
        if (personalTable) {
            // Wähle alle Zeilen in der Tabelle
            var rows = personalTable.getElementsByTagName("tr");

            // Iteriere über alle Zeilen in der Tabelle
            for (var i = 0; i < rows.length; i++) {
                // Wähle das letzte td-Element in der aktuellen Zeile
                var lastTd = rows[i].getElementsByTagName("td")[rows[i].getElementsByTagName("td").length - 1];

                // Überprüfe, ob das letzte td-Element existiert und ob es einen Button enthält
                if (lastTd && lastTd.querySelector("a.btn")) {
                    //console.log("Button gefunden");

                    // Wähle den Button im letzten td-Element
                    var button = lastTd.querySelector("a.btn");

                    // Überprüfe, ob die Klasse des Buttons "btn-xs" vorhanden ist
                    if (!button.classList.contains("btn-xs")) {
                        //console.log("Button Klasse wird aktualisiert");
                        // Füge der Klasse des Buttons "btn-xs" hinzu
                        button.classList.add("btn-xs");

                        // Wähle den Text im letzten td-Element
                        var text = lastTd.querySelector("a:not(.btn)");

                        // Überprüfe, ob sowohl Button als auch Text existieren
                        if (button && text) {
                            //console.log("Button und Text vorhanden");

                            // Entferne den Zeilenumbruch zwischen Button und Text
                            if (button.nextSibling && button.nextSibling.nodeName === "#text") {
                                //console.log("Entferne Zeilenumbruch");
                                button.parentNode.removeChild(button.nextSibling);
                            }
                            // Drehe die Reihenfolge von Button und Text um
                            lastTd.insertBefore(button, text);
                            //console.log("Button-Styling aktualisiert");
                        }
                    }
                }
            }
        }
    }

    // Funktion zum regelmäßigen Überprüfen von Änderungen am Button
    function checkForButtonChanges() {
        // Rufe die Funktion zum Aktualisieren des Button-Stylings auf
        updateButtonStyling();

        // Überprüfe alle 1 Sekunden auf Änderungen am Button
        setTimeout(checkForButtonChanges, 1000);
    }

    // Starte die Überprüfung von Änderungen am Button
    checkForButtonChanges();
})();
