document.addEventListener("DOMContentLoaded", function() {
    let step = 0;
    let userName = '';
    let language = '';
    let userLocation = '';
    const googleFormLink = 'https://forms.gle/XjmQiEz8FzVdrVMo6';  // Updated Google Form Link
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwZyhTkaa3U4kMn334X4m7ZSz1S9CaaeN2G64w3PQiM0ofWDqFTKoefCI44mIDfHQ/exec'; // Updated Apps Script URL

    function appendMessage(text, className, isLink = false) {
        const messageBox = document.createElement("div");
        messageBox.classList.add("message", className);

        if (isLink) {
            const link = document.createElement("a");
            link.href = text;
            link.target = "_blank"; 
            link.textContent = text;
            messageBox.appendChild(link);
        } else {
            messageBox.textContent = text;
        }

        const chatBox = document.getElementById("chat-box");
        chatBox.appendChild(messageBox);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendButtons(button1Text, button2Text = null) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const button1 = document.createElement("button");
        button1.textContent = button1Text;
        button1.classList.add("stylish-button");
        button1.addEventListener("click", function() {
            handleUserInput(button1Text);
        });

        buttonContainer.appendChild(button1);

        if (button2Text) {
            const button2 = document.createElement("button");
            button2.textContent = button2Text;
            button2.classList.add("stylish-button");
            button2.addEventListener("click", function() {
                handleUserInput(button2Text);
            });
            buttonContainer.appendChild(button2);
        }

        const chatBox = document.getElementById("chat-box");
        chatBox.appendChild(buttonContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleUserInput(userInput) {
        if (step === 0) {
            language = userInput;
            if (language === "English") {
                appendMessage("Hi there! 👋 Welcome to CSVTU SUPPORT. I'll help you with your CSVTU queries. Before we get going, I'd love to know your name?", "bot-message");
            } else if (language === "हिन्दी") {
                appendMessage("नमस्ते! 👋 CSVTU सपोर्ट में आपका स्वागत है। मैं आपकी CSVTU से संबंधित प्रश्नों में मदद करूंगा। चलिए पहले आपका नाम जान लेते हैं?", "bot-message");
            }
            step++;
        } else if (step === 1) {
            userName = userInput;
            if (language === "English") {
                appendMessage(`Nice to meet you, ${userName}! How can I help you today?`, "bot-message");
                appendButtons("Query About Your Degree", "Track My Order");
            } else if (language === "हिन्दी") {
                appendMessage(`आपसे मिलकर अच्छा लगा, ${userName}! आज मैं आपकी किस प्रकार सहायता कर सकता हूँ?`, "bot-message");
                appendButtons("डिग्री के बारे में प्रश्न", "ऑर्डर ट्रैक करें");
            }
            step++;
        } else if (step === 2) {
            if (userInput === "Query About Your Degree" || userInput === "डिग्री के बारे में प्रश्न") {
                if (language === "English") {
                    appendMessage("Awesome! Let's find you some application forms. Please enter the address where you're going to apply online 😇", "bot-message");
                } else if (language === "हिन्दी") {
                    appendMessage("आइए, हम आपके लिए कुछ आवेदन पत्र खोजते हैं। कृपया वह पता दर्ज करें जहाँ आप ऑनलाइन आवेदन कर रहे हैं 😇", "bot-message");
                }
                step++;
            } else if (userInput === "Track My Order" || userInput === "ऑर्डर ट्रैक करें") {
                if (language === "English") {
                    // Provide the Apps Script URL in English
                    appendMessage("Here is the link to track your order:", "bot-message");
                    appendMessage(scriptUrl, "bot-message", true);

                    // Open the Apps Script URL in a new tab after a 1-second delay
                    setTimeout(() => {
                        window.open(scriptUrl, '_blank');
                    }, 1000);

                    // Provide further instructions in English
                    setTimeout(() => {
                        appendMessage("If you have any further queries, please contact the CSVTU Degree Department.", "bot-message");
                        appendMessage("Thank you for chatting with me! Have a great day! 😊", "bot-message");

                        // Reset the chat after a delay
                        setTimeout(resetChat, 2000);
                    }, 2000);
                } else if (language === "हिन्दी") {
                    // Provide the Apps Script URL in Hindi
                    appendMessage("यह आपका ऑर्डर ट्रैक करने के लिए लिंक है:", "bot-message");
                    appendMessage(scriptUrl, "bot-message", true);

                    // Open the Apps Script URL in a new tab after a 1-second delay
                    setTimeout(() => {
                        window.open(scriptUrl, '_blank');
                    }, 1000);

                    // Provide further instructions in Hindi
                    setTimeout(() => {
                        appendMessage("यदि आपके पास कोई अन्य प्रश्न हैं, तो कृपया CSVTU डिग्री विभाग से संपर्क करें।", "bot-message");
                        appendMessage("मुझसे बात करने के लिए धन्यवाद! आपका दिन शुभ हो! 😊", "bot-message");

                        // Reset the chat after a delay
                        setTimeout(resetChat, 2000);
                    }, 2000);
                }

                step = 5; // Move to a step that indicates the conversation has ended
            }
        } else if (step === 3) {
            userLocation = userInput;
            if (language === "English") {
                appendMessage(`Wow! ${userLocation} is a beautiful place. Now, click the link below to apply online:`, "bot-message");
            } else if (language === "हिन्दी") {
                appendMessage(`वाह! ${userLocation} एक सुंदर स्थान है। अब, नीचे दिए गए लिंक पर क्लिक करें और ऑनलाइन आवेदन करें:`, "bot-message");
            }
            
            // Provide Google Form link
            appendMessage(googleFormLink, "bot-message", true);

            setTimeout(() => {
                appendButtons("Yes, I have filled it", "I haven't filled it yet");
            }, 2000);
            step++;
        } else if (step === 4) {
            if (userInput === "Yes, I have filled it") {
                if (language === "English") {
                    appendMessage("Congratulations! 🎉 You should receive a reference ID in your Gmail.", "bot-message");
                    appendMessage("With this reference ID, you can check your status later.", "bot-message");
                } else if (language === "हिन्दी") {
                    appendMessage("बधाई हो! 🎉 आपको अपने Gmail में एक संदर्भ आईडी प्राप्त होनी चाहिए।", "bot-message");
                    appendMessage("इस संदर्भ आईडी के साथ, आप बाद में अपनी स्थिति की जाँच कर सकते हैं।", "bot-message");
                }
            } else if (userInput === "I haven't filled it yet" || userInput === "मैंने इसे अभी तक नहीं भरा है") {
                if (language === "English") {
                    appendMessage("No worries! Please take your time to fill out the form using the link provided.", "bot-message");
                } else if (language === "हिन्दी") {
                    appendMessage("कोई बात नहीं! कृपया दिए गए लिंक का उपयोग करके फॉर्म भरने के लिए समय लें।", "bot-message");
                }
            }

            // After congratulating, return to the main menu options
            setTimeout(() => {
                if (language === "English") {
                    appendMessage(`How can I help you today, ${userName}?`, "bot-message");
                    appendButtons("Query About Your Degree", "Track My Order");
                } else if (language === "हिन्दी") {
                    appendMessage(`मैं आज आपकी किस प्रकार सहायता कर सकता हूँ, ${userName}?`, "bot-message");
                    appendButtons("डिग्री के बारे में प्रश्न", "ऑर्डर ट्रैक करें");
                }
            }, 2000);
            step = 2; // Reset to main menu
        }
    }

    // Initialize the chat by showing the language selection buttons
    appendMessage("Would you like to chat in English or हिन्दी?", "bot-message");
    appendButtons("English", "हिन्दी");

    document.getElementById("send-btn").addEventListener("click", function() {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput) {
            appendMessage(userInput, "user-message");
            document.getElementById("user-input").value = "";
            handleUserInput(userInput);
        }
    });

    document.getElementById("user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("send-btn").click();
        }
    });

    function resetChat() {
        document.getElementById("chat-box").innerHTML = "";
        step = 0;
        userName = '';
        language = '';
        userLocation = '';
        appendMessage("Would you like to chat in English or हिन्दी?", "bot-message");
        appendButtons("English", "हिन्दी");
    }
});
