// 캔버스 가져오기
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 기본 설정
let baseAmplitude = 10;  // 기본 진폭 (작은 파형)
let touchAmplitude = 50; // 터치 시 증가할 진폭
const baseFrequency = 0.02; // 기본 주파수
const touchFrequency = 0.1; // 터치 시 증가할 주파수

let time = 0; // 애니메이션 시간

// 터치 정보
let touchX = null;
let touchY = null;

// 터치 이벤트 감지
canvas.addEventListener("pointerdown", (event) => {
    touchX = event.clientX;
    touchY = event.clientY;
});

canvas.addEventListener("pointerup", () => {
    touchX = null; // 터치 해제 시 초기화
});

// 파형 그리기 함수
function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.strokeStyle = "cyan"; // 파형 색상
    ctx.lineWidth = 2;

    for (let x = 0; x < canvas.width; x += 5) {
        // 터치한 위치와의 거리 계산
        let distance = touchX !== null ? Math.abs(x - touchX) : Infinity;
        
        // 터치 반경 50px 내일 때 주파수와 진폭 증가
        let frequency = distance < 50 ? touchFrequency : baseFrequency;
        let amplitude = distance < 50 ? touchAmplitude : baseAmplitude;

        // 사인파 계산
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
