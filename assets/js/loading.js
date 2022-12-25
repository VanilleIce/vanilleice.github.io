// Funktion, die das Lade-GIF versteckt, wenn die Seite vollständig geladen wurde
function hideLoadingGif() {
    document.getElementById("loadingGif").style.display = "none";
  }
  
  // Ruft die hideLoadingGif-Funktion auf, wenn die Seite vollständig geladen wurde
  window.onload = hideLoadingGif;
