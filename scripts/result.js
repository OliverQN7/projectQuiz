(function () {
    const Result = {
        init() {
            document.getElementById('result__score').innerText = localStorage.getItem('score') +
                '/' + localStorage.getItem('total');
            document.getElementById('answers').onclick = function () {
                location.href = 'answers.html'
            }
        }
    }

    Result.init();
})();