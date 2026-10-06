// Admin-panel behaviour. Loaded as a same-origin script because the panel's
// Content-Security-Policy blocks inline event handlers.
(function () {
  // Delete confirmations: forms carry an onsubmit="return confirm('...')" attribute (blocked
  // by the CSP, so it never runs on its own); read the message from it and confirm here.
  document.querySelectorAll('form[onsubmit]').forEach(function (form) {
    var m = /confirm\(\s*'([^']*)'/.exec(form.getAttribute('onsubmit') || '');
    if (m) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        if (!window.confirm(m[1])) e.preventDefault();
      });
    }
  });
  document.querySelectorAll('form.confirm-delete').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.confirm('Delete this login? This cannot be undone.')) e.preventDefault();
    });
  });

  // Random password generator for the portal-user form.
  var gen = document.getElementById('gen');
  if (gen) {
    gen.addEventListener('click', function () {
      var chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      var buf = new Uint32Array(14);
      var out = '';
      window.crypto.getRandomValues(buf);
      for (var i = 0; i < buf.length; i++) out += chars.charAt(buf[i] % chars.length);
      document.getElementById('np').value = out;
    });
  }
})();
