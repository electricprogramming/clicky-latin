if (!localStorage.getItem("downloadWarningAcknowledged")) {
  const banner = document.createElement("div");
  banner.id = "download-warning-banner";
  Object.assign(banner.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2d2d2d",             // Dark gray background from your image
    padding: "40px",                        // Generous, even padding all around
    borderRadius: "20px",
    boxShadow: "0 4px 15px #00000066",
    zIndex: "200000",
    maxWidth: "700px",                     // Wider container to match your layout
    width: "90%",
    fontFamily: "Times",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",              // Centers content vertically
    alignItems: "center"                    // Centers content horizontally
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
    zIndex: "199999",                       // Sits just below the modal
    backdropFilter: "blur(2px)",           // Optional: adds a slight blur
    pointerEvents: "auto"
  });

  // 4. Create the text content
  const message = document.createElement("p");
  message.textContent = "IMPORTANT: Clicky Latin will NEVER try to download a file to your device. If it does, Clicky Latin has likely been hacked and the file is likely malware which should be deleted immediately.";
  message.style.marginBottom = "40px";
  message.style.fontSize = "40px"
  message.style.setProperty("color", "#fff", "important");

  // 5. Create the dismiss button
  const dismissBtn = document.createElement("button");
  dismissBtn.id = "dismiss-warning-button";
  dismissBtn.textContent = "I Understand.";
  Object.assign(dismissBtn.style, {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    fontFamily: "Times",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "20px"
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