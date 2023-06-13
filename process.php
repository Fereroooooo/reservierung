<?php
// Überprüfen, ob das Formular abgeschickt wurde
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Überprüfen der eingegebenen Daten
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $time = $_POST['time'];
  $extras = $_POST['extras'];
  $privacy = isset($_POST['privacy']) ? true : false;
  
  // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
  if ($name && $phone && $email && $time && $privacy) {
    // Speichern der Daten in einer TXT-Datei
    $data = "Name: $name\nTelefon: $phone\nEmail: $email\nUhrzeit: $time\nExtras: $extras\n\n";
    file_put_contents('reservations.txt', $data, FILE_APPEND);
    
    // Aktualisieren der Verfügbarkeit der Sitze in der ersten TXT-Datei
    $selectedSeats = isset($_POST['selected_seats']) ? $_POST['selected_seats'] : []; // Überprüfen, ob das Array vorhanden ist
    
    if (!empty($selectedSeats)) {
      $reservedSeats = file_exists('reserved-seats.txt') ? file('reserved-seats.txt', FILE_IGNORE_NEW_LINES) : [];
      
      foreach ($selectedSeats as $seatNumber) {
        if (!in_array($seatNumber, $reservedSeats)) {
          $reservedSeats[] = $seatNumber;
        }
      }
      
      file_put_contents('reserved-seats.txt', implode("\n", $reservedSeats));
    }
    
    // Erfolgreiche Reservierungsbestätigung
    echo 'Vielen Dank! Ihre Reservierung wurde erfolgreich abgeschlossen.';
  } else {
    // Fehlermeldung bei unvollständigen Daten
    echo 'Bitte füllen Sie alle erforderlichen Felder aus.';
  }
} else {
  // Weiterleitung bei direktem Aufruf der PHP-Datei ohne Formularabsendung
  header('Location: index.html');
  exit;
}
?>
