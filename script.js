// ========================================
// Model Portfolio 사진 목록
// ========================================

const portfolioData = [
    {
        image: "model-01.jpg"
    },
    {
        image: "model-02.jpg"
    },
    {
        image: "model-03.jpg"
    },
    {
        image: "model-04.jpg"
    },
    {
        image: "model-05.jpg"
    },
    {
        image: "model-06.jpg"
    },
    {
        image: "model-07.jpg"
    },
    {
        image: "model-08.jpg"
    },
    {
        image: "model-09.jpg"
    },
    {
        image: "model-10.jpg"
    },
    {
        image: "model-11.jpg"
    },
    {
        image: "model-12.jpg"
    },
    {
        image: "model-13.jpg"
    },
    {
        image: "model-14.jpg"
    },
    {
        image: "model-15.jpg"
    },
    {
        image: "model-16.jpg"
    },
    {
        image: "model-17.jpg"
    },
    {
        image: "model-18.jpg"
    },
    {
        image: "model-19.jpg"
    },
    {
        image: "model-20.jpg"
    },
    {
        image: "model-21.jpg"
    },
    {
        image: "model-22.jpg"
    },
    {
        image: "model-23.jpg"
    },
    {
        image: "model-24.jpg"
    },
    {
        image: "model-25.jpg"
    },
    {
        image: "model-26.jpg"
    },
    {
        image: "model-27.jpg"
    },
    {
        image: "model-28.jpg"
    },
    {
        image: "model-29.jpg"
    },
    {
        image: "model-30.jpg"
    },
    {
        image: "model-31.jpg"
    },
    {
        image: "model-32.jpg"
    },
    {
        image: "model-33.jpg"
    },
    {
        image: "model-34.jpg"
    }
];


// ========================================
// 갤러리 자동 생성
// ========================================

const modelGallery = document.querySelector('.model-gallery');

portfolioData.forEach(function (item, index) {

    const modelItem = document.createElement('div');

    modelItem.className = 'model-item';


    const image = document.createElement('img');

    image.src = item.image;

    image.alt = `Model Portfolio ${String(index + 1).padStart(2, '0')}`;


    modelItem.appendChild(image);

    modelGallery.appendChild(modelItem);

});


// ========================================
// 사진 상세 화면
// ========================================

const galleryImages = document.querySelectorAll('.model-item img');

const photoModal = document.querySelector('.photo-modal');
const photoDetail = document.querySelector('.photo-detail');
const photoModalImage = document.querySelector('.photo-detail-image img');

const photoModalClose = document.querySelector('.photo-modal-close');


// 사진 클릭
galleryImages.forEach(function (image) {

    image.addEventListener('click', function () {

        photoModalImage.src = image.src;

        photoModalImage.alt = image.alt;


        // 클릭한 사진의 화면 위치
        const imageRect = image.getBoundingClientRect();


        // 상세창을 먼저 화면에 표시
        photoModal.style.display = 'flex';


        // 상세창의 현재 위치와 크기
        const detailRect = photoDetail.getBoundingClientRect();


        // 클릭한 사진의 중심점
        const imageCenterX =
            imageRect.left + imageRect.width / 2;

        const imageCenterY =
            imageRect.top + imageRect.height / 2;


        // 상세창의 중심점
        const detailCenterX =
            detailRect.left + detailRect.width / 2;

        const detailCenterY =
            detailRect.top + detailRect.height / 2;


        // 사진 중심 → 상세창 중심까지의 이동 거리
        const startX =
            imageCenterX - detailCenterX;

        const startY =
            imageCenterY - detailCenterY;


        // 사진 크기에 맞춰 상세창이 작게 시작하도록 계산
        const scaleX =
            imageRect.width / detailRect.width;

        const scaleY =
            imageRect.height / detailRect.height;

        const startScale =
            Math.min(scaleX, scaleY);


        // CSS에 시작 위치와 크기 전달
        photoModal.style.setProperty(
            '--photo-start-x',
            `${startX}px`
        );

        photoModal.style.setProperty(
            '--photo-start-y',
            `${startY}px`
        );

        photoModal.style.setProperty(
            '--photo-start-scale',
            startScale
        );


        // 애니메이션 시작
        photoModal.classList.remove('active');

        void photoModal.offsetWidth;

        photoModal.classList.add('active');

    });

});


// X 버튼 클릭
photoModalClose.addEventListener('click', function () {

    photoModal.classList.remove('active');

    photoModal.style.display = 'none';

});


// 상세 화면 바깥쪽 클릭
photoModal.addEventListener('click', function (event) {

    if (event.target === photoModal) {

        photoModal.classList.remove('active');

        photoModal.style.display = 'none';

    }

});


// ESC 키로 닫기
document.addEventListener('keydown', function (event) {

    if (event.key === 'Escape') {

        photoModal.classList.remove('active');

        photoModal.style.display = 'none';

    }

});
// ========================================
// 사진 자동 흐름 + 직접 스크롤
// ========================================

const galleryViewport =
    document.querySelector('.model-gallery-viewport');

let galleryPosition = 0;

let lastTime = null;

let galleryAutoPlay = true;


// ========================================
// 사진 흐름 속도
// 숫자가 클수록 빠름
// ========================================

const gallerySpeed = 20;


// ========================================
// 자동 재생 재시작 시간
// 2000 = 2초
// ========================================

const galleryRestartDelay = 2000;

let galleryRestartTimer = null;


// ========================================
// 자동 이동
// ========================================

function moveGallery(currentTime) {

    if (lastTime === null) {

        lastTime = currentTime;

    }


    const deltaTime =
        (currentTime - lastTime) / 1000;

    lastTime = currentTime;


    // 자동 재생 중일 때만 이동
    if (galleryAutoPlay) {

        galleryPosition -=
            gallerySpeed * deltaTime;


        modelGallery.style.transform =
            `translateY(${galleryPosition}px)`;

    }


    requestAnimationFrame(moveGallery);

}


requestAnimationFrame(moveGallery);


// ========================================
// 자동 재생 재시작 타이머
// ========================================

function restartGalleryAutoPlay() {

    // 기존 타이머가 있다면 취소
    clearTimeout(galleryRestartTimer);


    // 2초 후 자동 재생
    galleryRestartTimer = setTimeout(function () {

        galleryAutoPlay = true;

    }, galleryRestartDelay);

}


// ========================================
// 마우스 휠로 직접 움직이기
// ========================================

galleryViewport.addEventListener(
    'wheel',
    function (event) {

        // 자동 흐름 정지
        galleryAutoPlay = false;


        // 사용자가 움직일 때마다
        // 2초 타이머를 다시 시작
        restartGalleryAutoPlay();


        // 마우스 휠 방향에 따라 갤러리 이동
        galleryPosition -= event.deltaY;

if (galleryPosition > 80) {
    galleryPosition = 80;
}


        modelGallery.style.transform =
            `translateY(${galleryPosition}px)`;


        // 페이지 자체가 스크롤되지 않도록 함
        event.preventDefault();

    },
    { passive: false }
);