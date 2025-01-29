// 캔버스 가져오기
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 기본 파형 설정
let amplitude = 0;  // 진폭 (기본적으로 0, 클릭하면 커짐)
const frequency = 0.05; // 주파수
let time = 0; // 시간 (파형을 움직이게 함)

// 터치하면 진폭 증가
canvas.addEventListener("pointerdown", () => {
    amplitude = 50; // 클릭 시 진폭 증가
});

// 터치 해제 시 진폭 감소
canvas.addEventListener("pointerup", () => {
    amplitude = 0; // 클릭 해제 시 진폭 감소
});

// 파형 그리기 함수
function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.strokeStyle = "cyan"; // 파형 색상
    ctx.lineWidth = 2;

    for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * frequency + time) * amplitude;
        ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.closePath();

    time += 0.1; // 파형 움직이기
    requestAnimationFrame(drawWave);
}

// 애니메이션 시작
drawWave();

// 창 크기 변경 시 캔버스 크기 조정
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
