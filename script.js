// 탭 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.btn_menu');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // 로고 클릭 시 페이지 상단으로 스크롤
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 링크 공유 팝업 관련 요소
    const shareButton = document.getElementById('shareButton');
    const sharePopup = document.getElementById('sharePopup');
    const closePopupButton = document.getElementById('closePopup');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const shareLinkInput = document.getElementById('shareLink');
    
    // 팝업 열기
    shareButton.addEventListener('click', function() {
        sharePopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    });
    
    // 팝업 닫기
    closePopupButton.addEventListener('click', function() {
        sharePopup.classList.remove('active');
        document.body.style.overflow = ''; // 배경 스크롤 허용
    });
    
    // 배경 클릭 시 팝업 닫기
    sharePopup.addEventListener('click', function(e) {
        if (e.target === sharePopup) {
            sharePopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 링크 복사 기능
    copyLinkButton.addEventListener('click', function() {
        // 텍스트를 클립보드에 복사
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = 'brocoly.kr';
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        
        // 복사 성공 메시지
        const buttonLabel = copyLinkButton.querySelector('h4');
        const originalText = buttonLabel.textContent;
        buttonLabel.textContent = '복사 완료';
        copyLinkButton.classList.add('copied');
        
        setTimeout(() => {
            buttonLabel.textContent = originalText;
            copyLinkButton.classList.remove('copied');
        }, 2000);
    });
    
    tabButtons.forEach(button => {
        // 클릭 이벤트 처리
        button.addEventListener('click', function(e) {
            handleTabActivation(this);
        });
    });
    
    // 탭 활성화 함수
    function handleTabActivation(button) {
        // 모든 탭 버튼에서 active 클래스 제거
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 클릭한 버튼에 active 클래스 추가
        button.classList.add('active');
        
        // 모든 탭 콘텐츠 숨기기
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // 클릭한 탭에 해당하는 콘텐츠 표시
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }
    
    // 히어로 섹션 애니메이션 구현
    
    // 2. 타이틀 애니메이션
    const titleLine1 = document.querySelector('.hero-section h1 .line1');
    const titleLine2 = document.querySelector('.hero-section h1 .line2');
    
    setTimeout(() => {
        document.querySelector('.hero-section h1').style.opacity = '1';
    }, 100);
    
    // 3. 사용자 수 카운트 애니메이션
    const userCountElement = document.getElementById('userCount');
    const startCount = 740;
    const endCount = 892;
    const duration = 5000; // 5초
    const frameRate = 60;
    const totalFrames = duration / 1000 * frameRate;
    
    let currentFrame = 0;
    
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    function animateCount() {
        if (currentFrame <= totalFrames) {
            const progress = easeOutExpo(currentFrame / totalFrames);
            const currentCount = Math.floor(startCount + (endCount - startCount) * progress);
            userCountElement.textContent = currentCount;
            currentFrame++;
            requestAnimationFrame(animateCount);
        } else {
            userCountElement.textContent = endCount;
        }
    }
    
    // 카운트 애니메이션 시작
    animateCount();
    
    // 카드 갤러리 무한 스크롤 최적화
    const cardGallery = document.querySelector('.card-gallery-container');
    const cards = document.querySelectorAll('.card');
    
    // 모든 카드가 로드된 후 스크롤 시작
    let loadedImages = 0;
    const totalImages = cards.length;
    
    cards.forEach(card => {
        if (card.complete) {
            imageLoaded();
        } else {
            card.addEventListener('load', imageLoaded);
            card.addEventListener('error', imageLoaded);
        }
    });
    
    function imageLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
            setupInfiniteScroll();
        }
    }
    
    function setupInfiniteScroll() {
        // 카드 컨테이너 복제 - 더 부드러운 무한 스크롤을 위해
        const originalCards = document.querySelectorAll('.card-gallery-container > img:nth-child(-n+6)');
        const cloneContainer = document.createDocumentFragment();
        
        // 원본 카드 복제하여 더 부드러운 무한 스크롤 구현
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            cloneContainer.appendChild(clone);
        });
        
        cardGallery.appendChild(cloneContainer);
        
        // 카드 너비 계산 및 애니메이션 최적화
        const cardWidth = cards[0].offsetWidth;
        const cardMargin = 10; // gap 값
        const totalCardWidth = cardWidth + cardMargin;
        
        // 더 긴 애니메이션 시간으로 부드러운 흐름 구현
        cardGallery.style.animationDuration = '120s';
        cardGallery.style.animationTimingFunction = 'linear';
    }
    
    // 화면 크기 변경에도 애니메이션 유지
    window.addEventListener('resize', () => {
        if (loadedImages === totalImages) {
            // 스크롤 속도 유지
            cardGallery.style.animationDuration = '120s'; 
        }
    });
    
    // 파티 섹션 프로필 버블 효과 구현
    const profileGallery = document.getElementById('profileGallery');
    const profileImages = [
        'assets/profile1.png', 'assets/profile2.png', 'assets/profile3.png', 
        'assets/profile4.png', 'assets/profile5.png', 'assets/profile6.png', 
        'assets/profile7.png', 'assets/profile8.png', 'assets/profile9.png', 
        'assets/profile10.png'
    ];
    
    // 프로필 버블 위치 데이터
    const bubbles = [];
    let rotationAngle = 0;
    
    // 프로필 버블 생성
    function createProfileBubbles() {
        const galleryRect = profileGallery.getBoundingClientRect();
        const galleryWidth = galleryRect.width;
        const galleryHeight = 400;
        
        // 프로필 갤러리 크기 설정 및 3D 효과 적용
        profileGallery.style.height = `${galleryHeight}px`;
        profileGallery.style.perspective = '1000px';
        profileGallery.style.transformStyle = 'preserve-3d';
        
        // 중앙 위치 계산
        const centerX = galleryWidth / 2;
        const centerY = galleryHeight / 2;
        
        // 타원형 배치를 위한 반경 - x축은 더 넓게, y축은 조금 좁게
        const radiusX = Math.min(galleryWidth, galleryHeight) * 0.5;
        const radiusY = Math.min(galleryWidth, galleryHeight) * 0.3;
        
        // 버블 생성
        for (let i = 0; i < profileImages.length; i++) {
            // 원형 배치를 위한 각도 계산 (시계 방향)
            const angle = (i / profileImages.length) * Math.PI * 2;
            
            // 프로필 크기 랜덤 (60-100 사이로 변경)
            const size = Math.floor(Math.random() * 40) + 60;
            
            // 버블 위치 계산 (타원형 배치)
            const x = centerX + Math.cos(angle) * radiusX - size / 2;
            const y = centerY + Math.sin(angle) * radiusY - size / 2;
            
            // 버블 객체 생성
            const bubble = {
                id: `profile-${i}`,
                angle,
                radiusX,
                radiusY,
                size,
                x,
                y,
                centerX,
                centerY,
                image: profileImages[i],
                bounceOffset: 0,
                bounceSpeed: 0.03 + Math.random() * 0.02, // 튀는 속도 (각 프로필마다 다름)
                bounceTime: Math.random() * Math.PI * 2 // 시작 위치 랜덤화
            };
            
            bubbles.push(bubble);
            
            // 버블 요소 생성
            const bubbleElement = document.createElement('img');
            bubbleElement.src = bubble.image;
            bubbleElement.alt = `프로필 ${i+1}`;
            bubbleElement.id = bubble.id;
            bubbleElement.className = 'profile-bubble';
            bubbleElement.style.width = `${bubble.size}px`;
            bubbleElement.style.height = `${bubble.size}px`;
            bubbleElement.style.left = `${bubble.x}px`;
            bubbleElement.style.top = `${bubble.y}px`;
            
            profileGallery.appendChild(bubbleElement);
        }
    }
    
    // 프로필 버블 초기화 및 애니메이션 시작
    if (profileGallery) {
        createProfileBubbles();
        
        // 콘페티 효과 설정
        const confettiColors = ['#FFD700', '#FF6347', '#4682B4', '#32CD32', '#FF69B4', '#9370DB'];
        const confettiEmojis = ['🍰', '🎂', '🎈', '💕', '🎉', '🎊']; // 이모지 추가
        const confettiParticles = [];
        let confettiTimer = null;
        const MAX_PARTICLES = 50; // 최대 파티클 수 제한 (120 -> 50)
        
        // 콘페티 파티클 생성 함수
        function createConfetti(x, y, count = 5) {
            // 최대 파티클 개수 체크 - 제한 초과하면 일부만 생성
            const spaceAvailable = MAX_PARTICLES - confettiParticles.length;
            if (spaceAvailable <= 0) return; // 최대치 도달 시 생성 중단
            
            const actualCount = Math.min(count, spaceAvailable);
            
            // 도형 콘페티 생성
            for (let i = 0; i < actualCount; i++) {
                // 이모지 비율 50% 확률
                if (Math.random() < 0.5) {
                    const particle = document.createElement('div');
                    particle.className = 'confetti-emoji';
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    particle.style.position = 'absolute';
                    particle.style.fontSize = '80px'; // 80px 고정 크기
                    particle.style.zIndex = '999';
                    particle.style.transform = 'translate(-50%, -50%)';
                    particle.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
                    
                    // 파티클 속성 설정 - 각도를 위쪽 방향(-30~+30도)으로 제한
                    const angle = (Math.random() * 60 - 30) * Math.PI / 180 - Math.PI/2; // -30~+30도 범위를 라디안으로 변환, -90도 기준점 조정
                    const speed = Math.random() * 3 + 2; // 속도 유지
                    const lifespan = Math.random() * 800 + 500; // 수명 유지
                    const timestamp = Date.now();
                    const rotationSpeed = Math.random() * 12 - 6; // 회전 속도
                    
                    // 파티클 객체로 저장
                    confettiParticles.push({
                        element: particle,
                        angle: angle,
                        speed: speed,
                        x: x,
                        y: y,
                        lifespan: lifespan,
                        timestamp: timestamp,
                        gravity: 0.05, // 중력 유지
                        opacity: 1,
                        rotationSpeed: rotationSpeed,
                        isEmoji: true
                    });
                    
                    profileGallery.appendChild(particle);
                } else {
                    // 기존 도형 콘페티
                    const particle = document.createElement('div');
                    particle.className = 'confetti-particle';
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    particle.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                    particle.style.width = '20px'; // 20px 고정 크기
                    particle.style.height = '20px'; // 20px 고정 크기
                    particle.style.position = 'absolute';
                    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    particle.style.zIndex = '999';
                    particle.style.transform = 'translate(-50%, -50%)';
                    
                    // 파티클 속성 설정 - 각도를 위쪽 방향(-30~+30도)으로 제한
                    const angle = (Math.random() * 60 - 30) * Math.PI / 180 - Math.PI/2; // -30~+30도 범위를 라디안으로 변환, -90도 기준점 조정
                    const speed = Math.random() * 3 + 2; // 속도 유지
                    const lifespan = Math.random() * 600 + 400; // 수명 유지
                    const timestamp = Date.now();
                    
                    // 파티클 객체로 저장
                    confettiParticles.push({
                        element: particle,
                        angle: angle,
                        speed: speed,
                        x: x,
                        y: y,
                        lifespan: lifespan,
                        timestamp: timestamp,
                        gravity: 0.07, // 중력 유지
                        opacity: 1,
                        isEmoji: false
                    });
                    
                    profileGallery.appendChild(particle);
                }
            }
        }
        
        // 콘페티 파티클 업데이트 함수
        function updateConfetti() {
            const now = Date.now();
            let activeParticles = 0;
            
            for (let i = confettiParticles.length - 1; i >= 0; i--) {
                const particle = confettiParticles[i];
                const age = now - particle.timestamp;
                
                if (age > particle.lifespan) {
                    // 수명이 다한 파티클 제거
                    particle.element.remove();
                    confettiParticles.splice(i, 1);
                    continue;
                }
                
                activeParticles++;
                
                // 위치 업데이트
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed + particle.gravity;
                particle.gravity += 0.02; // 중력 증가 가속화 (0.01 -> 0.02)
                
                // 투명도 감소 (더 빠르게 사라짐)
                particle.opacity = 1 - (age / particle.lifespan) * 1.2; // 투명도 감소 속도 증가
                if (particle.opacity < 0) particle.opacity = 0;
                
                // 파티클 위치 및 스타일 업데이트
                particle.element.style.left = `${particle.x}px`;
                particle.element.style.top = `${particle.y}px`;
                particle.element.style.opacity = particle.opacity;
                
                // 이모지와 일반 파티클의 회전 효과 다르게 적용
                if (particle.isEmoji) {
                    particle.element.style.transform = `translate(-50%, -50%) rotate(${age * particle.rotationSpeed * 0.02}deg)`; // 회전 속도 증가
                } else {
                    particle.element.style.transform = `translate(-50%, -50%) rotate(${age * 0.3}deg)`; // 회전 속도 증가 (0.2 -> 0.3)
                }
            }
            
            // 콘페티 애니메이션 지속
            requestAnimationFrame(updateConfetti);
        }
        
        // 프로필 버블 애니메이션 업데이트 함수
        function updateProfileAnimation() {
            // 회전 각도 업데이트
            rotationAngle += 0.005; // 회전 속도
            
            // 3D 효과를 위한 타원 회전
            profileGallery.style.transform = `rotateX(15deg)`;
            
            bubbles.forEach(bubble => {
                // 튀는 효과 계산 (사인파 이용)
                bubble.bounceTime += bubble.bounceSpeed;
                const bounceHeight = (bubble.size / 8); // 튀는 높이
                bubble.bounceOffset = Math.sin(bubble.bounceTime) * bounceHeight;
                
                // 회전 위치 계산 (타원 궤도)
                const newAngle = bubble.angle + rotationAngle;
                const newX = bubble.centerX + Math.cos(newAngle) * bubble.radiusX - bubble.size / 2;
                const newY = bubble.centerY + Math.sin(newAngle) * bubble.radiusY - bubble.size / 2 + bubble.bounceOffset;
                
                // Z 위치 계산 (3D 효과)
                const zPosition = Math.sin(newAngle) * 100; // -100 ~ 100 사이의 Z 위치
                
                // 요소 위치 및 3D 효과 업데이트
                const element = document.getElementById(bubble.id);
                element.style.left = `${newX}px`;
                element.style.top = `${newY}px`;
                
                // 3D 효과: 앞/뒤 프로필 크기, 투명도, z-index 차별화
                const scaleFactor = 0.8 + 0.2 * ((Math.sin(newAngle) + 1) / 2); // 0.8~1 사이의 크기 조정
                
                // 원근감 표현 - 뒤는 작게, 앞은 크게, Z축 회전
                element.style.transform = `translateZ(${zPosition}px) scale(${scaleFactor})`;
                element.style.opacity = 1; // 투명도 효과 제거 (항상 1)
                element.style.zIndex = Math.round(100 + zPosition); // Z값에 따라 z-index 설정
            });
            
            // 애니메이션 지속
            requestAnimationFrame(updateProfileAnimation);
        }
        
        // 윈도우 리사이즈 시 버블 위치 재조정
        window.addEventListener('resize', () => {
            // 기존 버블 요소 제거
            profileGallery.innerHTML = '';
            bubbles.length = 0;
            
            // 버블 재생성
            createProfileBubbles();
            
            // 중앙 위치 계산
            const galleryRect = profileGallery.getBoundingClientRect();
            const centerX = galleryRect.width / 2;
            const centerY = galleryRect.height / 2;
            
            // 타이머 재설정
            if (confettiTimer) {
                clearInterval(confettiTimer);
            }
            
            // 새 타이머 설정
            confettiTimer = setInterval(() => {
                createConfetti(centerX, centerY, 6);
            }, 400); // 0.4초마다 콘페티 생성 (0.8 -> 0.4)
        });
        
        // 프로필 애니메이션 시작
        updateProfileAnimation();
        
        // 콘페티 애니메이션 시작
        updateConfetti();
        
        // 중앙 위치 계산
        const galleryRect = profileGallery.getBoundingClientRect();
        const centerX = galleryRect.width / 2;
        const centerY = galleryRect.height / 2;
        
        // 초기 콘페티 효과
        createConfetti(centerX, centerY, 20);
        
        // 주기적으로 콘페티 생성 (간격 줄임)
        confettiTimer = setInterval(() => {
            createConfetti(centerX, centerY, 6);
        }, 400); // 0.4초마다 콘페티 생성 (0.8 -> 0.4)
    }

    // 스크롤에 따라 움직이는 얼굴 이미지 구현
    const floatingFace = document.getElementById('floatingFace');
    const faceImg = floatingFace.querySelector('img');
    
    // 섹션별 요소 가져오기
    const heroSection = document.querySelector('.hero-section');
    const contentSection = document.querySelector('.content-section');
    const featureSection = document.querySelector('.feature-section');
    const planSection = document.querySelector('.plan-section');
    // const partySection = document.querySelector('.party-section');
    const footerSection = document.querySelector('.footer-section');
    
    // 초기 위치 설정 (히어로 섹션)
    updateFloatingFacePosition();
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', updateFloatingFacePosition);
    window.addEventListener('resize', updateFloatingFacePosition);
    
    function updateFloatingFacePosition() {
        const scrollPosition = window.scrollY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // 기본 이미지 크기 (height 200px 기준)
        const defaultHeight = 200;
        // 모바일용 이미지 크기
        const mobileHeight = 120;
        
        // 각 섹션의 위치 계산
        const heroTop = heroSection.offsetTop;
        const contentTop = contentSection.offsetTop;
        const featureTop = featureSection.offsetTop;
        const planTop = planSection.offsetTop;
        // const partyTop = partySection.offsetTop;
        const footerTop = footerSection.offsetTop;
        
        // 현재 활성화된 섹션 결정 (60% 기준으로 변경)
        let currentSection;
        
        if (scrollPosition >= footerTop - windowHeight * 0.6) {
            currentSection = 'footer';
        } else if (scrollPosition >= planTop - windowHeight * 0.6) {
            currentSection = 'plan';
        } else if (scrollPosition >= featureTop - windowHeight * 0.6) {
            currentSection = 'feature';
        } else if (scrollPosition >= contentTop - windowHeight * 0.6) {
            currentSection = 'content';
        } else {
            currentSection = 'hero';
        }
        
        // 모바일 여부 확인
        const isMobile = window.innerWidth <= 768;
        
        // 섹션별 위치 및 스타일 설정
        switch (currentSection) {
            case 'hero':
                // 히어로섹션: face1.png 사용
                faceImg.src = 'assets/face1.png';
                
                if (isMobile) {
                    floatingFace.style.left = `${windowWidth * 0.25}px`;
                    floatingFace.style.top = `${windowHeight * 0.85}px`;
                    faceImg.style.height = `${mobileHeight}px`;
                } else {
                    floatingFace.style.left = `${windowWidth * 0.35}px`;
                    floatingFace.style.top = `${windowHeight * 0.75}px`;
                    faceImg.style.height = `${defaultHeight}px`;
                }
                
                faceImg.style.width = 'auto';
                faceImg.style.transform = 'scale(1)';
                floatingFace.style.transform = 'translate(0, 0)';
                break;
                
            case 'content':
                // 콘텐츠 섹션: face2.png 사용
                faceImg.src = 'assets/face2.png';
                
                if (isMobile) {
                    floatingFace.style.left = `${windowWidth * 0.85}px`;
                    floatingFace.style.top = `${windowHeight * 0.85}px`;
                    faceImg.style.height = `${mobileHeight}px`;
                } else {
                    floatingFace.style.left = `${windowWidth * 0.65}px`;
                    floatingFace.style.top = `${windowHeight * 0.6}px`;
                    faceImg.style.height = `${defaultHeight}px`;
                }
                
                faceImg.style.width = 'auto';
                faceImg.style.transform = 'scale(1)';
                floatingFace.style.transform = 'translate(0, 0)';
                break;
                
            case 'feature':
                // 기능섹션: face3.png 사용
                faceImg.src = 'assets/face3.png';
                
                if (isMobile) {
                    floatingFace.style.left = `${windowWidth * 0.30}px`;
                    floatingFace.style.top = `${windowHeight * 0.85}px`;
                    faceImg.style.height = `${mobileHeight}px`;
                } else {
                    floatingFace.style.left = `${windowWidth * 0.35}px`;
                    floatingFace.style.top = `${windowHeight * 0.65}px`;
                    faceImg.style.height = `${defaultHeight}px`;
                }
                
                faceImg.style.width = 'auto';
                faceImg.style.transform = 'scale(1)';
                floatingFace.style.transform = 'translate(0, 0)';
                break;
                
            case 'plan':
                // 플랜섹션: face4.png 사용
                faceImg.src = 'assets/face4.png';
                
                if (isMobile) {
                    floatingFace.style.left = `${windowWidth * 0.70}px`;
                    floatingFace.style.top = `${windowHeight * 0.85}px`;
                    faceImg.style.height = `${mobileHeight}px`;
                } else {
                    floatingFace.style.left = `${windowWidth * 0.85}px`;
                    floatingFace.style.top = `${windowHeight * 0.65}px`;
                    faceImg.style.height = `${defaultHeight}px`;
                }
                
                faceImg.style.width = 'auto';
                faceImg.style.transform = 'scale(1)';
                floatingFace.style.transform = 'translate(0, 0)';
                break;
                
            case 'footer':
                // 푸터섹션: face6.png 사용
                faceImg.src = 'assets/face6.png';
                
                if (isMobile) {
                    floatingFace.style.left = `${windowWidth * 0.50}px`;
                    floatingFace.style.top = `${windowHeight * 0.85}px`;
                    faceImg.style.height = `${mobileHeight}px`;
                } else {
                    floatingFace.style.left = `${windowWidth * 0.50}px`;
                    floatingFace.style.top = `${windowHeight * 0.70}px`;
                    faceImg.style.height = `${defaultHeight}px`;
                }
                
                faceImg.style.width = 'auto';
                faceImg.style.transform = 'scale(1)';
                floatingFace.style.transform = 'translate(0, 0)';
                break;
        }
    }
}); 