
$(function () {
    // 뒤로 가기 버튼과 이동할 섹션
    const backButtons = [
        { button: '.p_one .back', target: '.intro' },
        { button: '.p_two .back', target: '.p_one' },
        { button: '.p_three .back_onthepaper', target: '.p_two' },
        { button: '.p_four .back_onthepaper', target: '.p_two' },
        { button: '.p_five .scroll-back', target: '.p_two' },
        { button: '.p_seven .back', target: '.p_five' }
    ];


    backButtons.forEach(function (item) {
        $(item.button).css('cursor', 'pointer');

        $(item.button).on('click', function () {
            $('.intro, .p_one, .p_two, .p_three, .p_four, .p_five, .p_six, .p_seven')
                .hide();
            $(item.target).css('display', 'block');
            if (item.target === '.p_five') {
                setTimeout(function () {
                    $('html, body').scrollTop(
                        $('.p_five').offset().top +
                        $('.p_five').outerHeight() -
                        $(window).height()
                    );
                }, 50);
            }
        });
    });

});

// 인트로

// 인트로 화살표 클릭 → 다음 섹션
$(document).ready(function () {
    const sections = [
        '.intro',
        '.p_one',
        '.p_two',
        '.p_three',
        '.p_four',
        '.p_five',
        '.p_six',
        '.p_seven'
    ];

    $('.Arrow').on('click', function () {
        let currentIndex = sections.findIndex(function (selector) {
            return $(selector).css('display') !== 'none';
        });

        if (currentIndex >= 0 && currentIndex < sections.length - 1) {
            $(sections[currentIndex]).hide();
            $(sections[currentIndex + 1]).css('display', 'block');
        }
    });
});
// 2번 섹션 → 3번 섹션
$(function () {
    $('.key2').on('click', function () {
        $('.p_one').hide();
        $('.p_two').css('display', 'block');
    });
});
// 코딩 / 디자인 클릭 시 섹션 이동
$(function () {
    $('.cording').on('click', function () {
        $('.p_two').hide();
        $('.p_three').css('display', 'block');
    });

    $('.design').on('click', function () {
        $('.p_two').hide();
        $('.p_four').css('display', 'block');
    });
});

$(function () {
    $('.next-key2').on('click', function (e) {
        e.preventDefault();

        // 현재 섹션 전부 숨기기
        $(
            '.intro, .p_one, .p_two, .p_three, .p_four, .p_five, .p_six, .p_seven'
        ).hide();

        // 카드뉴스 섹션 표시
        $('.p_five').css('display', 'block');

        // 스크롤 위치를 맨 아래로 이동
        setTimeout(function () {
            const section = $('.p_five');

            $('html, body').scrollTop(
                section.offset().top +
                section.outerHeight() -
                $(window).height()
            );

            // AOS가 로드된 경우에만 갱신
            if (typeof AOS !== 'undefined') {
                AOS.refreshHard();
            }
        }, 100);
    });
});

$(function () {
    $('.key3').on('click', function () {
        $('.p_five').hide();
        $('.p_six').css('display', 'block');
    });
});

$(function () {
    // p_six가 나타나면 자동으로 p_seven으로 전환
    $('.p_six').on('transitionstart', function () {
        // 별도 클릭 이벤트 불필요
    });

    const observer = new MutationObserver(function () {
        if ($('.p_six').css('display') !== 'none') {
            observer.disconnect();

            setTimeout(function () {
                $('.p_six').fadeOut(1000, function () {
                    $('.p_seven').css('display', 'block').hide().fadeIn(1200);
                });
            }, 1500);
        }
    });

    observer.observe(document.querySelector('.p_six'), {
        attributes: true,
        attributeFilter: ['style', 'class']
    });
});

$(function () {
    const cards = document.querySelectorAll('.reveal-card');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.9
    });

    cards.forEach(function (card) {
        observer.observe(card);
    });
});

// 이력서 등장 애니메이션이 끝나면 클릭 활성화
document.querySelectorAll('.resume').forEach((resume) => {
    resume.addEventListener('animationend', (event) => {
        if (event.animationName === 'resumeShow') {
            resume.classList.add('is-ready');
        }
    });
});