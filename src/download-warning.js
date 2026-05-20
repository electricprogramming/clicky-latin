if (!localStorage.getItem("downloadWarningAcknowledged")) {
  const banner = document.createElement("div");
  banner.id = "download-warning-banner";
  Object.assign(banner.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",   // Perfect centering trick
    backgroundColor: "#fff",
    color: "#333",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 15px #0009",
    zIndex: "9999",                       // Sits on top of everything
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
    fontFamily: "sans-serif"
  });
  const backdrop = document.createElement("div");
  backdrop.id = "download-warning-backdrop";
  Object.assign(backdrop.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#0003", // Darkens the background
    zIndex: "9998",                       // Sits just below the modal
    backdropFilter: "blur(2px)"           // Optional: adds a slight blur
  });

  // 4. Create the text content
  const message = document.createElement("p");
  message.textContent = "Important notice regarding your download. Please review before proceeding.";
  message.style.marginBottom = "20px";

  // 5. Create the dismiss button
  const dismissBtn = document.createElement("button");
  dismissBtn.id = "dismiss-warning-button";
  dismissBtn.textContent = "I Understand";
  Object.assign(dismissBtn.style, {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  });

  // 6. Assemble the elements
  banner.append(message, dismissBtn);
  backdrop.append(banner)
  document.body.append(backdrop)

  dismissBtn.addEventListener("click", () => {
    backdrop.remove();
    localStorage.setItem("downloadWarningAcknowledged", "true");
  });
}