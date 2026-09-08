/* =====================================================
   PULSECHAT
   TASK 16 - MOCK CHAT UI
   VEDA TECHNOLOGY
===================================================== */

const messageInput =
  document.getElementById("messageInput");

const sendBtn =
  document.getElementById("sendBtn");

const messages =
  document.getElementById("messages");

const typingIndicator =
  document.getElementById("typingIndicator");

const toast =
  document.getElementById("toast");

const searchInput =
  document.getElementById("searchInput");

const sidebar =
  document.getElementById("sidebar");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

const openSidebar =
  document.getElementById("openSidebar");

const closeSidebarButton =
  document.getElementById("closeSidebar");

const chatName =
  document.getElementById("chatName");

const headerAvatar =
  document.getElementById("headerAvatar");

const newChatBtn =
  document.getElementById("newChatBtn");

const emojiBtn =
  document.getElementById("emojiBtn");

const attachBtn =
  document.getElementById("attachBtn");

const micBtn =
  document.getElementById("micBtn");

const callBtn =
  document.getElementById("callBtn");

const moreBtn =
  document.getElementById("moreBtn");

const chatSearchBtn =
  document.getElementById("chatSearchBtn");

const sortBtn =
  document.getElementById("sortBtn");


// =====================================================
// STATE
// =====================================================

let currentUser = "Alex Morgan";

let currentColor = "purple";


// =====================================================
// CONTACT DATA
// =====================================================

const contacts = {

  "Alex Morgan": {
    initials: "AM",
    color: "purple",
    status: "Online",
    reply: [
      "Absolutely! 🚀",
      "That sounds great!",
      "Nice! Keep going.",
      "Awesome work!",
      "I'll check it out."
    ]
  },

  "Sarah Wilson": {
    initials: "SW",
    color: "blue",
    status: "Active 10m ago",
    reply: [
      "The design looks amazing!",
      "I'll send the updated files.",
      "Perfect, thank you!",
      "Let's review it together."
    ]
  },

  "Daniel Lee": {
    initials: "DL",
    color: "orange",
    status: "Active 1h ago",
    reply: [
      "I'll send the files tonight.",
      "Sure, no problem.",
      "Let's discuss it tomorrow.",
      "Sounds good to me."
    ]
  },

  "Emily Carter": {
    initials: "EC",
    color: "green",
    status: "Online",
    reply: [
      "Thanks for your help!",
      "That's really helpful.",
      "I'll get back to you soon.",
      "Perfect!"
    ]
  },

  "Michael Brown": {
    initials: "MB",
    color: "red",
    status: "Active yesterday",
    reply: [
      "Let's discuss the project.",
      "That works for me.",
      "Great idea!",
      "I'll keep you updated."
    ]
  }

};


// =====================================================
// UTILITY - ESCAPE HTML
// =====================================================

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


// =====================================================
// CURRENT TIME
// =====================================================

function getCurrentTime() {

  return new Date().toLocaleTimeString(
    [],
    {
      hour: "numeric",
      minute: "2-digit"
    }
  );
}


// =====================================================
// SHOW TOAST
// =====================================================

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 1800);
}


// =====================================================
// SCROLL TO BOTTOM
// =====================================================

function scrollToBottom() {

  setTimeout(() => {

    messages.scrollTo({
      top: messages.scrollHeight,
      behavior: "smooth"
    });

  }, 50);
}


// =====================================================
// ADD SENT MESSAGE
// =====================================================

function addSentMessage(text) {

  const row =
    document.createElement("div");

  row.className =
    "message-row sent";

  row.innerHTML = `

    <div class="message-group">

      <div class="message-bubble sent-bubble">

        ${escapeHTML(text)}

      </div>

      <div class="message-meta sent-meta">

        <time>
          ${getCurrentTime()}
        </time>

        <span class="read-status">
          ✓✓
        </span>

      </div>

    </div>

  `;

  messages.appendChild(row);

  scrollToBottom();
}


// =====================================================
// ADD RECEIVED MESSAGE
// =====================================================

function addReceivedMessage(text) {

  const row =
    document.createElement("div");

  row.className =
    "message-row received";

  const contact =
    contacts[currentUser];

  row.innerHTML = `

    <div class="avatar ${contact.color} mini-avatar">

      ${contact.initials}

    </div>

    <div class="message-group">

      <div class="message-bubble received-bubble">

        ${escapeHTML(text)}

      </div>

      <div class="message-meta">

        <time>
          ${getCurrentTime()}
        </time>

      </div>

    </div>

  `;

  messages.appendChild(row);

  scrollToBottom();
}


// =====================================================
// SEND MESSAGE
// =====================================================

function sendMessage() {

  const text =
    messageInput.value.trim();

  if (!text) {

    showToast("Type a message first");

    messageInput.focus();

    return;
  }

  addSentMessage(text);

  messageInput.value = "";

  showToast("Message sent ✓");

  simulateReply();
}


// =====================================================
// SIMULATE REPLY
// =====================================================

