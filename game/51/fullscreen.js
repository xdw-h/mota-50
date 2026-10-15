(function () {
    'use strict';
    var shell = document.getElementById('gameShell');
    var button = document.getElementById('fullscreenBtn');
    var pageMode = false;
    function current() {
        return document.fullscreenElement || document.webkitFullscreenElement;
    }
    function update() {
        var active = !!current() || pageMode;
        button.textContent = active ? '退出全屏' : '全屏';
        button.setAttribute('aria-label', active ? '退出全屏' : '进入全屏');
        button.setAttribute('aria-pressed', String(active));
        if (window.main && main.core && main.core.resize) main.core.resize();
    }
    button.addEventListener('click', function () {
        if (pageMode) {
            pageMode = false;
            shell.classList.remove('pageFullscreen');
            update();
            return;
        }
        function fallback() {
            pageMode = true;
            shell.classList.add('pageFullscreen');
            update();
        }
        var target = current() ? document : shell;
        var action = current()
            ? (document.exitFullscreen || document.webkitExitFullscreen)
            : (shell.requestFullscreen || shell.webkitRequestFullscreen);
        if (!action) {
            fallback();
            return;
        }
        try {
            var result = action.call(target);
            if (result && result.catch) result.catch(function () {
                fallback();
            });
        } catch (error) {
            fallback();
        }
    });
    document.addEventListener('fullscreenchange', update);
    document.addEventListener('webkitfullscreenchange', update);
    update();
})();
