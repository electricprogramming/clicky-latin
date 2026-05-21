if (!localStorage.getItem("downloadWarningAcknowledged")) {
  alert('IMPORTANT: Clicky Latin will NEVER try to download a file or app of any kind to your device. If it does, Clicky Latin has likely been hacked, and the file is likely malware, which should be deleted immediately.');
  localStorage.setItem("downloadWarningAcknowledged", "true");
}