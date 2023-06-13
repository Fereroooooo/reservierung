// Array zum Speichern der ausgewählten Sitze
var selectedSeats = [];

// Laden der Sitzplatzkarte
window.addEventListener('load', function() {
  var seatingChart = document.getElementById('seating-chart');
  var seatButtons = seatingChart.getElementsByClassName('seat');

  // Event Listener zum Auswählen der Sitze
  for (var i = 0; i < seatButtons.length; i++) {
    seatButtons[i].addEventListener('click', function() {
      toggleSeatSelection(this);
    });
    
    // Zustand basierend auf der CSV-Datei überprüfen
    checkSeatStatus(this);
  }
});

// Funktion zum Auswählen/Deselektieren eines Sitzes
function toggleSeatSelection(seat) {
  if (seat.classList.contains('reserved')) {
    seat.classList.remove('reserved');
    seat.classList.add('available');
  } else {
    seat.classList.remove('available');
    seat.classList.add('reserved');
  }

  var seatNumber = seat.name;

  if (selectedSeats.includes(seatNumber)) {
    var index = selectedSeats.indexOf(seatNumber);
    selectedSeats.splice(index, 1);
  } else {
    selectedSeats.push(seatNumber);
  }

  updateSelectedSeatsDisplay();
}

// Funktion zum Überprüfen des Sitzplatzstatus basierend auf der CSV-Datei
function checkSeatStatus(seat) {
  var seatNumber = seat.name;
  
  // AJAX-Anfrage zum Laden der CSV-Datei
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'seats.csv', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var seatData = xhr.responseText.split('\n');
      for (var i = 0; i < seatData.length; i++) {
        var seatInfo = seatData[i].split(',');
        if (seatInfo[0] === seatNumber && seatInfo[1] === 'reserved') {
          seat.classList.remove('available');
          seat.classList.add('reserved');
          break;
        }
      }
    }
  };
  xhr.send();
}

// Funktion zum Aktualisieren der Anzeige der ausgewählten Sitze
function updateSelectedSeatsDisplay() {
  var selectedSeatsContainer = document.getElementById('selected-seats');
  selectedSeatsContainer.value = selectedSeats.join(', ');
}
