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

    // Zustand basierend auf der TXT-Datei überprüfen
    checkSeatStatus(seatButtons[i]);
  }
});

// Funktion zum Auswählen/Deselektieren eines Sitzes
function toggleSeatSelection(seat) {
  if (seat.classList.contains('reserved')) {
    return; // Wenn der Sitz reserviert ist, wird nichts unternommen
  }

  seat.classList.toggle('selected');

  var seatNumber = seat.getAttribute('name');

  if (selectedSeats.includes(seatNumber)) {
    var index = selectedSeats.indexOf(seatNumber);
    selectedSeats.splice(index, 1);
  } else {
    selectedSeats.push(seatNumber);
  }

  updateSelectedSeatsDisplay();
}

// Funktion zum Überprüfen des Sitzplatzstatus basierend auf der TXT-Datei
function checkSeatStatus(seat) {
  var seatNumber = seat.getAttribute('name');

  // AJAX-Anfrage zum Überprüfen des Sitzplatzstatus
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'seats.txt', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var seatStatus = xhr.responseText.split('\n');
      for (var i = 0; i < seatStatus.length; i++) {
        var status = seatStatus[i].split(':');
        if (status[0] === seatNumber && status[1] === 'reserved') {
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
