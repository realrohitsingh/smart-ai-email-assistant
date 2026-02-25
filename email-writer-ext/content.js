console.log("Email Writer Extension - Content Script Loaded");

function createAIButton() {
  const button = document.createElement("div");
  // Keep the Gmail classes just in case, but rely on inline styles
  button.className = "T-I J-J5-Ji aoO v7 T-I-atL L3";

  // Apply robust inline styles to force the button appearance
  Object.assign(button.style, {
    marginRight: "8px",
    backgroundColor: "#0b57d0", // Gmail's standard primary blue
    color: "#ffffff",
    border: "none",
    borderRadius: "18px", // Gmail's modern pill shape
    padding: "0 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "36px",
    fontFamily: "'Google Sans', Roboto, RobotoDraft, Helvetica, Arial, sans-serif",
    transition: "background-color 0.15s"
  });

  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");

  // Add a simple hover effect
  button.addEventListener('mouseenter', () => {
    if (!button.disabled) button.style.backgroundColor = "#0842a0";
  });
  button.addEventListener('mouseleave', () => {
    if (!button.disabled) button.style.backgroundColor = "#0b57d0";
  });

  return button;
}

function getEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return ""; // Moved outside the loop
}

function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null; // Moved outside the loop
}

function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) existingButton.remove();

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar Not Found");
    return;
  }
  console.log("Toolbar found, creating AI button");
  const button = createAIButton();
  button.classList.add("ai-reply-button");

  // FIX: Added 'async' before the arrow function
  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating..."; // FIX: Corrected spelling from innterHTML
      button.disabled = true;

      const emailContent = getEmailContent();
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error("API Request Failed");
      }

      const generatedReply = await response.text();
      const composeBox = document.querySelector(
        '[role=textbox][g_editable="true"]',
      );

      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedReply);
      } else {
        console.error("Compose Box Not Found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI reply: " + error.message);
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false; // FIX: Changed comma to dot
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]')),
    );

    if (hasComposeElements) {
      console.log("Compose Window Detected");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