function simulateReply() {

  typingIndicator.style.display =
    "flex";

  scrollToBottom();

  const contact =
    contacts[currentUser];

  const replies =
    contact.reply;

  const reply =
    replies[
      Math.floor(
        Math.random() * replies.length
      )
    ];

  clearTimeout(window.replyTimer);

  window.replyTimer =
    setTimeout(() => {

      typingIndicator.style.display =
        "none";

      addReceivedMessage(reply);

    }, 1200);
}


// =====================================================
// ENTER TO SEND
// =====================================================

messageInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }
);


// =====================================================
// SEND BUTTON
// =====================================================

sendBtn.addEventListener(
  "click",
  sendMessage
);


// =====================================================
// SEARCH CONVERSATIONS
// =====================================================

searchInput.addEventListener(
  "input",
  event => {

    const query =
      event.target.value
        .toLowerCase()
        .trim();

    const conversations =
      document.querySelectorAll(
        ".conversation"
      );

    let visibleCount = 0;

    conversations.forEach(
      conversation => {

        const name =
          conversation.dataset.name
            .toLowerCase();

        const visible =
          name.includes(query);

        conversation.style.display =
          visible ? "flex" : "none";

        if (visible) {

          visibleCount++;

        }

      }
    );

    if (
      query &&
      visibleCount === 0
    ) {

      showToast(
        "No conversations found"
      );

    }

  }
);


// =====================================================
// SELECT CONVERSATION
// =====================================================

function selectConversation(
  conversation
) {

  const name =
    conversation.dataset.name;

  const contact =
    contacts[name];

  if (!contact) return;

  currentUser = name;

  currentColor =
    contact.color;

  // Remove active
  document
    .querySelectorAll(
      ".conversation"
    )
    .forEach(item => {

      item.classList.remove("active");

    });

  conversation.classList.add("active");

  // Header name
  chatName.textContent =
    name;

  // Header avatar
  headerAvatar.className =
    `avatar ${contact.color}`;

  headerAvatar.innerHTML = `
    ${contact.initials}
    <span class="online-dot"></span>
  `;

  // Status
  const status =
    document.getElementById(
      "chatStatus"
    );

  status.textContent =
    contact.status;

  showToast(
    `Opened ${name}`
  );

  closeSidebar();

}


// =====================================================
// CONVERSATION CLICK
// =====================================================

document
  .querySelectorAll(
    ".conversation"
  )
  .forEach(conversation => {

    conversation.addEventListener(
      "click",
      () => {

        selectConversation(
          conversation
        );

      }
    );

  });


// =====================================================
// NEW CHAT
// =====================================================

newChatBtn.addEventListener(
  "click",
  () => {

    const name =
      prompt(
        "Enter contact name:"
      );

    if (!name) return;

    const cleanName =
      name.trim();

    if (!cleanName) return;

    chatName.textContent =
      cleanName;

    showToast(
      `New chat with ${cleanName}`
    );

  }
);


// =====================================================
// EMOJI
// =====================================================

emojiBtn.addEventListener(
  "click",
  () => {

    const emojis = [
      " 😊",
      " 👍",
      " 🚀",
      " ❤️",
      " 🔥",
      " 🎯"
    ];

    const emoji =
      emojis[
        Math.floor(
          Math.random() *
          emojis.length
        )
      ];

    messageInput.value += emoji;

    messageInput.focus();

  }
);


// =====================================================
// ATTACHMENT
// =====================================================

attachBtn.addEventListener(
  "click",
  () => {

    showToast(
      "Attachment feature is available in demo mode"
    );

  }
);


// =====================================================
// MICROPHONE
// =====================================================

micBtn.addEventListener(
  "click",
  () => {

    showToast(
      "Voice message feature is available in demo mode"
    );

  }
);


// =====================================================
// CALL
// =====================================================

callBtn.addEventListener(
  "click",
  () => {

    showToast(
      `Calling ${currentUser}...`
    );

  }
);


// =====================================================
// MORE OPTIONS
// =====================================================

moreBtn.addEventListener(
  "click",
  () => {

    showToast(
      "More options opened"
    );

  }
);


// =====================================================
// CHAT SEARCH
// =====================================================

chatSearchBtn.addEventListener(
  "click",
  () => {

    showToast(
      "Conversation search activated"
    );

    messageInput.focus();

  }
);


// =====================================================
// SORT
// =====================================================

sortBtn.addEventListener(
  "click",
  () => {

    showToast(
      "Conversation options"
    );

  }
);


// =====================================================
// MOBILE SIDEBAR
// =====================================================

function openSidebarMenu() {

  sidebar.classList.add(
    "open"
  );

  sidebarOverlay.classList.add(
    "active"
  );

}


function closeSidebar() {

  sidebar.classList.remove(
    "open"
  );

  sidebarOverlay.classList.remove(
    "active"
  );

}


openSidebar.addEventListener(
  "click",
  openSidebarMenu
);


closeSidebarButton.addEventListener(
  "click",
  closeSidebar
);


sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);


// =====================================================
// ESC KEY
// =====================================================

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeSidebar();

    }

  }
);


// =====================================================
// COMMAND K SEARCH
// =====================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      (event.ctrlKey ||
       event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      searchInput.focus();

    }

  }
);


// =====================================================
// INITIAL SCROLL
// =====================================================

window.addEventListener(
  "load",
  () => {

    scrollToBottom();

    messageInput.focus();

  }
);
