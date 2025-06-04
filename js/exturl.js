$(document).ready(function () {
  // Base64 Utility
  const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode(input) {
      let output = "";
      let i = 0;
      input = this._utf8_encode(input);

      while (i < input.length) {
        const chr1 = input.charCodeAt(i++);
        const chr2 = input.charCodeAt(i++);
        const chr3 = input.charCodeAt(i++);

        const enc1 = chr1 >> 2;
        const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        const enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        const enc4 = chr3 & 63;

        output += this._keyStr.charAt(enc1);
        output += this._keyStr.charAt(enc2);
        output += isNaN(chr2) ? "=" : this._keyStr.charAt(enc3);
        output += isNaN(chr3) ? "=" : this._keyStr.charAt(enc4);
      }

      return output;
    },

    decode(input) {
      let output = "";
      let i = 0;

      input = input.replace(/[^A-Za-z0-9+/=]/g, "");

      while (i < input.length) {
        const enc1 = this._keyStr.indexOf(input.charAt(i++));
        const enc2 = this._keyStr.indexOf(input.charAt(i++));
        const enc3 = this._keyStr.indexOf(input.charAt(i++));
        const enc4 = this._keyStr.indexOf(input.charAt(i++));

        const chr1 = (enc1 << 2) | (enc2 >> 4);
        const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        const chr3 = ((enc3 & 3) << 6) | enc4;

        output += String.fromCharCode(chr1);
        if (enc3 !== 64) output += String.fromCharCode(chr2);
        if (enc4 !== 64) output += String.fromCharCode(chr3);
      }

      return this._utf8_decode(output);
    },

    _utf8_encode(string) {
      return unescape(encodeURIComponent(string));
    },

    _utf8_decode(string) {
      return decodeURIComponent(escape(string));
    },
  };

  // External Link Handler
  $('.exturl').on('click', function (e) {
    e.preventDefault();
    const encodedUrl = $(this).data('url');
    if (!encodedUrl) return;

    try {
      const decodedUrl = Base64.decode(encodedUrl);
      window.open(decodedUrl, '_blank');
    } catch (err) {
      console.error('Ungültige URL:', err);
    }
  });
});
