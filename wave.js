// 캔버스 요소 가져오기
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

// 화면 크기에 맞게 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 파형 데이터 저장할 배열
let waves = [];

// 터치할 때 파형 추가
canvas.addEventListener("pointerdown", (event) => {
    const { clientX, clientY } = event;
    waves.push({ x: clientX, y: clientY, radius: 0, opacity: 1 });
});

// 파형을 그리는 함수
function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < waves.length; i++) {
        let wave = waves[i];

        // 원 그리기
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 150, 255, ${wave.opacity})`; // 파란색 파형
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // 파형 확장 효과
        wave.radius += 3;      // 원 크기 증가
        wave.opacity -= 0.02;  // 점점 투명해짐

        // 완전히 사라지면 배열에서 제거
        if (wave.opacity <= 0) {
            waves.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(drawWaves); // 애니메이션 실행
}

// 애니메이션 실행
drawWaves();

// 창 크기 변경 시 캔버스 크기 조정
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
