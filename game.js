// Penjaga: Tunggu sampai seluruh HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. AMBIL SEMUA ELEMEN HTML ---
    const nameInputContainer = document.getElementById('name-input-container');
    const playerNameInput = document.getElementById('player-name-input');
    const submitNameBtn = document.getElementById('submit-name-btn');
    const gameBoard = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');
    
    // Tombol Home
    const homeBtnStart = document.getElementById('home-btn-start'); 
    const homeBtnGame = document.getElementById('home-btn-game'); 
    
    // Modal Kustom
    const customConfirmModal = document.getElementById('custom-confirm-modal');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');
    const confirmNoBtn = document.getElementById('confirm-no-btn');
    const confirmMessage = document.getElementById('confirm-message');
    
    const scoreDisplay = document.getElementById('player-score');
    const allBoxInputs = document.querySelectorAll('.box-input');

    // Elemen Tantangan
    const challengeDisplay = document.getElementById('challenge-display');
    const challengeQuestion = document.getElementById('challenge-question');
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const kubusSoal = document.getElementById('kubus-soal');
    const kubusGulungan = document.getElementById('kubus-gulungan'); 

    // Audio
    const bgMusic = document.getElementById('bg-music');
    const correctSound = document.getElementById('correct-sound');
    const failSound = document.getElementById('fail-sound');

    // --- 2. VARIABEL & DATA GAME ---
    let playerName = "";
    let currentScore = 0;
    let currentChallenge = null; 
    let availableChallenges = []; // Array untuk soal yang belum dijawab

    // DATA TANTANGAN FINAL (10 Soal)
    const allChallenges = [
        // 1. BARISAN: Tentukan Beda (b) dan Suku (U)
        {
            id: 1,
            question: "Barisan: 6, __, 14, __, __. Tentukan beda (b) dan isi U₂, U₄, dan B1!",
            a: 6,
            b: 4, 
            target: ["U2", "U4", "B1"], 
            answer: { U2: 10, U4: 18, B1: 4 },
            type: "Barisan (U)"
        },
        // 2. BARISAN: Diketahui a dan b (Beda Negatif)
        {
            id: 2,
            question: "Jika suku pertama (U₁) = 15 dan beda (b) = -3. Isi B1, U₃, dan U₆!",
            a: 15,
            b: -3,
            target: ["B1", "U3", "U6"],
            answer: { B1: -3, U3: 9, U6: 0 },
            type: "Barisan (U)"
        },
        // 3. BARISAN: Diketahui 3 suku awal
        {
            id: 3,
            question: "Barisan: 4, 7, 10, ... Tentukan U₃, U₅, dan B1!",
            a: 4,
            b: 3, 
            target: ["U3", "U5", "B1"],
            answer: { U3: 10, U5: 16, B1: 3 },
            type: "Barisan (U)"
        },
        // 4. DERET: Menghitung Beda (b) dari Suku Pertama (a) dan Jumlah Suku (S)
        {
            id: 4,
            question: "Diketahui Jumlah 4 suku pertama (S₄) = 28 dan U₁ = 4. Tentukan Beda (b) dan isi U₂, U₃, B1!",
            a: 4,
            b: 2, 
            target: ["U2", "U3", "B1"],
            answer: { U2: 6, U3: 8, B1: 2 },
            type: "Deret (S)"
        },
        // 5. BARISAN: Suku yang hilang (mencari U1)
        {
            id: 5,
            question: "Barisan: __, 5, 8, 11, __. Tentukan U₁, U₆, dan B1!",
            a: 2,
            b: 3,
            target: ["U1", "U6", "B1"],
            answer: { U1: 2, U6: 17, B1: 3 },
            type: "Barisan (U)"
        },
        // 6. BARISAN: Diketahui U1 dan Beda negatif (mencari U5)
        {
            id: 6,
            question: "Jika suku pertama (U₁) = 25 dan beda (b) = -5. Isi U₂, B2, dan U₅!",
            a: 25,
            b: -5,
            target: ["U2", "B2", "U5"],
            answer: { U2: 20, B2: -5, U5: 5 },
            type: "Barisan (U)"
        },
        // 7. BARISAN: Suku yang hilang dengan beda positif
        {
            id: 7,
            question: "Barisan: 2, 6, 10, 14, __, __. Tentukan U₅, U₆, dan B1!",
            a: 2,
            b: 4,
            target: ["U5", "U6", "B1"],
            answer: { U5: 18, U6: 22, B1: 4 },
            type: "Barisan (U)"
        },
        // 8. DERET: Mencari U₁ dan Beda dari U tengah
        {
            id: 8,
            question: "Jika U₂ = 10 dan U₅ = 22. Tentukan U₁, U₆, dan B1!",
            a: 6,
            b: 4,
            target: ["U1", "U6", "B1"],
            answer: { U1: 6, U6: 26, B1: 4 },
            type: "Deret (S)"
        },
        // 9. BARISAN: Beda kecil (b=1)
        {
            id: 9,
            question: "Barisan: 8, 9, 10, __, __. Tentukan U₄, U₅, dan B1!",
            a: 8,
            b: 1,
            target: ["U4", "U5", "B1"],
            answer: { U4: 11, U5: 12, B1: 1 },
            type: "Barisan (U)"
        },
        // 10. BARISAN: Mengisi banyak suku (Beda besar)
        {
            id: 10,
            question: "Jika U₁ = 5, Beda (b) = 6. Isi U₂, U₄, dan U₆!",
            a: 5,
            b: 6,
            target: ["U2", "U4", "U6"],
            answer: { U2: 11, U4: 23, U6: 35 },
            type: "Barisan (U)"
        }
    ];

    // --- 3. FUNGSI NAVIGASI MODAL KUSTOM ---
    
    function showCustomConfirm(message, callback) {
        confirmMessage.textContent = message;
        customConfirmModal.style.display = 'flex';
        
        confirmYesBtn.onclick = null;
        confirmNoBtn.onclick = null;
        customConfirmModal.onclick = null;
        
        confirmYesBtn.onclick = () => {
            customConfirmModal.style.display = 'none';
            callback(true);
        };
        
        confirmNoBtn.onclick = () => {
            customConfirmModal.style.display = 'none';
            callback(false);
        };

        customConfirmModal.onclick = (e) => {
            if (e.target === customConfirmModal) {
                customConfirmModal.style.display = 'none';
                callback(false);
            }
        };
    }

    function goToHome() {
        showCustomConfirm("Yakin ingin kembali ke Beranda?", (result) => {
            if (result) {
                try { bgMusic.pause(); bgMusic.currentTime = 0; } catch (e) {}
                window.location.href = 'index.html'; 
            }
        });
    }

    // --- 4. FUNGSI GAME & LOGIKA UTAMA ---

    function updateScore() {
        scoreDisplay.textContent = `Skor ${playerName}: ${currentScore} 🌟`;
    }

    function clearBoard() {
        allBoxInputs.forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'wrong');
            input.disabled = false;
        });
    }

    function startGame() {
        playerName = playerNameInput.value.trim();
        if (playerName === "") {
            alert("Harap masukkan namamu terlebih dahulu!");
            return;
        }

        nameInputContainer.style.display = 'none';
        gameBoard.style.display = 'flex';
        
        currentScore = 0;
        availableChallenges = [...allChallenges]; // Copy semua soal ke soal yang tersedia
        updateScore();
        clearBoard();
        
        challengeQuestion.innerHTML = `Selamat datang, <strong>${playerName}</strong>! Klik 🎲 Kubus Soal untuk memulai!`;
        challengeDisplay.style.backgroundColor = '#fffacd';
        kubusSoal.style.display = 'flex'; // Pastikan Kubus Soal terlihat

        try { bgMusic.volume = 0.3; bgMusic.play(); } catch (e) {}
    }
    
    function finishGame() {
        try { bgMusic.pause(); bgMusic.currentTime = 0; } catch (e) {}
        
        clearBoard();
        kubusSoal.style.display = 'none';
        checkAnswerBtn.style.display = 'none';
        
        challengeQuestion.innerHTML = `
            <h2>🏆 PERMAINAN SELESAI, ${playerName.toUpperCase()}! 🏆</h2>
            <p>Kamu telah menyelesaikan semua **${allChallenges.length}** tantangan.</p>
            <p>Skor Akhirmu adalah: <strong>${currentScore}</strong> dari ${allChallenges.length} soal!</p>
            <p>Kerja bagus! Klik **Beranda** untuk mulai lagi.</p>
        `;
        challengeDisplay.style.backgroundColor = '#b3e0ff'; 
    }


    function showChallenge() {
        if (availableChallenges.length === 0) {
            finishGame();
            return;
        }
        
        const qIndex = Math.floor(Math.random() * availableChallenges.length);
        // Ambil soal dan hapus dari array yang tersedia agar tidak diulang
        currentChallenge = availableChallenges.splice(qIndex, 1)[0]; 

        const title = document.getElementById('challenge-title');
        title.textContent = `📜 Tantangan ${currentChallenge.type}! (Soal ke ${allChallenges.length - availableChallenges.length} dari ${allChallenges.length})`;

        challengeQuestion.innerHTML = `<strong>${currentChallenge.question}</strong>`;
        checkAnswerBtn.style.display = 'inline-block';
        challengeDisplay.style.backgroundColor = '#fffacd';
        
        clearBoard();

        // Mengatur Suku Pertama (a) dan Beda (b) yang sudah diketahui
        allBoxInputs.forEach(input => {
            // Jika U1 sudah diketahui dan BUKAN target
            if (input.id === 'U1' && !currentChallenge.target.includes('U1')) {
                input.value = currentChallenge.a;
                input.disabled = true;
            } 
            
            // Jika Beda (B1-B4) sudah diketahui dan BUKAN target
            if (input.classList.contains('diff-box') && !currentChallenge.target.some(t => t.startsWith('B')) ) {
                const bValue = currentChallenge.b;
                // Mengisi semua kotak Beda dengan nilai yang diketahui
                document.getElementById('B1').value = bValue;
                document.getElementById('B2').value = bValue;
                document.getElementById('B3').value = bValue;
                document.getElementById('B4').value = bValue;
                
                // Menonaktifkan semua kotak Beda
                document.querySelectorAll('.diff-box').forEach(bInput => bInput.disabled = true);
            }
        });
    }

    // FUNGSI INTI VALIDASI JAWABAN
    function checkAnswer() {
        if (!currentChallenge) {
            alert("Silakan klik Kubus Soal dulu!");
            return;
        }

        let allTargetCorrect = true;
        const checkedBedaIds = []; // Untuk melacak ID Beda yang sudah diperiksa

        currentChallenge.target.forEach(targetId => {
            const inputElement = document.getElementById(targetId);
            const expectedValue = currentChallenge.answer[targetId]; 
            const inputValue = parseInt(inputElement.value); 
            
            let isCurrentCorrect = false;

            if (targetId.startsWith('B')) {
                // --- LOGIKA VALIDASI BEDA (B) ---
                if (checkedBedaIds.includes('B1')) return; // Hindari cek Beda berulang

                const bedaInput = document.getElementById('B1');
                const bedaValue = parseInt(bedaInput.value);
                
                if (bedaValue === expectedValue) {
                    isCurrentCorrect = true;
                    // Warnai SEMUA kotak beda (B1-B4) yang TIDAK disabled
                    document.querySelectorAll('.diff-box').forEach(i => {
                        if (!i.disabled) {
                            i.classList.add('correct');
                            i.classList.remove('wrong');
                        }
                    });
                } else {
                    // Warnai SEMUA kotak beda (B1-B4) yang TIDAK disabled
                    document.querySelectorAll('.diff-box').forEach(i => {
                        if (!i.disabled) {
                            i.classList.add('wrong');
                            i.classList.remove('correct');
                        }
                    });
                    allTargetCorrect = false;
                }
                checkedBedaIds.push('B1'); // Tandai bahwa Beda sudah di cek
                
            } else {
                // --- LOGIKA VALIDASI SUKU (U) ---
                if (inputValue === expectedValue) {
                    isCurrentCorrect = true;
                    inputElement.classList.add('correct');
                    inputElement.classList.remove('wrong');
                } else {
                    inputElement.classList.add('wrong');
                    inputElement.classList.remove('correct');
                    allTargetCorrect = false;
                }
            }
            
            // Perbarui status global allTargetCorrect jika ada kesalahan pada suku yang diminta
            if (!targetId.startsWith('B') && !isCurrentCorrect) {
                 allTargetCorrect = false;
            }
        });
        
        // --- Feedback dan Lanjutan ---
        if (allTargetCorrect) {
            currentScore++;
            updateScore();
            try { correctSound.play(); } catch (e) {}
            spawnConfetti();
            
            // Cek apakah game selesai
            if (availableChallenges.length === 0) {
                 finishGame(); 
            } else {
                challengeQuestion.innerHTML = `<strong>🎉 LUAR BIASA ${playerName}!</strong> Semua jawabanmu benar! Skor +1. Ambil Tantangan Baru!`;
                challengeDisplay.style.backgroundColor = '#a5d6a7'; 
                checkAnswerBtn.style.display = 'none';
                allBoxInputs.forEach(input => input.disabled = true);
            }

        } else {
            try { failSound.play(); } catch (e) {}
            challengeQuestion.innerHTML = `<strong>❌ Jawaban Anda Belum Sempurna!`;
            challengeDisplay.style.backgroundColor = '#ffcdd2'; 
        }
    }

    function showInfoBeda() {
        alert("Beda (b) pada barisan aritmetika adalah hasil pengurangan antara suku ke-n dengan suku sebelumnya ($U_n - U_{n-1}$). \n\nRumus Suku ke-n: $U_n = a + (n-1)b$\n\nRumus Deret (Jumlah n suku pertama): $S_n = \\frac{n}{2} (a + U_n)$ ATAU $S_n = \\frac{n}{2} (2a + (n-1)b)$");
    }

    function spawnConfetti(){
        for(let i=0;i<30;i++){
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
            confetti.style.left = Math.random()*window.innerWidth + 'px';
            confetti.style.animationDuration = 1 + Math.random()*2 + 's';
            document.body.appendChild(confetti);
        }
        setTimeout(()=>{ document.querySelectorAll('.confetti').forEach(c=>c.remove()); }, 3000);
    }
    
    function resetGame() {
        currentScore = 0;
        availableChallenges = [...allChallenges]; // Isi ulang soal
        updateScore();
        clearBoard();
        challengeQuestion.innerHTML = `Papan di-reset. Ambil tantangan baru dari Kubus Soal!`;
        checkAnswerBtn.style.display = 'none';
        challengeDisplay.style.backgroundColor = '#fffacd';
        currentChallenge = null;
        kubusSoal.style.display = 'flex'; // Tampilkan lagi Kubus Soal
    }

    // --- 5. LISTENERS ---
    
    submitNameBtn.addEventListener('click', startGame);
    
    resetBtn.addEventListener('click', () => { 
        showCustomConfirm("Yakin ingin mereset papan dan skor?", (result) => {
            if (result) resetGame();
        });
    });
    
    homeBtnStart.addEventListener('click', goToHome); 
    homeBtnGame.addEventListener('click', goToHome);  
    
    kubusSoal.addEventListener('click', showChallenge);
    checkAnswerBtn.addEventListener('click', checkAnswer);
    kubusGulungan.addEventListener('click', showInfoBeda);
});