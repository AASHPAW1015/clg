// Form validation
document.querySelectorAll('.needs-validation').forEach(form => {
  form.addEventListener('submit', e => {
    if (!form.checkValidity()) { e.preventDefault(); e.stopPropagation(); }
    form.classList.add('was-validated');
  });
});

// Initialize tooltips
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

// Initialize popovers
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));
