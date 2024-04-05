// ==UserScript==
// @name         LSS Zuweisungstabelle schlank
// @namespace    www.leitstellenspiel.de
// @version      0.1
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
                // Füge der Klasse des Buttons "btn-xs" hinzu
                lastTd.querySelector("a.btn").classList.add("btn-xs");

                // Wähle den Button im letzten td-Element
                var button = lastTd.querySelector("a.btn");

                // Wähle den Text im letzten td-Element
                var text = lastTd.querySelector("a:not(.btn)");

                // Überprüfe, ob sowohl Button als auch Text existieren
                if (button && text) {
                    // Entferne den Zeilenumbruch zwischen Button und Text
                    if (button.nextSibling.nodeName === "#text") {
                        button.parentNode.removeChild(button.nextSibling);
                    }
                    // Drehe die Reihenfolge von Button und Text um
                    lastTd.insertBefore(button, text);
                }
            }
        }
    }
})();
