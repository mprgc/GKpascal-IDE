

// ---------- Setting ----------

let showPopup = true;
let postImage = "post1.jpg";
let countdownTime = 5;

// ----------------------------

if (showPopup === true) {

    window.addEventListener("load", function () {

        setTimeout(function () {

            // ---------- OVERLAY ----------
            let overlay = document.createElement("div");
            overlay.className = "popup-overlay";

            // ---------- POPUP CARD ----------
            let popup = document.createElement("div");
            popup.className = "popup-card";

            popup.innerHTML = `
                <div class="skip-area">
                    <span id="countdown">${countdownTime}</span>
                    <button id="skipBtn" class="skip-btn">Skip</button>
                </div>
                <img src="${postImage}" class="popup-image" id="popupImage">
            `;

            overlay.appendChild(popup);
            document.body.appendChild(overlay);

            // ---------- CSS ----------
            let style = document.createElement("style");
            style.innerHTML = `
                .popup-overlay{
                    position:fixed;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                    background:rgba(0,0,0,0.6);
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    z-index:9999;
                }

                .popup-card{
                    width:90%;
                    max-width:400px;
                    background:#0000;
                    border-radius:20px;
                    padding:0px;
                    position:relative;
                    transform:scale(0.8);
                    opacity:0;
                    transition:0.4s ease;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
                }

                .popup-show{
                    transform:scale(1);
                    opacity:1;
                }

                .popup-image{
                    width:100%;
                    border-radius:15px;
                    display:block;
                    cursor:pointer;
                    transition:0.3s ease;
                }

                .skip-area{
                    position:absolute;
                    top:10px;
                    right:10px;
                    display:flex;
                    align-items:center;
                    gap:8px;
                }

                #countdown{
                    background:rgba(0,0,0,0.6);
                    color:#fff;
                    padding:5px 8px;
                    border-radius:20px;
                    font-size:13px;
                }

                .skip-btn{
                    display:none;
                    background:#e53935;
                    border:none;
                    color:#fff;
                    padding:5px 10px;
                    border-radius:15px;
                    font-size:13px;
                    cursor:pointer;
                    transition:transform 0.2s ease;
                }

                .skip-btn:active{
                    transform: scale(0.85) rotate(-5deg);
                }

                .popup-exit{
                    animation: sideExit 0.5s forwards ease-in-out;
                }

                @keyframes sideExit{
                    0%{
                        transform: scale(1) rotate(0deg);
                        opacity:1;
                    }
                    50%{
                        transform: scale(0.9) rotate(-8deg) translateX(-40px);
                        opacity:0.7;
                    }
                    100%{
                        transform: scale(0.7) rotate(15deg) translateX(300px);
                        opacity:0;
                    }
                }

                /* Fullscreen zoom animation */
                .fullscreen-image{
                    position:fixed;
                    top:50%;
                    left:50%;
                    width:100%;
                    max-height:100%;
                    transform:translate(-50%, -50%) scale(0.8);
                    object-fit:contain;
                    background:rgba(0,0,0,0.95);
                    z-index:10000;
                    cursor:pointer;
                    transition:transform 0.4s ease, opacity 0.4s ease;
                    opacity:0;
                }

                .fullscreen-image.show{
                    transform:translate(-50%, -50%) scale(1);
                    opacity:1;
                }
            `;
            document.head.appendChild(style);

            // ---------- SHOW POPUP ----------
            setTimeout(() => {
                popup.classList.add("popup-show");
            }, 50);

            // ---------- Countdown ----------
            let countdownElement = document.getElementById("countdown");
            let skipBtn = document.getElementById("skipBtn");

            let timer = setInterval(function () {
                countdownTime--;
                countdownElement.innerText = countdownTime;

                if (countdownTime <= 0) {
                    clearInterval(timer);
                    countdownElement.style.display = "none";
                    skipBtn.style.display = "inline-block";
                }
            }, 1000);

            // ---------- Skip click ----------
            skipBtn.onclick = function () {
                popup.classList.remove("popup-show");
                popup.classList.add("popup-exit");

                setTimeout(function () {
                    overlay.remove();
                }, 500);
            };

            // ---------- Image Click to Fullscreen ----------
            let popupImg = document.getElementById("popupImage");

            popupImg.onclick = function () {
                let fsImg = document.createElement("img");
                fsImg.src = postImage;
                fsImg.className = "fullscreen-image";
                document.body.appendChild(fsImg);

                // Trigger zoom animation
                setTimeout(() => {
                    fsImg.classList.add("show");
                }, 50);

                // Click again to close
                fsImg.onclick = function () {
                    fsImg.classList.remove("show");
                    setTimeout(() => {
                        fsImg.remove();
                    }, 400);
                };
            };

        }, 2000); // 2s delay

    });
}
